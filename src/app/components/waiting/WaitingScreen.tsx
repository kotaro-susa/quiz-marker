import React, { useState, useEffect } from "react";
import { Timer, Heart } from "lucide-react";

interface WaitingScreenProps {
  onStart: () => void;
}

export const WaitingScreen: React.FC<WaitingScreenProps> = ({ onStart }) => {
  const [countdown, setCountdown] = useState(1); // 10秒のカウントダウン
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsReady(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          <div className="flex items-center bg-pink-50 px-4 py-2 rounded-full">
            <Timer className="w-5 h-5 text-pink-500 mr-2" />
            <span className="text-pink-600 font-medium">{countdown}秒</span>
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
