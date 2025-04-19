import { create } from "zustand";

// ユーザーに関するデータをまとめる
type UserState = {
  userName: string;
  setUserName: (name: string) => void;
  userBirthday: string;
  setBirthday: (birthday: string) => void;
  loginError: string;
  setLoginError: (error: string) => void;
  isRegister: boolean;
  setIsRegister: (isLogin: boolean) => void;
};
export const useUserStore = create<UserState>((set) => ({
  userName: "",
  setUserName: (name) => set({ userName: name }),
  userBirthday: "",
  setBirthday: (birthday) => set({ userBirthday: birthday }),
  loginError: "",
  setLoginError: (error) => set({ loginError: error }),
  isRegister: false,
  setIsRegister: (isLogin: boolean) => set({ isRegister: isLogin }),
}));
