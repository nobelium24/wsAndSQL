"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unlikePost = exports.likePost = exports.getFriendPost = exports.deletePost = exports.updatePost = exports.getSinglePost = exports.getUserPost = exports.createPost = void 0;
const postModel_1 = require("../models/postModel");
const sequelize_1 = require("sequelize");
const friendModel_1 = require("../models/friendModel");
const likesModel_1 = require("../models/likesModel");
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content } = req.body;
        const verifyUser = req.user;
        const createPost = yield postModel_1.PostModel.create({ title, content, userId: verifyUser.id });
        return res.status(201).send({ message: "Post created successfully", createPost });
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
const getUserPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifyUser = req.user;
        const userPost = yield postModel_1.PostModel.findAll({
            where: {
                userId: verifyUser.id
            }
        });
        return res.status(200).send({ message: "User posts", userPost });
    }
    catch (error) {
        next(error);
    }
});
exports.getUserPost = getUserPost;
const getSinglePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const verifyUser = req.user;
        const singlePost = yield postModel_1.PostModel.findOne({
            where: {
                id: postId
            }
        });
        return res.status(200).send({ message: "Single post", singlePost });
    }
    catch (error) {
        next(error);
    }
});
exports.getSinglePost = getSinglePost;
const updatePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId, title, content } = req.body;
        const verifyUser = req.user;
        const updatePost = yield postModel_1.PostModel.update({ title, content }, {
            where: {
                [sequelize_1.Op.and]: [{ id: postId }, { userId: verifyUser.id }]
            }
        });
        if (updatePost[0] === 0) {
            return res.status(404).send({ error: "Post not found" });
        }
        return res.status(200).send({ message: "Post updated successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.updatePost = updatePost;
const deletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const verifyUser = req.user;
        const deletePost = yield postModel_1.PostModel.destroy({
            where: {
                [sequelize_1.Op.and]: [{ id: postId }, { userId: verifyUser.id }]
            }
        });
        if (deletePost === 0) {
            return res.status(404).send({ error: "Post not found" });
        }
        return res.status(200).send({ message: "Post deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deletePost = deletePost;
const getFriendPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifyUser = req.user;
        const friends = yield friendModel_1.FriendModel.findAll({
            where: {
                userId: verifyUser.id
            }
        });
        const friendIds = friends.map(friend => friend.friendId);
        const friendPosts = yield postModel_1.PostModel.findAll({
            where: {
                userId: friendIds
            }
        });
        if (friendPosts.length === 0)
            return res.status(200).send({ message: "No friend posts" });
        return res.status(200).send({ message: "Friend posts", friendPosts });
    }
    catch (error) {
        next(error);
    }
});
exports.getFriendPost = getFriendPost;
const likePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const user = req.user;
        const post = yield postModel_1.PostModel.findOne({
            where: {
                id: postId
            }
        });
        if (!post)
            return res.status(404).send({ message: "Post not found" });
        yield post.update({ likes: post.likes + 1 });
        yield likesModel_1.LikesModel.create({
            userId: user.id,
            postId: post.id
        });
        return res.status(200).send({ likes: post.likes });
    }
    catch (error) {
        next(error);
    }
});
exports.likePost = likePost;
const unlikePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { postId } = req.params;
        const user = req.user;
        const post = yield postModel_1.PostModel.findOne({
            where: {
                id: postId
            }
        });
        if (!post)
            return res.status(404).send({ message: "Post not found" });
        yield post.update({ likes: post.likes - 1 });
        yield likesModel_1.LikesModel.destroy({
            where: {
                [sequelize_1.Op.and]: [{ userId: user.id }, { postId: post.id }]
            }
        });
        return res.status(200).send({ likes: post.likes });
    }
    catch (error) {
        next(error);
    }
});
exports.unlikePost = unlikePost;
