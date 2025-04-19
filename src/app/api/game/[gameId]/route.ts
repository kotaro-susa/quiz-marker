// app/api/game/[gameId]/route.ts
import { NextRequest, NextResponse } from "next/server";

type GameInfo = {
  gameId: string;
  gameTitle: string;
};

const mockGameData: Record<string, GameInfo> = {
  "123": { gameId: "123", gameTitle: "康太郎と由衣のクイズ大会" },

  "456": { gameId: "456", gameTitle: "Game B" },
};

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ gameId: string }> }
) {
  const { gameId } = await context.params;

  if (!gameId || !mockGameData[gameId]) {
    return NextResponse.json(
      { message: "ゲームが見つかりません" },
      { status: 404 }
    );
  }

  return NextResponse.json(mockGameData[gameId]);
}
