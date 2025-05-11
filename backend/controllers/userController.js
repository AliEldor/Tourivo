import { UserService } from "../services/UserService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

// Create new user
export const createUser = async (req, res) => {
    const response = await UserService.createUser(req.body);
  
    if (!response.success) {
      return ResponseTrait.errorResponse(res, response.error, 500);
    }
  
    return ResponseTrait.successResponse(res, response.data);
  };

  // Update user
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const response = await UserService.updateUser(id, req.body);
  
    if (!response.success) {
      return ResponseTrait.errorResponse(
        res,
        response.error,
        response.error === "User not found" ? 404 : 500
      );
    }
  
    return ResponseTrait.successResponse(res, response.data);
  };

  // Delete user
export const deleteUser = async (req, res) => {
    const { id } = req.params;
    const response = await UserService.deleteUser(id);
  
    if (!response.success) {
      return ResponseTrait.errorResponse(
        res,
        response.error,
        response.error === "User not found" ? 404 : 500
      );
    }
  
    return ResponseTrait.successResponse(res, {
      message: "Successfully deleted",
    });
  };

  // Get single user
export const getSingleUser = async (req, res) => {
    const { id } = req.params;
    const response = await UserService.getSingleUser(id);
  
    if (!response.success) {
      return ResponseTrait.errorResponse(
        res,
        response.error,
        response.error === "User not found" ? 404 : 500
      );
    }
  
    return ResponseTrait.successResponse(res, response.data);
  };

  // Get all users
export const getAllUser = async (req, res) => {
    const response = await UserService.getAllUsers();
  
    if (!response.success) {
      return ResponseTrait.errorResponse(res, response.error, 500);
    }
  
    return ResponseTrait.successResponse(res, {
      count: response.count,
      data: response.data,
    });
  };