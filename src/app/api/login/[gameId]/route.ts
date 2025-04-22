import { generateJwtToken } from "@/util/jwt";
import { supabase } from "@/util/supabaseClient";
import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  user_name: z.string().min(2),
  birthday_code: z.string().length(4),
});

export async function POST(
  req: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const body = await req.json();
    const game_id = params.gameId;
    const { user_name, birthday_code } = registerSchema.parse(body);

    // 該当するユーザー情報を取得する
    const { data: user, error } = await supabase
      .from("users")
      .select("id,user_name,game_id")
      .eq("user_name", user_name)
      .eq("birthday_code", birthday_code)
      .eq("game_id", game_id)
      .single();

    if (error || !user) {
      return NextResponse.json(
        { message: "認証失敗:ユーザーが見つかりません" },
        { status: 401 }
      );
    }
    const token = generateJwtToken({
      id: user.id,
      game_Id: user.game_id,
      user_name: user.user_name,
      birthday_code: birthday_code,
    });

    return NextResponse.json({
      token,
      user: { id: user.id, user_name: user.user_name },
    });
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
