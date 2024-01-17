"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUserToken = exports.generateUserToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const generateUserToken = (email) => {
    if (!secret)
        throw new Error("No secret provided");
    const token = jsonwebtoken_1.default.sign({ email, role: "user" }, secret, { expiresIn: "12h" });
    return token;
};
exports.generateUserToken = generateUserToken;
const verifyUserToken = (token) => {
    try {
        if (!token)
            throw new Error("No token provided");
        if (!secret)
            throw new Error("No secret provided");
        const decodedUser = jsonwebtoken_1.default.verify(token, secret);
        const role = decodedUser.role;
        if (role !== "user")
            throw new Error("Invalid token");
        return decodedUser;
    }
    catch (error) {
        throw { message: "TokenVerificationError", error };
    }
};
exports.verifyUserToken = verifyUserToken;
