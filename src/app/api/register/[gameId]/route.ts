// app/api/game/[gameId]/register/route.ts
import { NextResponse } from "next/server";
import { z } from "zod";
import {
  checkUserNameExists,
  createUser,
} from "@/app/infrastructure/userRepository";

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

    const { exists, error: checkError } = await checkUserNameExists(
      user_name,
      gameId
    );
    if (checkError) {
      return NextResponse.json({ error: checkError.message }, { status: 500 });
    }

    if (exists) {
      return NextResponse.json(
        { error: "このユーザー名は既に使われています。" },
        { status: 400 }
      );
    }

    const { data, error } = await createUser(user_name, birthday_code, gameId);
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
