import { io } from "../index";
import { GroupMessageModel } from "../models/groupMessages";
import { Socket } from "socket.io";
import { NextFunction, Request, Response } from "express";

export const getMessagesForRoom = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const { groupId } = req.body
        const messages = await GroupMessageModel.findAll({
            where: {
                groupId: groupId
            },
            order: [
                ['createdAt', 'ASC']
            ]
        });

        return res.status(200).send({ messages: messages });
    } catch (error) {
        next(error);
    }
}

export const SendGroupMessage = (socket: Socket) => {
    try {
        socket.on("group message", async ({ senderId, groupId, message }) => {
            io.to(groupId).emit("group message", message);

            const groupMessage: GroupMessageModel = await GroupMessageModel.create({
                senderId: senderId,
                groupId: groupId,
                message: message
            });
        })

        socket.on("disconnect", () => {
            console.log(`Socket ${socket.id} has disconnected`);
            // You can add any additional cleanup logic here
        });

    } catch (error) {

    }
}