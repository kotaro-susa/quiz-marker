import React, { useState, useEffect } from "react";
import { Heart, PartyPopper } from "lucide-react";

interface CompletionScreenProps {
  onRestart: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  onRestart,
}) => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onRestart();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onRestart]);

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-center mb-8">
          <PartyPopper className="w-16 h-16 text-pink-500" />
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            クイズ完了！
          </h2>
          <p className="text-gray-600 mb-2">ご参加ありがとうございました</p>
          <p className="text-pink-500 font-medium">
            {countdown}秒後にトップページに戻ります
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <Heart className="w-8 h-8 text-pink-500 animate-pulse" />
        </div>
      </div>
    </div>
  );
};
