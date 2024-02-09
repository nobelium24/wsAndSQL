import express from 'express';
import { createPost, deletePost, getFriendPost, getSinglePost, getUserPost, updatePost } from '../controllers/postController';

const postRouter = express.Router();

postRouter.get("/getfriendpost", getFriendPost);
postRouter.post("/createpost", createPost);
postRouter.get("/getuserpost", getUserPost);
postRouter.get("/getsinglepost/:postId", getSinglePost);
postRouter.post("/updatepost", updatePost);
postRouter.delete("/deletepost/:postId", deletePost);

export { postRouter }
