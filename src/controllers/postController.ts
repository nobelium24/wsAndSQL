import { NextFunction, Request, Response } from "express";
import { verifyUserToken } from "../services/sessionService";
import { UserModel } from "../models/userModel";
import { PostModel } from "../models/postModel";
import { Op } from "sequelize";
import { FriendModel } from "../models/friendModel";
import { LikesModel } from "../models/likesModel";


export const createPost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { title, content } = req.body;
        const verifyUser = req.user as UserModel;

        const createPost = await PostModel.create({ title, content, userId: verifyUser.id });

        return res.status(201).send({ message: "Post created successfully", createPost });
    } catch (error) {
        next(error);
    }
}

export const getUserPost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const verifyUser = req.user as UserModel;

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

        const verifyUser = req.user as UserModel;

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

        const verifyUser = req.user as UserModel;

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

        const verifyUser = req.user as UserModel;

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

        const verifyUser = req.user as UserModel;

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

        if (friendPosts.length === 0) return res.status(200).send({ message: "No friend posts" });

        return res.status(200).send({ message: "Friend posts", friendPosts });
    } catch (error) {
        next(error);
    }
}

export const likePost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { postId } = req.params;

        const user = req.user as UserModel;

        const post: PostModel | null = await PostModel.findOne({
            where: {
                id: postId
            }
        })

        if (!post) return res.status(404).send({ message: "Post not found" })
        await post.update({ likes: post.likes + 1 })

        await LikesModel.create({
            userId: user.id,
            postId: post.id
        })
        return res.status(200).send({ likes: post.likes })
    } catch (error) {
        next(error)
    }
}

export const unlikePost = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { postId } = req.params;

        const user = req.user as UserModel;

        const post: PostModel | null = await PostModel.findOne({
            where: {
                id: postId
            }
        })

        if (!post) return res.status(404).send({ message: "Post not found" })
        await post.update({ likes: post.likes - 1 })

        await LikesModel.destroy({
            where: {
                [Op.and]: [{ userId: user.id }, { postId: post.id }]
            }
        })
        return res.status(200).send({ likes: post.likes })
    } catch (error) {
        next(error)
    }
}