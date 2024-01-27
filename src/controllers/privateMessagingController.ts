import { io } from "../index";
import { createRoomId } from "../utilities/codeGenerator";
import { PrivateMessageModel } from "../models/privateMessageModel";
import { Socket } from "socket.io";
import { NextFunction, Request, Response } from "express";

export const SendMessage =  (socket:Socket) => {
    try {
        socket.on("private message", async({senderId, receiverId, message}) => {
            const roomId = createRoomId(senderId, receiverId);
            socket.join(roomId);
            io.to(roomId).emit("private message", message);
        
            const privateMessage: PrivateMessageModel = await PrivateMessageModel.create({
                senderId: senderId,
                receiverId: receiverId,
                message: message,
                roomId: roomId
            });
        })

        socket.on("typing", ({senderId, roomId}) => {
            socket.to(roomId).emit("typing", senderId);
        });

        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} has disconnected`);
            // You can add any additional cleanup logic here
        });

        
    } catch (error) {
        
    }
}


export const getMessagesForRoom = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {roomId} = req.body
        const messages = await PrivateMessageModel.findAll({
            where: {
                roomId: roomId
            },
            order: [
                ['createdAt', 'ASC']
            ]
        });

        return res.status(200).send({messages: messages});
    } catch (error) {

    }
}