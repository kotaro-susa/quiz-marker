import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const nextStatus = "1";
  return NextResponse.json({ nextStatus });
}
