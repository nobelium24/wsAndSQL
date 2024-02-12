"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRouter = void 0;
const express_1 = __importDefault(require("express"));
const postController_1 = require("../controllers/postController");
const auth_1 = require("../middlewares/auth");
const postRouter = express_1.default.Router();
exports.postRouter = postRouter;
postRouter.get("/getfriendpost", auth_1.authenticateUser, postController_1.getFriendPost);
postRouter.post("/createpost", auth_1.authenticateUser, postController_1.createPost);
postRouter.get("/getuserpost", auth_1.authenticateUser, postController_1.getUserPost);
postRouter.get("/getsinglepost/:postId", auth_1.authenticateUser, postController_1.getSinglePost);
postRouter.post("/updatepost", auth_1.authenticateUser, postController_1.updatePost);
postRouter.delete("/deletepost/:postId", auth_1.authenticateUser, postController_1.deletePost);
postRouter.get("/likepost/:postId", auth_1.authenticateUser, postController_1.likePost);
postRouter.get("/unlikepost/:postId", auth_1.authenticateUser, postController_1.unlikePost);
