import { QuizState } from "@/util/type";
import { create } from "zustand";

// ゲームに関するデータをまとめる

type GameState = {
  currentState: QuizState;
  setCurrentState: (state: QuizState) => void;
};
export const useGameStore = create<GameState>((set) => ({
  currentState: null,
  setCurrentState: (state) => set({ currentState: state }),
}));
