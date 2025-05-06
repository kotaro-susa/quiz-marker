import { supabase } from "@/util/supabaseClient";

export const findUserByNameAndBirthday = async (
  userName: string,
  birthdayCode: string,
  gameId: string
) => {
  const { data, error } = await supabase
    .from("users")
    .select("id, user_name, game_id")
    .eq("user_name", userName)
    .eq("birthday_code", birthdayCode)
    .eq("game_id", gameId)
    .maybeSingle(); // ユーザーが存在しない可能性があるため

  return { user: data, error };
};

export const checkUserNameExists = async (userName: string, gameId: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("id")
    .eq("user_name", userName)
    .eq("game_id", gameId)
    .maybeSingle();

  return { exists: !!data, error };
};

export const createUser = async (
  userName: string,
  birthdayCode: string,
  gameId: string
) => {
  const { data, error } = await supabase
    .from("users")
    .insert([
      { user_name: userName, birthday_code: birthdayCode, game_id: gameId },
    ])
    .select(); // 挿入結果を返すため

  return { data, error };
};
