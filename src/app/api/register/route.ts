import { NextResponse } from "next/server";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(2),
  birthday: z.string().length(4),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { name, birthday } = parsed.data;
    // DBに登録

    return NextResponse.json({ name });
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
