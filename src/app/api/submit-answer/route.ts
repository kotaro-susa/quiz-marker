// app/api/submit-answer/route.ts
import { NextRequest, NextResponse } from "next/server";
import { submitAnswer } from "@/app/infrastructure/answersRepository";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { gameId, quizId, userId, answer, isCorrect } = body;

    if (!gameId || !quizId || !userId || answer == null || isCorrect == null) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const { error } = await submitAnswer({
      gameId,
      quizId,
      userId,
      answer,
      isCorrect,
    });

    if (error) {
      console.error("Insert error:", error);
      return NextResponse.json(
        { error: "Failed to save answer" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
