import React, { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { useUserStore } from "@/stores/userStore";
import { supabase } from "@/util/supabaseClient";

export const LoginScreen = () => {
  const {
    userName,
    setUserName,
    userBirthday,
    setBirthday,
    loginError,
    setLoginError,
    isRegister,
    setIsRegister,
  } = useUserStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleLoginSubmit = async (e: React.FormEvent) => {
    setIsSubmitting(true);
    e.preventDefault();
    setLoginError("");
    if (!userName || !userBirthday) {
      setLoginError("両方の項目を入力してください");
      return;
    }
    if (userBirthday.length !== 6 || !/^\d+$/.test(userBirthday)) {
      setLoginError("6桁の数字で入力してください");
      return;
    }
    const emailLie = `${userName}@gmail.com`;
    const userInfo = { email: emailLie, password: userBirthday };
    if (!isRegister) {
      const { data, error } = await supabase.auth.signUp(userInfo);
      if (error) {
        console.log(error.message);
      } else {
        console.log(data);
        setIsRegister(true);
      }
    } else {
      const { data, error } = await supabase.auth.signInWithPassword(userInfo);
      if (error) {
        console.error("ログインエラー", error.message);
        setIsSubmitting(false);
        return;
      }
      if (data?.session.access_token) {
        localStorage.setItem("jwt_token", data.session.access_token);
      }
    }
    setIsSubmitting(false);
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
            ようこそ！お名前と誕生日を入力してください
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
              誕生日（日付）と生まれ年の下2桁を入力してください。(例: 042894)
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

          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
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
