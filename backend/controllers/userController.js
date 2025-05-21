import { UserService } from "../services/UserService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

export const createUser = async (req, res) => {
  try {
    const userData = await UserService.createUser(req.body);
    return ResponseTrait.successResponse(res, userData);
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to create user",
      500
    );
  }
};


