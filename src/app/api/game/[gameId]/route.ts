// app/api/game/[gameId]/route.ts
import { getGameInfo } from "@/app/infrastructure/gameRepository";

import { NextRequest, NextResponse } from "next/server";
type Params = Promise<{ [key: string]: string }>;
type Props = {
  params: Params;
};

export async function GET(req: NextRequest, { params }: Props) {
  const { gameId } = await params;
  if (!gameId) {
    return NextResponse.json(
      { message: "ゲームが見つかりません" },
      { status: 404 }
    );
  }

  const { data, error } = await getGameInfo(gameId);
  if (error) {
    return NextResponse.json(
      { message: "ゲーム情報の取得に失敗しました。" },
      { status: 500 }
    );
  }

  if (!data) {
    return NextResponse.json(
      { message: "指定されたゲームが見つかりません。" },
      { status: 404 }
    );
  }

  const { title, status } = data;
  return NextResponse.json({ title, status });
}
