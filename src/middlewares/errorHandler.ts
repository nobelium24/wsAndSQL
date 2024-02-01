import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    // Handle specific error types
    if (err.name === "AuthenticationError") {
        // Handle custom authentication errors
        return res.status(401).json({ message: err.message || "Authentication error", status: false });
    } else if (err.name === "AuthorizationError") {
        // Handle custom authorization errors
        return res.status(403).json({ message: err.message || "Authorization error", status: false });
    } else if (err.name === "FailedTokenVerificationError") {
        return res.status(401).json({ message: err.message || "Authentication error", status: false });
    } else if (err.name === "Failed to generate token") {
        return res.status(500).json({ message: err.message || "Internal server error", status: false });
    } else if (err instanceof jwt.JsonWebTokenError) {
        return res.status(403).json({ message: err.message || "Authorization error", status: false });
    }

    // Handle other types of errors
    res.status(500).json({ message: err.message || "Internal server error", status: false });
    next();
};

export { errorHandler };
