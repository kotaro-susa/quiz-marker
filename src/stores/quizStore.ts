// stores/quizStore.ts
import { Quiz } from "@/util/const";
import { create } from "zustand";

type QuizStore = {
  currentQuiz: Quiz | null;
  setCurrentQuiz: (quiz: Quiz) => void;
  nextQuiz: Quiz | null;
  setNextQuiz: (quiz: Quiz) => void;
  selectedAnswer: number | null;
  setSelectedAnswer: (answerIndex: number) => void;
  errorMessage: string | null;
  setErrorMessage: (message: string) => void;
};

export const useQuizStore = create<QuizStore>((set) => ({
  currentQuiz: null,
  setCurrentQuiz: (quiz) => set({ currentQuiz: quiz }),
  nextQuiz: null,
  setNextQuiz: (quiz) => set({ nextQuiz: quiz }),
  selectedAnswer: null,
  setSelectedAnswer: (answerIndex) => set({ selectedAnswer: answerIndex }),
  errorMessage: null,
  setErrorMessage: (message) => set({ errorMessage: message }),
}));
