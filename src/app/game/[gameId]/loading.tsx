import React from "react";
import { Heart } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-white flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md text-center">
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-pink-200 rounded-full animate-ping opacity-75" />
          </div>
          <div className="relative flex justify-center">
            <Heart className="w-24 h-24 text-pink-500 animate-pulse" />
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading...</h2>
          <p className="text-gray-600">ページを読み込んでいます</p>
        </div>

        <div className="mt-8 flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
