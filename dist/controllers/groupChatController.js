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
exports.SendGroupMessage = exports.getMessagesForRoom = void 0;
const index_1 = require("../index");
const groupMessages_1 = require("../models/groupMessages");
const getMessagesForRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { groupId } = req.body;
        const messages = yield groupMessages_1.GroupMessageModel.findAll({
            where: {
                groupId: groupId
            },
            order: [
                ['createdAt', 'ASC']
            ]
        });
        return res.status(200).send({ messages: messages });
    }
    catch (error) {
        next(error);
    }
});
exports.getMessagesForRoom = getMessagesForRoom;
const SendGroupMessage = (socket) => {
    try {
        socket.on("group message", ({ senderId, groupId, message }) => __awaiter(void 0, void 0, void 0, function* () {
            index_1.io.to(groupId).emit("group message", message);
            const groupMessage = yield groupMessages_1.GroupMessageModel.create({
                senderId: senderId,
                groupId: groupId,
                message: message
            });
        }));
        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} has disconnected`);
            // You can add any additional cleanup logic here
        });
    }
    catch (error) {
    }
};
exports.SendGroupMessage = SendGroupMessage;
