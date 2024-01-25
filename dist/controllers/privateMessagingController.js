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
exports.getMessagesForRoom = exports.SendMessage = void 0;
const index_1 = require("../index");
const codeGenerator_1 = require("../utilities/codeGenerator");
const privateMessageModel_1 = require("../models/privateMessageModel");
const SendMessage = (socket) => {
    try {
        socket.on("private message", ({ senderId, receiverId, message }) => __awaiter(void 0, void 0, void 0, function* () {
            const roomId = (0, codeGenerator_1.createRoomId)(senderId, receiverId);
            socket.join(roomId);
            index_1.io.to(roomId).emit("private message", message);
            const privateMessage = yield privateMessageModel_1.PrivateMessageModel.create({
                senderId: senderId,
                receiverId: receiverId,
                message: message,
                roomId: roomId
            });
        }));
        socket.on("typing", ({ senderId, roomId }) => {
            socket.to(roomId).emit("typing", senderId);
        });
        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} has disconnected`);
            // You can add any additional cleanup logic here
        });
    }
    catch (error) {
    }
};
exports.SendMessage = SendMessage;
const getMessagesForRoom = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { roomId } = req.body;
        const messages = yield privateMessageModel_1.PrivateMessageModel.findAll({
            where: {
                roomId: roomId
            },
            order: [
                ['createdAt', 'ASC']
            ]
        });
        return messages;
    }
    catch (error) {
    }
});
exports.getMessagesForRoom = getMessagesForRoom;
