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

export const QuizState = {
  LOGIN: "login",
  WAITING: "waiting",
  QUIZ: "quiz",
  BEFORE_COMPLETION: "before_completion",
  COMPLETION: "completion",
} as const;

export type QuizStateType = (typeof QuizState)[keyof typeof QuizState];

export const GameStatus = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ACTIVE: "active",
  ENDED: "ended",
  ARCHIVED: "archived",
} as const;

export type GameStatusType = (typeof GameStatus)[keyof typeof GameStatus];
