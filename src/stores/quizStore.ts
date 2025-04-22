// stores/quizStore.ts
import { Quiz } from "@/util/type";
import { create } from "zustand";

type QuizStore = {
  currentQuiz: Quiz | null;
  setCurrentQuiz: (quiz: Quiz) => void;
};

export const useQuizStore = create<QuizStore>((set) => ({
  currentQuiz: null,
  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
}));
