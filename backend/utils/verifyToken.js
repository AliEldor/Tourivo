import jwt from "jsonwebtoken";
import { ResponseTrait } from "../traits/ResponseTrait.js";

export const verifyToken = (req, res, next) => {
    let token = req.cookies.accessToken;

    // If no token in cookie, check Authorization header
    if (!token && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7);
        }
    }

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

export const verifyUser = (req, res, next) => {
    // First verify that the token exists and is valid
    verifyToken(req, res, function() {
        // This function only runs if verifyToken called next()
        // then check if user has appropriate permissions
        if (req.user.id === req.params.id || req.user.role === "admin") {
            next();
        } else {
            return ResponseTrait.errorResponse(
                res, 
                "You're not authenticated", 
                401
            );
        }
    });
};

export const verifyAdmin = (req, res, next) => {
    // First verify that the token exists and is valid
    verifyToken(req, res, function() {
        // check if user is an admin
        if (req.user.role === "admin") {
            next();
        } else {
            return ResponseTrait.errorResponse(
                res, 
                "You're not authorized", 
                401
            );
        }
    });
};