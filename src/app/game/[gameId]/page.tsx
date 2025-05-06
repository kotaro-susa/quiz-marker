"use client";
import { CompletionScreen } from "@/components/completion/CompletionScreen";
import { LoginScreen } from "@/components/login/LoginScreen";
import { QuizScreen } from "@/components/quiz/QuizScreen";
import { WaitingScreen } from "@/components/waiting/WaitingScreen";
import { useGameStore } from "@/stores/gameStore";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  GameStatus,
  GameStatusType,
  JwtPayload,
  QuizState,
} from "@/util/const";
import { useParams } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "next/navigation";
import LoadingScreen from "./loading";

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const { userCurrentState, setUserCurrentState, setGameTitle, setGameStatus } =
    useGameStore();
  const params = useParams();
  const router = useRouter();
  const { setUserName, setBirthday, setIsRegister } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkGameStatus = async () => {
      try {
        const res = await fetch(`/api/game/${params.gameId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          console.error("ゲーム状態確認に失敗しました");
          return;
        }

        const { title, status } = await res.json();
        setGameStatus(status);
        setGameTitle(title);

        const inactiveStatuses: GameStatusType[] = [
          GameStatus.DRAFT,
          GameStatus.ARCHIVED,
        ];
        if (inactiveStatuses.includes(status)) {
          router.push("/game-not-started");
          return;
        }

        const activeStatuses: GameStatusType[] = [
          GameStatus.PUBLISHED,
          GameStatus.ACTIVE,
        ];
        if (activeStatuses.includes(status)) {
          const token = localStorage.getItem("jwtToken");
          if (token) {
            const decoded = jwtDecode<JwtPayload>(token);
            if (decoded.gameId === params.gameId) {
              setUserName(decoded.username);
              setBirthday(decoded.birthday);
              setIsRegister(true);
            } else {
              setIsRegister(false);
            }
          } else {
            setIsRegister(false);
          }
          setUserCurrentState("login");
        }
      } catch (error) {
        console.error("エラーが発生しました:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkGameStatus();
  }, [params.gameId]);

  const handleRestart = () => {
    setUserCurrentState("login");
    setSelectedAnswer(null);
    setCurrentQuestion(0);
  };

  if (isLoading) {
    return (
      <div>
        <LoadingScreen />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-center px-4 py-12">
      {userCurrentState === QuizState.LOGIN && <LoginScreen />}
      {userCurrentState === QuizState.WAITING && <WaitingScreen />}
      {(userCurrentState === QuizState.QUIZ ||
        userCurrentState === QuizState.BEFORE_COMPLETION) && <QuizScreen />}
      {userCurrentState === QuizState.COMPLETION && (
        <CompletionScreen onRestart={handleRestart} />
      )}
    </div>
  );
}

export default App;
