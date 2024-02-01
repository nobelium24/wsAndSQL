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
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const database_1 = require("./database/database");
const socket_io_1 = require("socket.io");
const privateMessagingController_1 = require("./controllers/privateMessagingController");
const errorHandler_1 = require("./middlewares/errorHandler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const server = app.listen(3000, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('listening on port 3000');
    try {
        const sequelize = yield (0, database_1.database)();
        console.log('Database connected');
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
exports.io = io;
io.on("connection", socket => {
    console.log(`User with id ${socket.id} connected`);
    (0, privateMessagingController_1.SendMessage)(socket);
    socket.on("chat message", msg => {
        console.log(msg);
        io.emit("chat message", msg);
    });
    socket.on("disconnect", () => {
        console.log(`User with id ${socket.id} disconnected`);
    });
});
app.use((req, res, next) => {
    res.status(404).send({ message: "Not found" });
    next();
});
app.use(errorHandler_1.errorHandler);
