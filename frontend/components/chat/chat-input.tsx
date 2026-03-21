"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSend,
  isLoading = false,
  disabled = false,
  placeholder = "Ask a question or describe your answer...",
}: ChatInputProps) {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [message, setMessage] = useState("");

  const isInputDisabled = isLoading || disabled;
  const isButtonDisabled = isInputDisabled || !message.trim();

  const handleSend = () => {
    if (message.trim() && !isInputDisabled) {
      onSend(message);
      setMessage("");

      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const value = e.currentTarget.value;
    setMessage(value);

    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 md:p-6">
      <div className="flex gap-3">
        <textarea
          ref={inputRef}
          value={message}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          onInput={handleInput}
          disabled={isInputDisabled}
          rows={1}
          className="flex-1 resize-none rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-3 text-sm placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 disabled:opacity-50"
        />
        <Button
          onClick={handleSend}
          disabled={isButtonDisabled}
          size="icon"
          className="h-auto py-2"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
