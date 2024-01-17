import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secret = process.env.JWT_SECRET;

interface MyJwtPayload extends JwtPayload {
    role?: string;
}


export const generateUserToken = (email: string): string => {
    if (!secret) throw new Error("No secret provided");
    const token = jsonwebtoken.sign({ email, role: "user" }, secret, { expiresIn: "12h" });
    return token;
}

export const verifyUserToken = (token: string): any => {
    try {
        if (!token) throw new Error("No token provided");
        if (!secret) throw new Error("No secret provided");
        const decodedUser = jsonwebtoken.verify(token, secret) as MyJwtPayload;
        const role = decodedUser.role;
        if (role !== "user") throw new Error("Invalid token");
        return decodedUser;
    } catch (error) {
        throw {message:"TokenVerificationError",error};
    }
};