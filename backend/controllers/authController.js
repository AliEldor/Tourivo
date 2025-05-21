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

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login(email, password);

    // Set token in  cookies
    res.cookie("accessToken", result.token, {
      httpOnly: true,
      expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000), // 15 days
    });

    return ResponseTrait.successResponse(res, {
      token: result.token,
      data: result.data,
      role: result.role,
    });
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to login",
      error.statusCode || 500
    );
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("accessToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return ResponseTrait.successResponse(res, {
      message: "Successfully logged out",
    });
  } catch (error) {
    return ResponseTrait.errorResponse(
      res,
      error.message || "Failed to logout",
      500
    );
  }
};
