import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "./type";

const secretKey =
  process.env.EXT_PUBLIC_JWT_SECRET_KEY || "your-default-secret-key";
export function generateJwtToken(user: {
  id: string;
  game_Id: string;
  user_name: string;
  birthday_code: string;
}) {
  const payload = {
    sub: user.id,
    username: user.user_name,
    gameId: user.game_Id,
    birthday: user.birthday_code,
  };

  return jwt.sign(payload, secretKey, { expiresIn: "3h" });
}

export function verifyJwtToken(token: string) {
  try {
    return jwt.verify(token, secretKey);
  } catch {
    return null;
  }
}

export function isJwtExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const now = Date.now() / 1000; // 現在時刻を秒に変換
    return decoded.exp < now; // 現在より過去なら期限切れ
  } catch (e) {
    console.error("トークンのデコードに失敗しました", e);
    return true;
  }
}
