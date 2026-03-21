'use client'

import { Button } from '@/components/ui/button'

interface LanguageSelectorProps {
  selectedLanguage: 'java' | 'cpp' | 'javascript' | 'python' | null
  onSelectLanguage: (language: 'java' | 'cpp' | 'javascript' | 'python') => void
  disabled?: boolean
}

const languages = [
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
]

export function LanguageSelector({
  selectedLanguage,
  onSelectLanguage,
  disabled = false,
}: LanguageSelectorProps) {
  return (
    <div className="flex gap-2 flex-wrap">
      {languages.map((language) => (
        <Button
          key={language.id}
          variant={selectedLanguage === language.id ? 'default' : 'outline'}
          size="sm"
          onClick={() => onSelectLanguage(language.id as any)}
          disabled={disabled}
        >
          {language.label}
        </Button>
      ))}
    </div>
  )
}
