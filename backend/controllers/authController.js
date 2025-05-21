import { AuthService } from "../services/AuthService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

export const register = async (req, res) => {
  try {
    const result = await AuthService.register(req.body);
    return ResponseTrait.successResponse(res, result);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to register user",
      500
    );
  }
};


