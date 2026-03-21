"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@/hooks/use-chat";
import { ChatBox } from "@/components/chat/chat-box";
import { ChatInput } from "@/components/chat/chat-input";
import { ChatHeader } from "@/components/chat/chat-header";
import { ActionButtons } from "@/components/chat/action-buttons";
import { ModeSelector } from "@/components/mode-selector";
import { DifficultySelector } from "@/components/difficulty-selector";
import { LanguageSelector } from "@/components/language-selector";
import { Button } from "@/components/ui/button";

export default function ChatPage() {
  const chat = useChat();
  const [showSettings, setShowSettings] = useState(false);
  const hasStartedRef = useRef(false);

  const [tempMode, setTempMode] = useState(chat.mode);
  const [tempDifficulty, setTempDifficulty] = useState(chat.difficulty);
  const [tempLanguage, setTempLanguage] = useState(chat.language);
  const [applyFeedback, setApplyFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (!showSettings) {
      return;
    }
    setTempMode(chat.mode);
    setTempDifficulty(chat.difficulty);
    setTempLanguage(chat.language);
  }, [showSettings, chat.mode, chat.difficulty, chat.language]);

  useEffect(() => {
    if (!chat.isReady || hasStartedRef.current || chat.messages.length > 0) {
      return;
    }
    hasStartedRef.current = true;
    if (!chat.isLoading) {
      chat.sendMessage("**START_INTERVIEW**", { addUserMessage: false });
    }
  }, [chat.isReady, chat.messages.length, chat.isLoading, chat.sendMessage]);

  const modeLabels = {
    dsa: "DSA Practice",
    hr: "HR Prep",
    mock: "Full Mock Interview",
  };

  const handleRestartInterview = () => {
    chat.restartInterview();
    hasStartedRef.current = false;
  };

  const handleApplyChanges = () => {
    chat.applyInterviewSettings({
      mode: tempMode,
      difficulty: tempDifficulty,
      language: tempLanguage,
    });
    setApplyFeedback("Settings applied.");
    setShowSettings(false);
    handleRestartInterview();
    window.setTimeout(() => setApplyFeedback(null), 2500);
  };

  const handleEndInterview = () => {
    chat.sendMessage("**END_INTERVIEW**", { addUserMessage: false });
    setShowSettings(false);
  };

  const inputPlaceholder = chat.isGeneratingReport
    ? "Generating your performance report..."
    : undefined;

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-slate-950">
      <ChatHeader
        mode={chat.mode}
        difficulty={chat.difficulty}
        onSettingsClick={() => setShowSettings(!showSettings)}
        isSettingsOpen={showSettings}
      />

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 md:px-6 py-6">
          <div className="max-w-6xl mx-auto space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block">
                Interview Mode
              </label>
              <ModeSelector
                selectedMode={tempMode}
                onSelectMode={(mode) => setTempMode(mode)}
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block">
                Difficulty Level
              </label>
              <DifficultySelector
                selectedDifficulty={tempDifficulty}
                onSelectDifficulty={(difficulty) =>
                  setTempDifficulty(difficulty)
                }
                disabled={chat.isLoading}
              />
            </div>
            {tempMode === "dsa" && (
              <div>
                <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 block">
                  Language
                </label>
                <LanguageSelector
                  selectedLanguage={tempLanguage}
                  onSelectLanguage={(language) => setTempLanguage(language)}
                  disabled={chat.isLoading}
                />
              </div>
            )}
            <div className="flex gap-2 pt-2 flex-wrap">
              <Button
                variant="outline"
                size="sm"
                onClick={() => chat.clearMessages()}
                disabled={chat.interviewLocked}
              >
                Clear Chat
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  chat.clearAll();
                  window.location.href = "/chat";
                }}
              >
                Reset All
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleEndInterview}
                disabled={
                  chat.isLoading ||
                  chat.interviewLocked ||
                  chat.messages.length === 0
                }
              >
                End Interview
              </Button>
            </div>
            <div className="space-y-2 pt-2">
              <Button
                className="w-full sm:w-auto"
                size="sm"
                onClick={handleApplyChanges}
              >
                Apply Changes
              </Button>
              {applyFeedback ? (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {applyFeedback}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <ChatBox
          messages={chat.messages}
          isLoading={chat.isLoading}
          modeLabel={modeLabels[chat.mode]}
        />

        {chat.interviewLocked && (
          <div className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 px-4 md:px-6 py-4">
            <Button
              size="sm"
              variant="outline"
              onClick={handleRestartInterview}
            >
              Restart Interview
            </Button>
          </div>
        )}

        {/* Action Buttons */}
        {chat.messages.length > 0 && !chat.interviewLocked && (
          <div className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 md:px-6 py-4">
            <ActionButtons
              onHint={() =>
                chat.sendMessage("Can you give me a hint for this question?")
              }
              onSolution={() =>
                chat.sendMessage("Can you show me the solution?")
              }
              onNextQuestion={() =>
                chat.sendMessage("Give me the next question please.")
              }
              onImprove={() =>
                chat.sendMessage(
                  "How can I improve my answer to the previous question?",
                )
              }
              isLoading={chat.isLoading}
            />
          </div>
        )}

        {/* Input */}
        <ChatInput
          onSend={(message) => chat.sendMessage(message)}
          isLoading={chat.isLoading}
          disabled={chat.interviewLocked}
          placeholder={inputPlaceholder}
        />
      </div>
    </div>
  );
}
