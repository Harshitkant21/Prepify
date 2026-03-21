'use client'

import { Button } from '@/components/ui/button'

interface DifficultySelectorProps {
  selectedDifficulty: 'easy' | 'medium' | 'hard' | null
  onSelectDifficulty: (difficulty: 'easy' | 'medium' | 'hard') => void
  disabled?: boolean
}

const difficulties = [
  {
    id: 'easy',
    label: 'Easy',
    description: 'Beginner friendly',
  },
  {
    id: 'medium',
    label: 'Medium',
    description: 'Intermediate level',
  },
  {
    id: 'hard',
    label: 'Hard',
    description: 'Advanced challenges',
  },
]

export function DifficultySelector({
  selectedDifficulty,
  onSelectDifficulty,
  disabled = false,
}: DifficultySelectorProps) {
  return (
    <div className="flex gap-2">
      {difficulties.map((difficulty) => (
        <Button
          key={difficulty.id}
          variant={selectedDifficulty === difficulty.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectDifficulty(difficulty.id as any)}
          disabled={disabled}
          className="flex-1"
        >
          <span className="hidden sm:inline">{difficulty.label}</span>
          <span className="sm:hidden">{difficulty.label.charAt(0)}</span>
        </Button>
      ))}
    </div>
  )
}
