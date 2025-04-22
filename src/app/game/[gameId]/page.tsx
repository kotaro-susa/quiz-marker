"use client";
import { CompletionScreen } from "@/components/completion/CompletionScreen";
import { LoginScreen } from "@/components/login/LoginScreen";
import { QuizScreen } from "@/components/quiz/QuizScreen";
import { WaitingScreen } from "@/components/waiting/WaitingScreen";
import { useGameStore } from "@/stores/gameStore";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { isJwtExpired } from "@/util/jwt";
import { JwtPayload } from "@/util/type";
import { useParams } from "next/navigation";
import { useUserStore } from "@/stores/userStore";

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { currentState, setCurrentState } = useGameStore();
  const params = useParams();
  const { setUserName, setBirthday, setIsRegister } = useUserStore();

  useEffect(() => {
    // jwtTokenを持っているかのチェックを行い、初期状態を決定する
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.gameId === params.gameId) {
        const { username, birthday } = decoded;
        setUserName(username);
        setBirthday(birthday);
        setIsRegister(true);
        setCurrentState("login");
      }
    } else {
      setIsRegister(false);
      setCurrentState("login");
    }
  }, [params.gameId]);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
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
