// pages/game-not-started.js
import { Heart, Clock } from "lucide-react";

const GameNotStarted = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Heart className="w-6 h-6 text-pink-500" />
            <span className="text-gray-800 font-medium text-lg">
              Wedding Quiz
            </span>
          </div>
          <div className="flex items-center bg-pink-50 px-4 py-2 rounded-full">
            <Clock className="w-5 h-5 text-pink-500 mr-2" />
            <span className="text-pink-600 font-medium">準備中</span>
          </div>
        </div>

        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            このクイズは終了もしくはまだ始まっていません
          </h2>
          <p className="text-gray-600 mb-4">
            クイズの開催者にお問い合わせ下さい
          </p>
          <div className="animate-bounce">
            <Clock className="w-16 h-16 text-pink-500 mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameNotStarted;
