import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useQuizStore } from "@/stores/quizStore";
import { useParams } from "next/navigation";
import { supabase } from "@/util/supabaseClient";
import { useGameStore } from "@/stores/gameStore";
import { setupQuizChannel } from "@/util/setupQuizChannel";

interface WaitingScreenProps {
  onStart: () => void;
}

export const WaitingScreen: React.FC<WaitingScreenProps> = ({ onStart }) => {
  const [isReady, setIsReady] = useState(false);
  const { currentState, setCurrentState } = useGameStore();
  const setCurrentQuiz = useQuizStore((state) => state.setCurrentQuiz);
  const params = useParams();
  useEffect(() => {
    const channel = setupQuizChannel(
      params.gameId as string,
      setCurrentQuiz,
      setCurrentState
    );
    return () => {
      supabase.removeChannel(channel);
    };
  }, [params.gameId, setCurrentQuiz, setCurrentState]);

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-pink-500" />
            <span className="text-gray-800 font-medium text-lg">
              Wedding Quiz
            </span>
          </div>
        </div>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {isReady
              ? "クイズを開始できます！"
              : "クイズ開始までお待ちください"}
          </h2>
          <p className="text-gray-600 mb-8">
            {isReady
              ? "下のボタンを押してクイズを始めましょう"
              : "まもなくクイズが始まります"}
          </p>
          {isReady && (
            <button
              onClick={onStart}
              className="bg-pink-500 text-white px-8 py-4 rounded-xl font-medium hover:bg-pink-600 transition duration-200 shadow-lg shadow-pink-200 animate-bounce"
            >
              スタート！
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
