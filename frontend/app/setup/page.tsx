'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { ModeSelector } from '@/components/mode-selector'
import { DifficultySelector } from '@/components/difficulty-selector'
import { LanguageSelector } from '@/components/language-selector'
import { Button } from '@/components/ui/button'

export default function SetupPage() {
  const router = useRouter()
  const [selectedMode, setSelectedMode] = useState<'dsa' | 'hr' | 'mock' | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard' | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState<'java' | 'cpp' | 'javascript' | 'python' | null>(null)

  useEffect(() => {
    const mode = localStorage.getItem('mode')
    const difficulty = localStorage.getItem('difficulty')
    const language = localStorage.getItem('language')

    if (mode === 'dsa' || mode === 'hr' || mode === 'mock') {
      setSelectedMode(mode)
    }
    if (difficulty === 'easy' || difficulty === 'medium' || difficulty === 'hard') {
      setSelectedDifficulty(difficulty)
    }
    if (language === 'java' || language === 'cpp' || language === 'javascript' || language === 'python') {
      setSelectedLanguage(language)
    }
  }, [])

  const canStart =
    selectedMode !== null &&
    selectedDifficulty !== null &&
    (selectedMode !== 'dsa' || selectedLanguage !== null)

  const handleStartInterview = () => {
    if (!selectedMode || !selectedDifficulty) {
      return
    }

    localStorage.setItem('mode', selectedMode)
    localStorage.setItem('difficulty', selectedDifficulty)
    if (selectedMode === 'dsa' && selectedLanguage) {
      localStorage.setItem('language', selectedLanguage)
    }
    router.push('/chat')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              Choose Your Interview Setup
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Select mode and difficulty before starting your interview
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">
              Interview Mode
            </label>
            <ModeSelector
              selectedMode={selectedMode}
              onSelectMode={setSelectedMode}
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">
              Difficulty Level
            </label>
            <DifficultySelector
              selectedDifficulty={selectedDifficulty}
              onSelectDifficulty={setSelectedDifficulty}
            />
          </div>

          {selectedMode === 'dsa' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">
                Language
              </label>
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
              />
            </div>
          )}
          {selectedMode === 'mock' && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">
                Language
              </label>
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onSelectLanguage={setSelectedLanguage}
              />
            </div>
          )}

          <Button
            className="w-full"
            size="lg"
            disabled={!canStart}
            onClick={handleStartInterview}
          >
            Start Interview
          </Button>
        </div>
      </div>
    </div>
  )
}
