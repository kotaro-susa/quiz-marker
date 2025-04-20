import { create } from "zustand";

// ユーザーに関するデータをまとめる
type UserState = {
  userName: string;
  setUserName: (name: string) => void;
  userBirthday: string;
  setBirthday: (birthday: string) => void;
  userPassword: string;
  setUserPassword: (password: string) => void;
  error: string;
  setError: (error: string) => void;
  isRegister: boolean;
  setIsRegister: (isLogin: boolean) => void;
};
export const useUserStore = create<UserState>((set) => ({
  userName: "",
  setUserName: (name) => set({ userName: name }),
  userBirthday: "",
  setBirthday: (birthday) => set({ userBirthday: birthday }),
  userPassword: "",
  setUserPassword: (password) => set({ userPassword: password }),
  error: "",
  setError: (error) => set({ error }),
  isRegister: false,
  setIsRegister: (isLogin: boolean) => set({ isRegister: isLogin }),
}));
