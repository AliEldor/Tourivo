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

  // If token exists, verify it
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return ResponseTrait.errorResponse(
        res, 
        "Token is invalid", 
        401
      );
    }

    req.user = decoded;
    next();
  });
};

