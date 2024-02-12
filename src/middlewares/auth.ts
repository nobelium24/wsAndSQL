import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/userModel";
import { verifyUserToken } from "../services/sessionService";


export const authenticateUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).send({ message: "Unauthorized" });

    try {
        const userEmail = verifyUserToken(token);
        const user: UserModel | null = await UserModel.findOne({
            where: {
                email: userEmail
            }
        });
        if (!user) return res.status(404).send({ message: "User not found" });

        // Store the authenticated user in the request object so it can be used in the controller
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};