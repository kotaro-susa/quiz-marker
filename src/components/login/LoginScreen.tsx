import React, { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { useParams } from "next/navigation";
import { useGameStore } from "@/stores/gameStore";

export const LoginScreen = () => {
  const params = useParams();
  const {
    userName,
    setUserName,
    userBirthday,
    setBirthday,
    error,
    setError,
    isRegister,
    setIsRegister,
  } = useUserStore();
  const { setCurrentState } = useGameStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleLoginSubmit = async (e: React.FormEvent) => {
    try {
      setIsSubmitting(true);
      e.preventDefault();
      setError("");
      if (!userName || !userBirthday) {
        setError("ユーザー名と誕生日は必須です");
        return;
      }
      if (userBirthday.length !== 4 || !/^\d+$/.test(userBirthday)) {
        setError("4桁の数字で入力してください");
        return;
      }

      if (!isRegister) {
        const res = await fetch(`/api/register/${params.gameId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_name: userName,
            birthday_code: userBirthday,
          }),
        });
        if (res.ok) {
          setIsRegister(true);
        } else {
          const data = await res.json();
          setError(data.error);
        }
      } else {
        const res = await fetch(`/api/login/${params.gameId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_name: userName,
            birthday_code: userBirthday,
          }),
        });
        const result = await res.json();
        if (res.ok) {
          localStorage.setItem("jwtToken", result.token);
          setCurrentState("waiting");
        } else {
          setError(result.message || "ログイン失敗");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <Heart className="w-12 h-12 text-pink-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Wedding Quiz</h1>

        {isRegister ? (
          <p className="text-gray-600">ログインして、ゲームに参加しましょう</p>
        ) : (
          <p className="text-gray-600">
            ようこそ！お名前と誕生日とパスワードを入力してください
          </p>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              お名前(アルファベット)
            </label>
            <input
              type="text"
              id="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="kotaro"
            />
          </div>

          <div>
            <label
              htmlFor="birthdate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              誕生日を入力してください。(例: 0531)
            </label>
            <input
              type="text"
              id="birthdate"
              value={userBirthday}
              onChange={(e) => setBirthday(e.target.value)}
              maxLength={6}
              className="text-black w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              placeholder="0531"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition duration-200 font-medium"
          >
            {isRegister ? <span>ログイン</span> : <span>登録</span>}
          </button>
        </form>
      </div>
      {isSubmitting && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Loader2 className="w-12 h-12 text-pink-500 animate-spin mb-4" />
        </div>
      )}
    </div>
  );
};
