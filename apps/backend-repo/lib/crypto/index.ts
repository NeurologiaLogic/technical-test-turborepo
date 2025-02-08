import { createHash } from "crypto";

export const hashPassword = (password: string, salt: string = "random_salt"): string => {
  return createHash("sha256").update(password + salt).digest("hex"); // SHA-256 hashing
};