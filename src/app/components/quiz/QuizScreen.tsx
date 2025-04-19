import React, { useState } from "react";
import { Heart, X, Timer, Loader2 } from "lucide-react";

interface QuizScreenProps {
  selectedAnswer: string | null;
  onAnswerSelect: (answer: string) => void;
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

  const answers = [
    { id: "A", text: "新郎の好きな食べ物は？" },
    { id: "B", text: "新婦の出身地は？" },
    { id: "C", text: "二人の出会いのきっかけは？" },
    { id: "D", text: "新郎が新婦にプロポーズした場所は？" },
  ];

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

        <div className="flex justify-between items-center mb-8">
          <span className="text-gray-600 font-medium">
            Quiz・{String(currentQuestion).padStart(2, "0")}
          </span>
          <div className="flex items-center text-gray-600 bg-pink-50 px-3 py-1 rounded-full">
            <Timer className="w-4 h-4 mr-1 text-pink-500" />
            03:00 min
          </div>
        </div>

        <div className="mb-8">
          <p className="text-lg font-medium text-gray-800 leading-relaxed">
            新郎新婦にまつわる質問です。正しい答えを選んでください。
          </p>
        </div>

        <div className="space-y-3">
          {answers.map((answer) => (
            <button
              key={answer.id}
              onClick={() => onAnswerSelect(answer.id)}
              className={`w-full p-4 rounded-xl flex items-center space-x-3 transition-all duration-200 ${
                selectedAnswer === answer.id
                  ? "bg-pink-500 text-white shadow-lg shadow-pink-200"
                  : "bg-pink-50 text-gray-700 hover:bg-pink-100"
              }`}
            >
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  selectedAnswer === answer.id
                    ? "bg-white bg-opacity-20 text-pink-600"
                    : "bg-pink-200 text-pink-600"
                }`}
              >
                {answer.id}
              </span>
              <span>{answer.text}</span>
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || isSubmitting}
          className="w-full mt-8 bg-pink-500 text-white py-4 rounded-xl font-medium hover:bg-pink-600 transition duration-200 shadow-lg shadow-pink-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          回答する
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
