import { useCallback, useEffect, useRef, useState } from 'react'

export interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatState {
  messages: Message[]
  mode: 'dsa' | 'hr' | 'mock'
  difficulty: 'easy' | 'medium' | 'hard'
  language: 'java' | 'cpp' | 'javascript' | 'python'
}

const STORAGE_KEY = 'interview-prep-chat'
const MODE_KEY = 'mode'
const DIFFICULTY_KEY = 'difficulty'
const LANGUAGE_KEY = 'language'

const DEFAULT_STATE: ChatState = {
  messages: [],
  mode: 'dsa',
  difficulty: 'medium',
  language: 'javascript',
}

export function useChat() {
  const [state, setState] = useState<ChatState>(DEFAULT_STATE)
  const [isLoading, setIsLoading] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [interviewLocked, setInterviewLocked] = useState(false)
  const [isGeneratingReport, setIsGeneratingReport] = useState(false)
  const endInterviewInFlightRef = useRef(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const storedMode = localStorage.getItem(MODE_KEY) as ChatState['mode'] | null
    const storedDifficulty = localStorage.getItem(DIFFICULTY_KEY) as ChatState['difficulty'] | null
    const storedLanguage = localStorage.getItem(LANGUAGE_KEY) as ChatState['language'] | null
    const validMode = storedMode === 'dsa' || storedMode === 'hr' || storedMode === 'mock'
    const validDifficulty =
      storedDifficulty === 'easy' || storedDifficulty === 'medium' || storedDifficulty === 'hard'
    const validLanguage =
      storedLanguage === 'java' ||
      storedLanguage === 'cpp' ||
      storedLanguage === 'javascript' ||
      storedLanguage === 'python'

    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setState({
          ...DEFAULT_STATE,
          ...parsed,
          mode: validMode ? storedMode : parsed.mode,
          difficulty: validDifficulty ? storedDifficulty : parsed.difficulty,
          language: validLanguage
            ? storedLanguage
            : parsed.language ?? DEFAULT_STATE.language,
          messages: (parsed.messages || []).map((m: any) => ({
            ...m,
            timestamp: new Date(m.timestamp),
          })),
        })
      } catch (e) {
        console.error('Failed to load chat state:', e)
        setState((prev) => ({
          ...prev,
          mode: validMode ? (storedMode as ChatState['mode']) : prev.mode,
          difficulty: validDifficulty
            ? (storedDifficulty as ChatState['difficulty'])
            : prev.difficulty,
          language: validLanguage
            ? (storedLanguage as ChatState['language'])
            : prev.language,
        }))
      }
    } else if (validMode || validDifficulty || validLanguage) {
      setState((prev) => ({
        ...prev,
        mode: validMode ? (storedMode as ChatState['mode']) : prev.mode,
        difficulty: validDifficulty
          ? (storedDifficulty as ChatState['difficulty'])
          : prev.difficulty,
        language: validLanguage
          ? (storedLanguage as ChatState['language'])
          : prev.language,
      }))
    }
    setIsReady(true)
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const addMessage = useCallback((content: string, isUser: boolean) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser,
      timestamp: new Date(),
    }
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, newMessage],
    }))
    return newMessage.id
  }, [])

  const sendMessage = useCallback(
    async (
      content: string,
      options: { addUserMessage?: boolean } = {}
    ) => {
      if (interviewLocked) {
        return
      }

      const isEndInterview = content === '**END_INTERVIEW**'

      if (isEndInterview) {
        if (endInterviewInFlightRef.current) {
          return
        }
        endInterviewInFlightRef.current = true
      }

      const shouldAddUserMessage = options.addUserMessage ?? true
      const historySnapshot = state.messages

      if (isEndInterview) {
        setInterviewLocked(true)
        setIsGeneratingReport(true)
        addMessage('Interview ended.', true)
      } else if (shouldAddUserMessage) {
        addMessage(content, true)
      }
      setIsLoading(true)

      try {
        const historyForApi =
          isEndInterview
            ? historySnapshot
            : state.messages.slice(-5)

        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: content,
            mode: state.mode,
            difficulty: state.difficulty,
            language: state.language,
            history: historyForApi,
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to get response')
        }

        const data = await response.json()
        addMessage(data.reply, false)
      } catch (error) {
        console.error('Chat error:', error)
        if (isEndInterview) {
          endInterviewInFlightRef.current = false
          setInterviewLocked(false)
        }
        addMessage(
          'Sorry, I encountered an error. Please try again.',
          false
        )
      } finally {
        setIsLoading(false)
        if (isEndInterview) {
          endInterviewInFlightRef.current = false
          setIsGeneratingReport(false)
        }
      }
    },
    [
      addMessage,
      interviewLocked,
      state.mode,
      state.difficulty,
      state.language,
      state.messages,
    ]
  )

  const applyInterviewSettings = useCallback(
    (next: {
      mode: ChatState['mode']
      difficulty: ChatState['difficulty']
      language: ChatState['language']
    }) => {
      localStorage.setItem(MODE_KEY, next.mode)
      localStorage.setItem(DIFFICULTY_KEY, next.difficulty)
      localStorage.setItem(LANGUAGE_KEY, next.language)
      setState((prev) => ({
        ...prev,
        mode: next.mode,
        difficulty: next.difficulty,
        language: next.language,
      }))
    },
    []
  )

  const setMode = useCallback((mode: 'dsa' | 'hr' | 'mock') => {
    setState((prev) => ({ ...prev, mode }))
  }, [])

  const setDifficulty = useCallback((difficulty: 'easy' | 'medium' | 'hard') => {
    setState((prev) => ({ ...prev, difficulty }))
  }, [])

  const setLanguage = useCallback((language: 'java' | 'cpp' | 'javascript' | 'python') => {
    setState((prev) => ({ ...prev, language }))
  }, [])

  const clearMessages = useCallback(() => {
    setState((prev) => ({ ...prev, messages: [] }))
  }, [])

  const restartInterview = useCallback(() => {
    endInterviewInFlightRef.current = false
    setInterviewLocked(false)
    setIsGeneratingReport(false)
    setState((prev) => ({ ...prev, messages: [] }))
  }, [])

  const clearAll = useCallback(() => {
    setState(DEFAULT_STATE)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(MODE_KEY)
    localStorage.removeItem(DIFFICULTY_KEY)
    localStorage.removeItem(LANGUAGE_KEY)
  }, [])

  return {
    messages: state.messages,
    mode: state.mode,
    difficulty: state.difficulty,
    language: state.language,
    isReady,
    isLoading,
    interviewLocked,
    isGeneratingReport,
    addMessage,
    sendMessage,
    applyInterviewSettings,
    setMode,
    setDifficulty,
    setLanguage,
    clearMessages,
    clearAll,
    restartInterview,
  }
}
