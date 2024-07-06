import express from "express";
import { verifyToken } from "../middleware/verifyToken";
import { addPost, deletePost, getPost, getPosts, updatePost } from "../controllers/post.controller";

const router = express.Router();

router.get("/", getPosts);
router.get(":/id", getPost);
router.post("/", verifyToken, addPost);
router.post("/:id", verifyToken, updatePost);
router.delete("/:id", verifyToken, deletePost);

export default router;
