import { GameStatusType, QuizStateType } from "@/util/const";
import { create } from "zustand";

// ゲームに関するデータをまとめる

type GameState = {
  userCurrentState: QuizStateType | null;
  setUserCurrentState: (state: QuizStateType) => void;
  gameTitle: string | null;
  setGameTitle: (title: string) => void;
  gameStatus: GameStatusType | null;
  setGameStatus: (status: GameStatusType) => void;
};
export const useGameStore = create<GameState>((set) => ({
  userCurrentState: null,
  setUserCurrentState: (state) => set({ userCurrentState: state }),
  gameTitle: null,
  setGameTitle: (title: string) => set({ gameTitle: title }),
  gameStatus: null,
  setGameStatus: (status: GameStatusType) => set({ gameStatus: status }),
}));
