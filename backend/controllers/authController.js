import { AuthService } from "../services/AuthService.js";
import { ResponseTrait } from "../traits/ResponseTrait.js";

// User registration
export const register = async (req, res) => {
    const response = await AuthService.register(req.body);
  
    if (!response.success) {
      return ResponseTrait.errorResponse(res, response.error, 500);
    }
  
    return ResponseTrait.successResponse(res, {
      message: "User successfully registered"
    });
  };