import React, { useEffect, useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { useQuizStore } from "@/stores/quizStore";
import { useParams } from "next/navigation";
import { setupQuizChannel } from "@/app/infrastructure/setupQuizChannel";
import { useGameStore } from "@/stores/gameStore";
import { supabase } from "@/util/supabaseClient";
import { useUserStore } from "@/stores/userStore";
import { QuizState } from "@/util/const";

export const QuizScreen = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentQuiz, selectedAnswer, setSelectedAnswer } = useQuizStore();
  const { setUserCurrentState, userCurrentState, gameTitle } = useGameStore();
  const { userId } = useUserStore();
  const params = useParams();
  const handleSubmit = async () => {
    if (!selectedAnswer) {
      return;
    }
    setIsSubmitting(true);
    try {
      await fetch(`/api/submit-answer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gameId: params.gameId,
          quizId: currentQuiz?.id,
          userId: userId,
          answer: selectedAnswer - 1,
          isCorrect:
            currentQuiz?.correct_index === selectedAnswer - 1 ? true : false,
        }),
      });
      if (userCurrentState === QuizState.BEFORE_COMPLETION) {
        setUserCurrentState(QuizState.COMPLETION);
      }
    } catch (error) {
      console.error("回答の送信に失敗しました", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // useEffect(() => {
  //   const channel = setupQuizChannel(
  //     params.gameId as string,
  //     setCurrentQuiz,
  //     setUserCurrentState
  //   );
  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, [params.gameId, setCurrentQuiz, setUserCurrentState]);

  return (
    <div className="w-full max-w-md relative">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <span className="text-gray-800 font-medium">
              {gameTitle ? gameTitle : "クリスタルアナザースカイ"}
            </span>
          </div>
        </div>
        <div className="mb-8">
          <p className="text-lg font-medium text-gray-800 leading-relaxed">
            {currentQuiz && currentQuiz.question}
          </p>
        </div>
        <div className="space-y-3">
          {currentQuiz &&
            currentQuiz.options.map((option, index) => (
              <button
                key={index + 1}
                onClick={() => setSelectedAnswer(index + 1)}
                className={`w-full p-4 rounded-xl flex items-center space-x-3 transition-all duration-200 ${
                  selectedAnswer === index + 1
                    ? "bg-pink-500 text-white shadow-lg shadow-pink-200"
                    : "bg-pink-50 text-gray-700 hover:bg-pink-100"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedAnswer === index + 1
                      ? "bg-white bg-opacity-20 text-pink-600"
                      : "bg-pink-200 text-pink-600"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{option}</span>
              </button>
            ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || isSubmitting}
          className="w-full mt-8 bg-pink-500 text-white py-4 rounded-xl font-medium hover:bg-pink-600 transition duration-200 shadow-lg shadow-pink-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          決定
        </button>
      </div>

      {/* Loading Modal */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center shadow-xl">
            <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
            <p className="text-gray-800 font-medium text-lg">
              回答を送信中です。次のクイズが始まるまでお待ちください。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
