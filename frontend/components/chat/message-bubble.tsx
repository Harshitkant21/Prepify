'use client'

interface MessageBubbleProps {
  content: string
  isUser: boolean
  timestamp?: Date
}

function formatReportContent(content: string) {
  if (!content.includes('Interview Summary:')) {
    return null
  }

  const blocks = content.split(/\n\n+/).filter(Boolean)

  return (
    <div className="text-sm leading-relaxed break-words space-y-3">
      {blocks.map((block, i) => {
        const lines = block.split('\n')

        return (
          <div key={i} className="space-y-1">
            {lines.map((line, j) => {
              const isScore = line.trim().startsWith('Score:')

              return (
                <p
                  key={j}
                  className={
                    isScore
                      ? 'font-semibold text-blue-600 dark:text-blue-400 whitespace-pre-wrap'
                      : 'whitespace-pre-wrap'
                  }
                >
                  {line}
                </p>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export function MessageBubble({ content, isUser, timestamp }: MessageBubbleProps) {
  const reportBody = !isUser ? formatReportContent(content) : null

  return (
    <div className={`flex gap-3 animate-slide-in ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-xs lg:max-w-md rounded-lg px-4 py-3 shadow-sm transition-all ${
          isUser
            ? 'bg-blue-600 text-white rounded-br-none hover:bg-blue-700'
            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-none hover:bg-slate-200 dark:hover:bg-slate-700'
        }`}
      >
        {reportBody ?? (
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{content}</p>
        )}
        {timestamp && (
          <p className={`text-xs mt-2 opacity-70 ${isUser ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>
            {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        )}
      </div>
    </div>
  )
}
