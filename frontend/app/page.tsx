"use client";

import { BoxesCore } from "@/components/ui/background-boxes";
import { Button } from "@/components/ui/button";
import { Brain, CheckCircle, Zap } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Questions",
    description: "Get realistic interview questions powered by advanced AI",
  },
  {
    icon: Zap,
    title: "Real-Time Feedback",
    description:
      "Receive instant feedback and suggestions to improve your answers",
  },
  {
    icon: CheckCircle,
    title: "Progress Tracking",
    description: "Track your improvement across different difficulty levels",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur sticky top-0 z-100">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Brain className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-900 dark:text-white">
              Prepify
            </span>
          </div>
          <Link href="/setup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32">
        <div className="absolute inset-0 flex items-center justify-center z-0 opacity-20">
          <div className="w-100 h-100">
            <BoxesCore />
          </div>
        </div>

        <div className="space-y-8 text-center z-10 relative">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 dark:text-white text-balance">
            Master Every Interview
            <span className="block text-blue-600 dark:text-blue-400">
              with AI
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-pretty">
            Practice data structures, behavioral questions, and full mock
            interviews with AI-powered feedback. Get confident for your dream
            job.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link href="/setup">
              <Button size="lg">Start Practicing</Button>
            </Link>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-12">
          Why Interview Prep?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700"
              >
                <Icon className="w-10 h-10 text-blue-600 dark:text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-24 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Start practicing today with three interview modes: DSA questions, HR
            prep, and full mock interviews.
          </p>
          <Link href="/setup">
            <Button size="lg" variant="secondary" className="px-8">
              Begin Interview Prep
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>Prepify AI • Powered by NVIDIA Mistral AI</p>
        </div>
      </footer>
    </main>
  );
}
