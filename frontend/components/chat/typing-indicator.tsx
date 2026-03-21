'use client'

export function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg px-4 py-3 rounded-bl-none">
        <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-500 animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  )
}
