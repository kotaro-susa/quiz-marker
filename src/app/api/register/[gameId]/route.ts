import { supabase } from "@/util/supabaseClient";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  user_name: z.string().min(2),
  birthday_code: z.string().length(4),
  password: z.string().length(6),
});

export async function POST(
  req: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const body = await req.json();
    const game_id = params.gameId;
    const { user_name, birthday_code, password } = registerSchema.parse(body);

    // 既に同じゲームで同じユーザーネームが存在するかをチェックする
    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .eq("user_name", user_name)
      .eq("game_id", game_id)
      .single();

    if (existingUser) {
      return NextResponse.json(
        { error: "このユーザー名は既に使われています。" },
        { status: 400 }
      );
    }
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);

    const { data, error } = await supabase
      .from("users")
      .insert([{ user_name, birthday_code, password_hash, game_id }]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "ユーザー登録成功", data },
      { status: 200 }
    );
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: "入力内容が正しくありません", details: err.errors },
        { status: 422 }
      );
    }
    return NextResponse.json({ error: "サーバーエラー" }, { status: 500 });
  }
}
