"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const postRouter = express_1.default.Router();
exports.postRouter = postRouter;
postRouter.get("/getfriendpost", postController_1.getFriendPost);
postRouter.post("/createpost", postController_1.createPost);
postRouter.get("/getuserpost", postController_1.getUserPost);
postRouter.get("/getsinglepost/:postId", postController_1.getSinglePost);
postRouter.post("/updatepost", postController_1.updatePost);
postRouter.delete("/deletepost/:postId", postController_1.deletePost);
