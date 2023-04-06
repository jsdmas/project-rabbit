import express from "express";
import { threadLike, threadPostComment, watch } from "../controllers/threadController";

const threadRouter = express.Router();

threadRouter.get("/:threadid", watch);
threadRouter.patch("/:threadid/like", threadLike);
threadRouter.post("/:threadid/comment", threadPostComment);
threadRouter.get("/:threadid/edit");

export default threadRouter;