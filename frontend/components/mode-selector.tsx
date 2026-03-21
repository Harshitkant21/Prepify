'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Code2, Users, Zap } from 'lucide-react'

interface ModeSelectorProps {
  selectedMode: 'dsa' | 'hr' | 'mock' | null
  onSelectMode: (mode: 'dsa' | 'hr' | 'mock') => void
}

const modes = [
  {
    id: 'dsa',
    label: 'DSA Practice',
    description: 'Master data structures and algorithms',
    icon: Code2,
    color: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'hr',
    label: 'HR Prep',
    description: 'Ace behavioral and situational questions',
    icon: Users,
    color: 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    id: 'mock',
    label: 'Full Mock',
    description: 'Complete interview simulation',
    icon: Zap,
    color: 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
]

export function ModeSelector({ selectedMode, onSelectMode }: ModeSelectorProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {modes.map((mode) => {
        const IconComponent = mode.icon
        const isSelected = selectedMode === mode.id
        return (
          <Card
            key={mode.id}
            className={`p-6 cursor-pointer transition-all ${
              mode.color
            } border-2 ${
              isSelected
                ? 'border-current ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-950'
                : 'border-opacity-0'
            }`}
            onClick={() => onSelectMode(mode.id as any)}
          >
            <div className="flex flex-col gap-3">
              <IconComponent className={`w-8 h-8 ${mode.iconColor}`} />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  {mode.label}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {mode.description}
                </p>
              </div>
              {isSelected && (
                <Button size="sm" className="w-full mt-2">
                  Selected
                </Button>
              )}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
