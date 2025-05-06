import { isJwtExpired } from "../../util/jwt";
import { supabase } from "../../util/supabaseClient";
import { Quiz, QuizState, QuizStateType } from "../../util/const";

type QuizUpdateHandler = (quiz: Quiz) => void;
type GameStateUpdateHandler = (state: QuizStateType) => void;
export const setupQuizChannel = (
  gameId: string,
  onQuizUpdate: QuizUpdateHandler,
  onGameStateUpdate: GameStateUpdateHandler
) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    if (isJwtExpired(token)) {
      throw new Error("JWT token has expired");
    }
  } else {
    throw new Error("No JWT token found");
  }

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
        try {
          const newQuizId = payload.new.quiz_id;
          if (payload.new.is_last_quiz) {
            onGameStateUpdate(QuizState.BEFORE_COMPLETION);
          }
          const { data, error } = await supabase
            .from("quizzes")
            .select("*")
            .eq("id", newQuizId)
            .single();
          if (data && !error) {
            onQuizUpdate(data);
          }
        } catch (err) {
          console.error("Error while handling quiz update:", err);
        }
      }
    )
    .subscribe();

  return channel;
};
