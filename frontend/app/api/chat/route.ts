import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { formatAIResponse } from "@/lib/formatResponse";

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: process.env.baseURL,
});

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
}

interface ChatRequest {
  message: string;
  mode: "dsa" | "hr" | "mock";
  difficulty: "easy" | "medium" | "hard";
  language?: "java" | "cpp" | "javascript" | "python";
  history?: Message[];
}

const END_INTERVIEW_SYSTEM = `The interview has ended. Your ONLY job is to output a concise structured performance report based on the conversation so far.

Rules:
- Do NOT ask any questions.
- Do NOT continue the interview.
- Use EXACTLY this format (including labels and line breaks):

Interview Summary:

Score: X/10

Strengths:

* ...
* ...

Weaknesses:

* ...
* ...

Suggestions:

* ...
* ...

- Score must be a single number out of 10.
- Keep bullets short and actionable.`;

const SYSTEM_PROMPTS = {
  dsa: `You are an expert Data Structures and Algorithms interviewer. Your role is to:
1. Ask technical questions about algorithms, data structures, and problem-solving
2. Ask ONLY ONE question at a time.
3. NEVER ask multiple questions in one response.
4. WAIT for the candidate's response before asking the next question.
5. Start directly with a question when interview starts.
6. Keep responses concise and focused.
7. Always ask questions based on the selected difficulty level and programming language.
8. Do not provide hints unless the candidate asks or clearly struggles.
9. Ask follow-up questions based on the candidate's answer.
10. Do NOT restart or repeat the interview.
11. When asked for a solution, provide a clear explanation with code examples
12. Give feedback on their approach and suggest optimizations

Always be encouraging and helpful. Focus on understanding their thought process.`,

  hr: `You are an experienced HR interviewer and career coach. Your role is to:
1. Ask behavioral and situational interview questions
2. Ask ONLY ONE question at a time.
3. NEVER ask multiple questions in one response.
4. WAIT for the candidate's response before asking the next question.
5. Start directly with a question when interview starts.
6. Keep responses concise and focused.
7. Do not provide hints unless the candidate asks or clearly struggles.
8. Ask follow-up questions based on the candidate's answer.
9. Do NOT restart or repeat the interview.
10. When asked for a solution or feedback, provide clear, actionable advice on how to improve their answers.
11. Help candidates prepare for common HR questions
12. Provide hints about what interviewers look for (STAR method, etc.)
13. Give example solutions and improved answers when requested
14. Offer constructive feedback on their responses
Always be supportive and professional. Help candidates shine!`,

  mock: `You are a realistic mock interviewer conducting a full interview. Your role is to:
1. Ask a mix of technical and behavioral questions
2. Ask ONLY ONE question at a time.
3. NEVER ask multiple questions in one response.
4. WAIT for the candidate's response before asking the next question.
5. Start directly with a question when interview starts.
6. Keep responses concise and focused.
7. Ask follow-up questions based on the candidate's answer.
8. Do NOT restart or repeat the interview.
9. Simulate a real interview experience with realistic follow-ups
10. Provide hints to help candidates think through problems
11. Give feedback on their overall approach and communication
12. When asked for a solution, provide a clear explanation with code examples for technical questions, and actionable advice for behavioral questions.
Be encouraging but realistic about what top companies expect.`,
};

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequest = await request.json();
    const {
      message,
      mode,
      difficulty,
      language = "javascript",
      history = [],
    } = body;

    if (!message || !mode || !difficulty) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const isStartInterviewEvent = message === "**START_INTERVIEW**";
    const isEndInterviewEvent = message === "**END_INTERVIEW**";

    const historyForModel = isEndInterviewEvent ? history : history.slice(-5);

    // Build conversation history for context
    const messages = historyForModel.map((msg) => ({
      role: msg.isUser ? ("user" as const) : ("assistant" as const),
      content: msg.content,
    }));

    // Add current message (or bootstrap instruction for interview start)
    if (isEndInterviewEvent) {
      messages.push({
        role: "user" as const,
        content:
          "Generate the performance report now using the required format. Base it only on the interview conversation above.",
      });
    } else if (isStartInterviewEvent) {
      messages.push({
        role: "user" as const,
        content:
          "Start the interview now. Ask exactly one first interview question immediately based on the selected mode, difficulty, and language context. Do not ask for setup details, and do not include multiple questions.",
      });
    } else {
      messages.push({
        role: "user" as const,
        content: message,
      });
    }

    const normalizedDifficulty =
      difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
    const languageContext =
      mode === "dsa"
        ? `Language: ${
            language === "cpp"
              ? "C++"
              : language.charAt(0).toUpperCase() + language.slice(1)
          }`
        : "Language: N/A";

    const contextBlock = `Context:
- Mode: ${mode.toUpperCase()}
- Difficulty: ${normalizedDifficulty}
- ${languageContext}`;

    const systemPrompt = isEndInterviewEvent
      ? `${END_INTERVIEW_SYSTEM}\n\n${contextBlock}`
      : `${SYSTEM_PROMPTS[mode]}

${contextBlock}

Use this context for the next response.`;

    const response = await openai.chat.completions.create({
      model: "mistralai/devstral-2-123b-instruct-2512",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        ...messages,
      ],
      temperature: 0.7,
      max_tokens: isEndInterviewEvent ? 900 : 500,
    });

    console.log("response: ", response);

    const rawReply = response.choices[0]?.message?.content || "";
    const reply = isEndInterviewEvent
      ? rawReply.trim()
      : formatAIResponse(rawReply);
    console.log("Reply: ", reply);

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("Chat API error:", error);
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
