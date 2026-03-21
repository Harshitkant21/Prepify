'use client'

import { Button } from '@/components/ui/button'
import { Lightbulb, Eye, SkipForward, RefreshCw } from 'lucide-react'

interface ActionButtonsProps {
  onHint: () => void
  onSolution: () => void
  onNextQuestion: () => void
  onImprove: () => void
  isLoading?: boolean
}

export function ActionButtons({
  onHint,
  onSolution,
  onNextQuestion,
  onImprove,
  isLoading = false,
}: ActionButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={onHint}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        <Lightbulb className="w-4 h-4" />
        <span className="hidden sm:inline">Hint</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onSolution}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        <Eye className="w-4 h-4" />
        <span className="hidden sm:inline">Solution</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onNextQuestion}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        <SkipForward className="w-4 h-4" />
        <span className="hidden sm:inline">Next</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={onImprove}
        disabled={isLoading}
        className="flex items-center gap-2"
      >
        <RefreshCw className="w-4 h-4" />
        <span className="hidden sm:inline">Improve</span>
      </Button>
    </div>
  )
}
