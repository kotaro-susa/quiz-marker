export type JwtPayload = {
  sub: string;
  username: string;
  gameId: string;
  birthday: string;
  exp: number;
};

export type Quiz = {
  id: string;
  question: string;
  options: string[];
  correct_index: number;
};

export type QuizState = "login" | "waiting" | "quiz" | "completion" | null;
