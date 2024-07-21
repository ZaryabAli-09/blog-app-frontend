import express from "express";
import { verifyUser } from "../middlewares/verifyUser.js";
import {
  create,
  getPosts,
  deletePost,
  editPost,
  getPostsLength,
} from "../controllers/posts.controller.js";
import { upload } from "../config/multer.config.js";
const router = express.Router();

router.post("/create", verifyUser, upload.single("file"), create);
router.get("/getposts-length", verifyUser, getPostsLength);
router.get("/getposts", getPosts);
router.delete("/deletepost/:postId/:userId", verifyUser, deletePost);
router.put("/editpost/:postId/:userId", verifyUser, editPost);

export default router;
