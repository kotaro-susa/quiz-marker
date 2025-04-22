import { supabase } from "./supabaseClient";
import { Quiz, QuizState } from "./type";

export const setupQuizChannel = (
  gameId: string,
  setCurrentQuiz: (quiz: Quiz) => void,
  setCurrentState: (state: QuizState) => void
) => {
  const channel = supabase
    .channel("current_quiz_channel")
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "current_quiz",
        filter: `game_id=eq.${gameId}`,
      },
      async (payload) => {
        const newQuizId = payload.new.quiz_id;
        const { data, error } = await supabase
          .from("quizzes")
          .select("*")
          .eq("id", newQuizId)
          .single();
        if (data && !error) {
          setCurrentQuiz(data);
          setCurrentState("quiz");
        }
      }
    )
    .subscribe();

  return channel;
};
