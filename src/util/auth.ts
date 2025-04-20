import { supabase } from "@/util/supabaseClient";
import bcrypt from "bcryptjs";

export async function loginUser(
  username: string,
  birthday: string,
  password: string
) {
  // ユーザー情報を取得
  const { data, error } = await supabase
    .from("users")
    .select("password_hash")
    .eq("username", username)
    .eq("birthday_code", birthday)
    .single();

  if (error) {
    console.error("ユーザー情報の取得失敗:", error.message);
    return;
  }

  // 入力されたパスワードと保存されたハッシュを比較
  const isMatch = await bcrypt.compare(password, data.password_hash);

  if (isMatch) {
    console.log("ログイン成功");
  } else {
    console.log("パスワードが間違っています");
  }
}


