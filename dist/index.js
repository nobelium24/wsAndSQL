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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./database/database");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const server = app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('listening on port 3000');
    try {
        const sequelize = yield (0, database_1.database)();
        console.log('Database connected', sequelize);
    }
    catch (error) {
        console.log(error);
    }
}));
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*'
    }
});
io.on("connection", socket => {
    console.log(`User with id ${socket.id} connected`);
    socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
        console.log(`User with id ${socket.id} disconnected`);
    });
});
//for private chat
io.on("connection", socket => {
    socket.on("private message", ({ user1, user2, message }) => {
        const roomId = createRoomId(user1.id, user2.id);
        socket.join(roomId);
        io.to(roomId).emit("private message", { user1, user2, message });
    });
    socket.on("disconnect", () => {
        console.log(`User with id ${socket.id} disconnected`);
    });
});
function createRoomId(user1Id, user2Id) {
    return [user1Id, user2Id].sort().join('-');
}
