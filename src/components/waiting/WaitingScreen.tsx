import React, { useEffect } from "react";
import { Heart } from "lucide-react";
import { useQuizStore } from "@/stores/quizStore";
import { useParams } from "next/navigation";
import { supabase } from "@/util/supabaseClient";
import { useGameStore } from "@/stores/gameStore";
import { setupQuizChannel } from "@/app/infrastructure/setupQuizChannel";
import { GameStatus, QuizState } from "@/util/const";

export const WaitingScreen = () => {
  const { setUserCurrentState, userCurrentState, gameTitle, gameStatus } =
    useGameStore();
  const { setNextQuiz, setCurrentQuiz, nextQuiz } = useQuizStore();
  const params = useParams();
  useEffect(() => {
    if (
      gameStatus === GameStatus.ACTIVE &&
      userCurrentState !== QuizState.BEFORE_COMPLETION
    ) {
      const channel = setupQuizChannel(
        params.gameId as string,
        setNextQuiz,
        setUserCurrentState
      );
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [params.gameId, setNextQuiz, setUserCurrentState, nextQuiz]);

  useEffect(() => {
    if (nextQuiz) {
      setCurrentQuiz(nextQuiz);
      if (userCurrentState !== QuizState.BEFORE_COMPLETION) {
        setUserCurrentState(QuizState.QUIZ);
      }
    }
  }, [nextQuiz, setUserCurrentState, setCurrentQuiz]);

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-pink-500" />
            <span className="text-gray-800 font-medium text-lg">
              {gameTitle ? gameTitle : "クリスタルアナザースカイ"}
            </span>
          </div>
        </div>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {gameStatus === GameStatus.ACTIVE
              ? "クイズを受信しています"
              : "ゲームはまだ始まっていません"}
          </h2>
          <p className="text-gray-600 mb-8">
            {gameStatus === GameStatus.ACTIVE
              ? "まもなくクイズが始まります"
              : "主催者の方から連絡があるまでお待ちください"}
          </p>
        </div>
      </div>
    </div>
  );
};
