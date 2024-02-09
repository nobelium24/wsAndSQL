import { Request, Response, NextFunction } from "express";
import { verifyUserToken } from "../services/sessionService";
import { UserModel } from "../models/userModel";
import { FriendModel } from "../models/friendModel";

export const addFriend = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {friendId} = req.params;
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) return res.status(401).send({message: "Unauthorized"});

        const email = verifyUserToken(token);
        const user: UserModel | null  = await UserModel.findOne({
            where: {
                email: email
            }
        });
        if(!user) return res.status(404).send({message: "User not found"});

        const friend: FriendModel | null = await FriendModel.findOne({
            where: {
                userId: user.id,
                friendId: friendId
            }
        });

        if(friend) return res.status(400).send({message: "Friend already added"});

        const newFriend = await FriendModel.create({
            userId: user.id,
            friendId: friendId
        });

        if(!newFriend) return res.status(500).send({message: "Internal server error"});
        return res.status(201).send({message: "Friend added successfully", newFriend});
    } catch (error) {
        return next(error)
    }
}

export const getFriends = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) return res.status(401).send({message: "Unauthorized"});

        const email = verifyUserToken(token);
        const user: UserModel | null = await UserModel.findOne({
            where: {
                email: email
            }
        });
        if(!user) return res.status(404).send({message: "User not found"});

        const friends: FriendModel[] = await FriendModel.findAll({
            where: {
                userId: user.id
            }
        });

        return res.status(200).send({message: "User friends", friends});
    } catch (error) {
        return next(error);
    }
}

export const removeFriend = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const {friendId} = req.params;
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) return res.status(401).send({message: "Unauthorized"});

        const email = verifyUserToken(token);
        const user: UserModel | null = await UserModel.findOne({
            where: {
                email: email
            }
        });
        if(!user) return res.status(404).send({message: "User not found"});

        const friend: FriendModel | null = await FriendModel.findOne({
            where: {
                userId: user.id,
                friendId: friendId
            }
        });
        if(!friend) return res.status(404).send({message: "Friend not found"});

        await friend.destroy();
        return res.status(200).send({message: "Friend removed successfully"});
    } catch (error) {
        next(error)
    }
}