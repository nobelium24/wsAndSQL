import express from 'express';
import { database } from './database/database';
import { Server, Socket } from 'socket.io';
import { SendMessage } from './controllers/privateMessagingController';
import { errorHandler } from './middlewares/errorHandler';
import { SendGroupMessage } from './controllers/groupChatController';
import cors from 'cors';
import { router } from './routes/userRoute';
import { postRouter } from './routes/postRouter';

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", router)
app.use("/posts", postRouter)

const server = app.listen(3000, async () => {
    console.log('listening on port 3000');
    try {
        const sequelize = await database();
        console.log('Database connected');
    } catch (error) {
        console.log(error);
    }
});

const io = new Server(server, {
    cors: {
        origin: '*'
    }
});

io.on("connection", socket => {
    console.log(`User with id ${socket.id} connected`);

    SendMessage(socket);
    SendGroupMessage(socket);

    socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg);
    })

    socket.on("disconnect", () => {
        console.log(`User with id ${socket.id} disconnected`);
    })
})

app.use((req, res, next) => {
    res.status(404).send({ message: "Route not found" });
    next();
})

app.use(errorHandler)


export {io}