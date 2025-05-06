// app/infrastructure/answersRepository.ts
import { supabase } from "@/util/supabaseClient";

export const submitAnswer = async ({
  gameId,
  quizId,
  userId,
  answer,
  isCorrect,
}: {
  gameId: string;
  quizId: string;
  userId: string;
  answer: string;
  isCorrect: boolean;
}) => {
  return await supabase.from("answers").insert([
    {
      game_id: gameId,
      quiz_id: quizId,
      user_id: userId,
      answer,
      is_correct: isCorrect,
    },
  ]);
};
