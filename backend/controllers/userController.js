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