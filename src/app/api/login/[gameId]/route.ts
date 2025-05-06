// app/api/game/[gameId]/register/route.ts
import { generateJwtToken } from "@/util/jwt";
import { NextResponse } from "next/server";
import { z } from "zod";
import { findUserByNameAndBirthday } from "@/app/infrastructure/userRepository";

const registerSchema = z.object({
  user_name: z.string().min(2),
  birthday_code: z.string().length(4),
});

type Params = Promise<{ [key: string]: string }>;
type Props = {
  params: Params;
};

export async function POST(req: Request, { params }: Props) {
  try {
    const body = await req.json();
    const { gameId } = await params;
    const { user_name, birthday_code } = registerSchema.parse(body);

    const { user, error } = await findUserByNameAndBirthday(
      user_name,
      birthday_code,
      gameId
    );

    if (error || !user) {
      return NextResponse.json(
        { message: "認証失敗: ユーザーが見つかりません" },
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
