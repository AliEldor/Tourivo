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

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await UserService.deleteUser(id);
    return ResponseTrait.successResponse(res, result);
  } catch (error) {
    const statusCode = error.message === "User not found" ? 404 : 500;
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to delete user",
      statusCode
    );
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = await UserService.getSingleUser(id);
    return ResponseTrait.successResponse(res, userData);
  } catch (error) {
    const statusCode = error.message === "User not found" ? 404 : 500;
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to find user",
      statusCode
    );
  }
};

export const getAllUser = async (req, res) => {
  try {
    const result = await UserService.getAllUsers();
    return ResponseTrait.successResponse(res, {
      count: result.count,
      data: result.data,
    });
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to find users",
      500
    );
  }
};
