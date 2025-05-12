import jwt from "jsonwebtoken";
import { ResponseTrait } from "../traits/ResponseTrait.js";

export const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

  if (!token) {
    return ResponseTrait.errorResponse(
      res, 
      "You're not authorized", 
      401
    );
  }
}