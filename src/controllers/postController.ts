import { NextFunction, Request, Response } from "express";
import { verifyUserToken } from "../services/sessionService";
import { UserModel } from "../models/userModel";
import { PostModel } from "../models/postModel";
import { Op } from "sequelize";
import { FriendModel } from "../models/friendModel";


export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { title, content } = req.body;
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) return res.status(401).send({ message: "Unauthorized" });

        const user = verifyUserToken(token);

        const verifyUser: UserModel | null = await UserModel.findOne({
            where: {
                email: user
            }
        });
        if (!verifyUser) return res.status(404).send({ message: "User not found" });

        const createPost = await PostModel.create({ title, content, userId: verifyUser.id });

        return res.status(201).send({ message: "Post created successfully", createPost });
    } catch (error) {
        next(error);
    }
}

export const getUserPost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) return res.status(401).send({ message: "Unauthorized" });

        const user = verifyUserToken(token);

        const verifyUser: UserModel | null = await UserModel.findOne({
            where: {
                email: user
            }
        });
        if (!verifyUser) return res.status(404).send({ message: "User not found" });

        const userPost = await PostModel.findAll({
            where: {
                userId: verifyUser.id
            }
        });

        return res.status(200).send({ message: "User posts", userPost });
    } catch (error) {
        next(error);
    }
}

export const getSinglePost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { postId } = req.params;
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) return res.status(401).send({ message: "Unauthorized" });

        const user = verifyUserToken(token);

        const verifyUser: UserModel | null = await UserModel.findOne({
            where: {
                email: user
            }
        });
        if (!verifyUser) return res.status(404).send({ message: "User not found" });

        const singlePost = await PostModel.findOne({
            where: {
                id: postId
            }
        });

        return res.status(200).send({ message: "Single post", singlePost });
    } catch (error) {
        next(error);
    }
}

export const updatePost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { postId, title, content } = req.body;
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) return res.status(401).send({ message: "Unauthorized" });

        const user = verifyUserToken(token);

        const verifyUser: UserModel | null = await UserModel.findOne({
            where: {
                email: user
            }
        });
        if (!verifyUser) return res.status(404).send({ message: "User not found" });

        const updatePost = await PostModel.update({ title, content }, {
            where: {
                [Op.and]: [{ id: postId }, { userId: verifyUser.id }]
            }
        });

        if (updatePost[0] === 0) {
            return res.status(404).send({ error: "Post not found" });
        }

        return res.status(200).send({ message: "Post updated successfully" });

    } catch (error) {
        next(error);
    }
}

export const deletePost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { postId } = req.params;
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) return res.status(401).send({ message: "Unauthorized" });

        const user = verifyUserToken(token);

        const verifyUser: UserModel | null = await UserModel.findOne({
            where: {
                email: user
            }
        });
        if (!verifyUser) return res.status(404).send({ message: "User not found" });

        const deletePost = await PostModel.destroy({
            where: {
                [Op.and]: [{ id: postId }, { userId: verifyUser.id }]
            }
        });

        if (deletePost === 0) {
            return res.status(404).send({ error: "Post not found" });
        }

        return res.status(200).send({ message: "Post deleted successfully" });

    } catch (error) {
        next(error);
    }
}

export const getFriendPost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) return res.status(401).send({ message: "Unauthorized" });

        const user = verifyUserToken(token);

        const verifyUser: UserModel | null = await UserModel.findOne({
            where: {
                email: user
            }
        });
        if (!verifyUser) return res.status(404).send({ message: "User not found" });

        const friends: FriendModel[] = await FriendModel.findAll({
            where: {
                userId: verifyUser.id
            }
        });

        const friendIds = friends.map(friend => friend.friendId);

        const friendPosts = await PostModel.findAll({
            where: {
                userId: friendIds
            }
        });

        if(friendPosts.length === 0) return res.status(200).send({message: "No friend posts"});

        return res.status(200).send({ message: "Friend posts", friendPosts });
    } catch (error) {
        next(error);
    }
}