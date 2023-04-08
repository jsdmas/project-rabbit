import express from "express";
import { threadLike, threadPostComment, watch, threadDeleteComment, threadPatchComment, commentLike, threadDelete } from "../controllers/threadController";

const threadRouter = express.Router();

threadRouter.route("/:threadid").get(watch).delete(threadDelete);
threadRouter.patch("/:threadid/like", threadLike);
threadRouter.post("/:threadid/comment", threadPostComment);
threadRouter.route("/comment").delete(threadDeleteComment).patch(threadPatchComment);
threadRouter.patch("/comment-like", commentLike);
threadRouter.get("/:threadid/edit");

export default threadRouter;