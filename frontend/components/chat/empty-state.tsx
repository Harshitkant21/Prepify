'use client'

import { Brain } from 'lucide-react'

interface EmptyStateProps {
  modeLabel: string
}

export function EmptyState({ modeLabel }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4 text-center px-4">
      <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
        <Brain className="w-8 h-8 text-blue-600 dark:text-blue-300" />
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 dark:text-slate-100">Welcome to {modeLabel}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
          Preparing your interview...
        </p>
      </div>
    </div>
  )
}
