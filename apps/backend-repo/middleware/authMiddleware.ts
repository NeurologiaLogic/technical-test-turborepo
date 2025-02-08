import { admin } from "../config/firebaseConfig";
import { Request, Response, NextFunction } from "express";

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"]; // Use bracket notation

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({ error: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    if (!decodedToken) {
      return res.status(403).json({ error: "Invalid token" });
    }
    next(); // Allow access to the next middleware or route
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
}
