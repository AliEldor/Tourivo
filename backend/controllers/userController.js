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

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await UserService.updateUser(id, req.body);
    return ResponseTrait.successResponse(res, userData);
  } catch (error) {
    const statusCode = error.message === "User not found" ? 404 : 500;
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to update user",
      statusCode
    );
  }
};


