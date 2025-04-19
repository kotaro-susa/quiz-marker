"use client";

import { CompletionScreen } from "@/app/components/completion/CompletionScreen";
import { LoginScreen } from "@/app/components/login/LoginScreen";
import { QuizScreen } from "@/app/components/quiz/QuizScreen";
import { WaitingScreen } from "@/app/components/waiting/WaitingScreen";
import { useGameStore } from "@/stores/gameStore";
import React, { useEffect, useState } from "react";

type QuizState = "login" | "waiting" | "quiz" | "completion";

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { currentState, setCurrentState } = useGameStore();

  useEffect(() => {
    setCurrentState("login");
  }, []);

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleStart = () => {
    setCurrentState("quiz");
  };

  const handleQuizComplete = () => {
    setCurrentState("completion");
  };

  const handleRestart = () => {
    setCurrentState("login");
    setSelectedAnswer(null);
    setCurrentQuestion(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-center px-4 py-12">
      {currentState === "login" && <LoginScreen />}
      {currentState === "waiting" && <WaitingScreen onStart={handleStart} />}
      {currentState === "quiz" && (
        <QuizScreen
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          currentQuestion={currentQuestion}
          onQuizComplete={handleQuizComplete}
        />
      )}
      {currentState === "completion" && (
        <CompletionScreen onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
