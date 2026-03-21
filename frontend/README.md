# Interview Prep AI

Master interviews with AI-powered practice questions and real-time feedback. Practice data structures, behavioral questions, and full mock interviews with personalized assistance.

## Features

- **Three Interview Modes**
  - **DSA Practice**: Master data structures and algorithms with targeted questions
  - **HR Prep**: Ace behavioral and situational questions with expert feedback
  - **Full Mock**: Complete interview simulation combining technical and behavioral questions

- **Difficulty Levels**: Easy, Medium, and Hard to match your skill level
- **Smart Assistance**:
  - Get hints to guide your thinking without spoiling answers
  - View detailed solutions with explanations
  - Get feedback on how to improve your responses
  - Receive suggested next questions

- **Persistent Chat**: Your progress is automatically saved to localStorage
- **Dark Mode**: Full dark mode support for comfortable learning
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

## Technology Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **AI Engine**: Groq (Mixtral 8x7B)
- **UI Components**: shadcn/ui
- **State Management**: Custom React Hook (useChat)
- **Storage**: Browser localStorage + API

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm
- Groq API Key (get one for free at https://console.groq.com)

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local` (or create it)
   - Add your Groq API key:
     ```
     GROQ_API_KEY=your_api_key_here
     ```

4. Run the development server:
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── page.tsx                 # Landing page
│   ├── chat/page.tsx           # Main chat interface
│   ├── api/chat/route.ts       # Groq AI endpoint
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles & animations
├── components/
│   ├── chat/
│   │   ├── message-bubble.tsx  # Chat message display
│   │   ├── typing-indicator.tsx # AI typing animation
│   │   ├── action-buttons.tsx  # Hint, Solution, Next, Improve
│   │   ├── suggested-prompts.tsx # Suggested starter prompts
│   │   ├── empty-state.tsx     # Empty chat state
│   │   ├── chat-box.tsx        # Message container
│   │   ├── chat-input.tsx      # User input field
│   │   └── chat-header.tsx     # Chat header with settings
│   ├── mode-selector.tsx       # Interview mode selection
│   └── difficulty-selector.tsx # Difficulty level selection
├── hooks/
│   └── use-chat.ts             # Chat state management hook
└── components/ui/              # shadcn/ui components
```

## How It Works

1. **Select a Mode**: Choose between DSA, HR, or Mock interview practice
2. **Set Difficulty**: Pick your challenge level (Easy, Medium, Hard)
3. **Ask Questions**: Type your question or use suggested prompts
4. **Get Feedback**: The AI responds based on the selected mode and difficulty
5. **Use Actions**: Click buttons for hints, solutions, next questions, or improvement suggestions
6. **Track Progress**: Your chat history is saved automatically

## API Integration

The `/api/chat` endpoint handles all AI interactions:
- Accepts message, mode, difficulty, and conversation history
- Uses different system prompts for each interview mode
- Leverages Groq's Mixtral model for fast, high-quality responses
- Maintains conversation context with the last 5 messages

## Customization

### Adjust System Prompts
Edit the `SYSTEM_PROMPTS` in `/app/api/chat/route.ts` to customize how the AI responds for each mode.

### Add More Suggested Prompts
Update `SUGGESTED_PROMPTS` in `/app/chat/page.tsx` to change starter questions.

### Change Colors & Styling
- Global styles in `/app/globals.css`
- Tailwind configuration in `tailwind.config.ts`
- Component styles use Tailwind classes

## Deployment

Deploy to Vercel with one click:

1. Push your code to GitHub
2. Visit [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New..." → "Project"
4. Import your repository
5. Add `GROQ_API_KEY` to Environment Variables
6. Deploy!

## Performance Tips

- Conversation history is limited to the last 5 messages for faster API responses
- Messages are stored in localStorage for instant loading
- All animations are GPU-accelerated with CSS
- UI components are optimized with React 19 features

## Limitations

- Free Groq tier has rate limits (monitor your usage)
- localStorage has ~5-10MB limit per domain
- Conversation history is cleared when localStorage is cleared

## Future Enhancements

- Multi-language support
- Spaced repetition system
- Performance analytics and scoring
- Community question libraries
- Export progress reports
- Voice input/output
- Video recording for mock interviews

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create a new issue with detailed information
3. Contact Vercel support if deployment issues arise

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Powered by [Groq](https://groq.com) for fast AI inference
- Built with [Next.js](https://nextjs.org) and [shadcn/ui](https://ui.shadcn.com)
- Designed for interview preparation excellence
