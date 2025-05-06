import { create } from "zustand";

// ユーザーに関するデータをまとめる
type UserState = {
  userId: string;
  setUserId: (id: string) => void;
  userName: string;
  setUserName: (name: string) => void;
  userBirthday: string;
  setBirthday: (birthday: string) => void;
  error: string;
  setError: (error: string) => void;
  isRegister: boolean;
  setIsRegister: (isLogin: boolean) => void;
};
export const useUserStore = create<UserState>((set) => ({
  userId: "",
  setUserId: (id) => set({ userId: id }),
  userName: "",
  setUserName: (name) => set({ userName: name }),
  userBirthday: "",
  setBirthday: (birthday) => set({ userBirthday: birthday }),
  error: "",
  setError: (error) => set({ error }),
  isRegister: false,
  setIsRegister: (isLogin: boolean) => set({ isRegister: isLogin }),
}));
