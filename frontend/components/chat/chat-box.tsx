'use client'

import { useRef, useEffect } from 'react'
import { MessageBubble } from './message-bubble'
import { TypingIndicator } from './typing-indicator'
import { EmptyState } from './empty-state'

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

interface ChatBoxProps {
  messages: Message[]
  isLoading: boolean
  modeLabel: string
}

export function ChatBox({ messages, isLoading, modeLabel }: ChatBoxProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Auto-scroll to bottom
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          top: scrollRef.current.scrollHeight,
          behavior: 'smooth',
        })
      }, 0)
    }
  }, [messages, isLoading])

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-950">
      {/* Messages Container */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-4 p-4 md:p-6"
      >
        {messages.length === 0 ? (
          <EmptyState modeLabel={modeLabel} />
        ) : (
          <>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                content={message.content}
                isUser={message.isUser}
                timestamp={message.timestamp}
              />
            ))}
          </>
        )}
        {isLoading && <TypingIndicator />}
      </div>
    </div>
  )
}
