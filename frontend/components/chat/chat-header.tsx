'use client'

import { Button } from '@/components/ui/button'
import { ArrowLeft, Settings } from 'lucide-react'
import Link from 'next/link'

interface ChatHeaderProps {
  mode: 'dsa' | 'hr' | 'mock'
  difficulty: 'easy' | 'medium' | 'hard'
  onSettingsClick: () => void
  isSettingsOpen: boolean
}

const modeLabels = {
  dsa: 'DSA Practice',
  hr: 'HR Prep',
  mock: 'Full Mock Interview',
}

const difficultyLabels = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard',
}

export function ChatHeader({
  mode,
  difficulty,
  onSettingsClick,
  isSettingsOpen,
}: ChatHeaderProps) {
  return (
    <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 md:px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="hover:bg-slate-100 dark:hover:bg-slate-800">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="font-semibold text-slate-900 dark:text-white">
              {modeLabels[mode]}
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Mode: {modeLabels[mode]} • Difficulty: {difficultyLabels[difficulty]}
            </p>
          </div>
        </div>
        <Button
          variant={isSettingsOpen ? 'default' : 'ghost'}
          size="icon"
          onClick={onSettingsClick}
          className={isSettingsOpen ? '' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
