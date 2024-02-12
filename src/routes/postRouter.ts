import express from 'express';
import {
    createPost, deletePost, getFriendPost,
    getSinglePost, getUserPost, likePost,
    unlikePost,
    updatePost
} from '../controllers/postController';
import { authenticateUser } from '../middlewares/auth';

const postRouter = express.Router();

postRouter.get("/getfriendpost", authenticateUser, getFriendPost);
postRouter.post("/createpost", authenticateUser, createPost);
postRouter.get("/getuserpost", authenticateUser, getUserPost);
postRouter.get("/getsinglepost/:postId", authenticateUser, getSinglePost);
postRouter.post("/updatepost", authenticateUser, updatePost);
postRouter.delete("/deletepost/:postId", authenticateUser, deletePost);
postRouter.get("/likepost/:postId", authenticateUser, likePost);
postRouter.get("/unlikepost/:postId", authenticateUser, unlikePost);

export { postRouter }
