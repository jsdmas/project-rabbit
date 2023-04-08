import express from "express";
import { threadLike, threadPostComment, watch, threadDeleteComment, threadPatchComment, commentLike } from "../controllers/threadController";

const threadRouter = express.Router();

threadRouter.get("/:threadid", watch);
threadRouter.patch("/:threadid/like", threadLike);
threadRouter.post("/:threadid/comment", threadPostComment);
threadRouter.route("/comment").delete(threadDeleteComment).patch(threadPatchComment);
threadRouter.patch("/comment-like", commentLike);
threadRouter.get("/:threadid/edit");

export default threadRouter;