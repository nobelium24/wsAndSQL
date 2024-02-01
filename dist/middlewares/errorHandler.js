"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errorHandler = (err, req, res, next) => {
    console.error(err);
    // Handle specific error types
    if (err.name === "AuthenticationError") {
        // Handle custom authentication errors
        return res.status(401).json({ message: err.message || "Authentication error", status: false });
    }
    else if (err.name === "AuthorizationError") {
        // Handle custom authorization errors
        return res.status(403).json({ message: err.message || "Authorization error", status: false });
    }
    else if (err.name === "FailedTokenVerificationError") {
        return res.status(401).json({ message: err.message || "Authentication error", status: false });
    }
    else if (err.name === "Failed to generate token") {
        return res.status(500).json({ message: err.message || "Internal server error", status: false });
    }
    else if (err instanceof jsonwebtoken_1.default.JsonWebTokenError) {
        return res.status(403).json({ message: err.message || "Authorization error", status: false });
    }
    // Handle other types of errors
    res.status(500).json({ message: err.message || "Internal server error", status: false });
    next();
};
exports.errorHandler = errorHandler;
