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
exports.removeFriend = exports.getFriends = exports.addFriend = void 0;
const sessionService_1 = require("../services/sessionService");
const userModel_1 = require("../models/userModel");
const friendModel_1 = require("../models/friendModel");
const addFriend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { friendId } = req.params;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token)
            return res.status(401).send({ message: "Unauthorized" });
        const email = (0, sessionService_1.verifyUserToken)(token);
        const user = yield userModel_1.UserModel.findOne({
            where: {
                email: email
            }
        });
        if (!user)
            return res.status(404).send({ message: "User not found" });
        const friend = yield friendModel_1.FriendModel.findOne({
            where: {
                userId: user.id,
                friendId: friendId
            }
        });
        if (friend)
            return res.status(400).send({ message: "Friend already added" });
        const newFriend = yield friendModel_1.FriendModel.create({
            userId: user.id,
            friendId: friendId
        });
        if (!newFriend)
            return res.status(500).send({ message: "Internal server error" });
        return res.status(201).send({ message: "Friend added successfully", newFriend });
    }
    catch (error) {
        return next(error);
    }
});
exports.addFriend = addFriend;
const getFriends = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const token = (_b = req.headers.authorization) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        if (!token)
            return res.status(401).send({ message: "Unauthorized" });
        const email = (0, sessionService_1.verifyUserToken)(token);
        const user = yield userModel_1.UserModel.findOne({
            where: {
                email: email
            }
        });
        if (!user)
            return res.status(404).send({ message: "User not found" });
        const friends = yield friendModel_1.FriendModel.findAll({
            where: {
                userId: user.id
            }
        });
        return res.status(200).send({ message: "User friends", friends });
    }
    catch (error) {
        return next(error);
    }
});
exports.getFriends = getFriends;
const removeFriend = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { friendId } = req.params;
        const token = (_c = req.headers.authorization) === null || _c === void 0 ? void 0 : _c.split(' ')[1];
        if (!token)
            return res.status(401).send({ message: "Unauthorized" });
        const email = (0, sessionService_1.verifyUserToken)(token);
        const user = yield userModel_1.UserModel.findOne({
            where: {
                email: email
            }
        });
        if (!user)
            return res.status(404).send({ message: "User not found" });
        const friend = yield friendModel_1.FriendModel.findOne({
            where: {
                userId: user.id,
                friendId: friendId
            }
        });
        if (!friend)
            return res.status(404).send({ message: "Friend not found" });
        yield friend.destroy();
        return res.status(200).send({ message: "Friend removed successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.removeFriend = removeFriend;
