import { supabase } from "@/util/supabaseClient";

export const getGameInfo = async (gameId: string) => {
  const { data, error } = await supabase
    .from("games")
    .select("title,status")
    .eq("id", gameId)
    .maybeSingle();
  return { data, error };
};
