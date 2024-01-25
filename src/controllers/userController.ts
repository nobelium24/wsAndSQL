import { NextFunction, Request, Response } from "express";
import { UserModel } from "../models/userModel";
import * as argon2 from "argon2";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { firstName, lastName, userName, email, password } = req.body;
        const verifyUser: UserModel | null = await UserModel.findOne({ where: { email: email } });
        if (verifyUser) {
            return res.status(409).send({ message: "User already exists" });
        }
        const hashedPassword = await argon2.hash(password);
        const user: UserModel = await UserModel.create({ firstName, lastName, userName, email, password: hashedPassword });
        return res.status(201).send({ message: "User created successfully", user });
    } catch (error) {
        next(error);
    }
}

export const login = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { email, password } = req.body;
        const user: UserModel | null = await UserModel.findOne({ where: { email: email } });
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        const verifyPassword = await argon2.verify(user.password, password);
        if (!verifyPassword) {
            return res.status(401).send({ message: "Invalid credentials" });
        }
        return res.status(200).send({ message: "Login successful", user });
    } catch (error) {

    }
}