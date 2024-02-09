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
exports.getFriendPost = exports.deletePost = exports.updatePost = exports.getSinglePost = exports.getUserPost = exports.createPost = void 0;
const sessionService_1 = require("../services/sessionService");
const userModel_1 = require("../models/userModel");
const postModel_1 = require("../models/postModel");
const sequelize_1 = require("sequelize");
const friendModel_1 = require("../models/friendModel");
const createPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { title, content } = req.body;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return res.status(401).send({ message: "Unauthorized" });
        const user = (0, sessionService_1.verifyUserToken)(token);
        const verifyUser = yield userModel_1.UserModel.findOne({
            where: {
                email: user
            }
        });
        if (!verifyUser)
            return res.status(404).send({ message: "User not found" });
        const createPost = yield postModel_1.PostModel.create({ title, content, userId: verifyUser.id });
        return res.status(201).send({ message: "Post created successfully", createPost });
    }
    catch (error) {
        next(error);
    }
});
exports.createPost = createPost;
const getUserPost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token)
            return res.status(401).send({ message: "Unauthorized" });
        const user = (0, sessionService_1.verifyUserToken)(token);
        const verifyUser = yield userModel_1.UserModel.findOne({
            where: {
                email: user
            }
        });
        if (!verifyUser)
            return res.status(404).send({ message: "User not found" });
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
    var _c;
    try {
        const { postId } = req.params;
        const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1];
        if (!token)
            return res.status(401).send({ message: "Unauthorized" });
        const user = (0, sessionService_1.verifyUserToken)(token);
        const verifyUser = yield userModel_1.UserModel.findOne({
            where: {
                email: user
            }
        });
        if (!verifyUser)
            return res.status(404).send({ message: "User not found" });
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
    var _d;
    try {
        const { postId, title, content } = req.body;
        const token = (_d = req.headers.authorization) === null || _d === void 0 ? void 0 : _d.split(' ')[1];
        if (!token)
            return res.status(401).send({ message: "Unauthorized" });
        const user = (0, sessionService_1.verifyUserToken)(token);
        const verifyUser = yield userModel_1.UserModel.findOne({
            where: {
                email: user
            }
        });
        if (!verifyUser)
            return res.status(404).send({ message: "User not found" });
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
    var _e;
    try {
        const { postId } = req.params;
        const token = (_e = req.headers.authorization) === null || _e === void 0 ? void 0 : _e.split(' ')[1];
        if (!token)
            return res.status(401).send({ message: "Unauthorized" });
        const user = (0, sessionService_1.verifyUserToken)(token);
        const verifyUser = yield userModel_1.UserModel.findOne({
            where: {
                email: user
            }
        });
        if (!verifyUser)
            return res.status(404).send({ message: "User not found" });
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
    var _f;
    try {
        const token = (_f = req.headers.authorization) === null || _f === void 0 ? void 0 : _f.split(' ')[1];
        if (!token)
            return res.status(401).send({ message: "Unauthorized" });
        const user = (0, sessionService_1.verifyUserToken)(token);
        const verifyUser = yield userModel_1.UserModel.findOne({
            where: {
                email: user
            }
        });
        if (!verifyUser)
            return res.status(404).send({ message: "User not found" });
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
