import React, { useState } from "react";
import { Heart, X, Timer, Loader2 } from "lucide-react";
import { useGameStore } from "@/stores/gameStore";
import { useQuizStore } from "@/stores/quizStore";

interface QuizScreenProps {
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
  currentQuestion: number;
  onQuizComplete: () => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  selectedAnswer,
  onAnswerSelect,
  currentQuestion,
  onQuizComplete,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { currentQuiz, setCurrentQuiz } = useQuizStore();

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (currentQuestion === 2) {
        onQuizComplete();
      }
    }, 3000);
  };

  return (
    <div className="w-full max-w-md relative">
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-pink-500" />
            <span className="text-gray-800 font-medium">新郎新婦クイズ</span>
          </div>
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <X className="w-5 h-5" />
          </button>
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
                key={index}
                onClick={() => onAnswerSelect(index)}
                className={`w-full p-4 rounded-xl flex items-center space-x-3 transition-all duration-200 ${
                  selectedAnswer === index
                    ? "bg-pink-500 text-white shadow-lg shadow-pink-200"
                    : "bg-pink-50 text-gray-700 hover:bg-pink-100"
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedAnswer === index
                      ? "bg-white bg-opacity-20 text-pink-600"
                      : "bg-pink-200 text-pink-600"
                  }`}
                >
                  {index}
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
              回答を送信中です
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
