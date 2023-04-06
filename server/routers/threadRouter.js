import express from "express";
import { threadLike, watch } from "../controllers/threadController";

const threadRouter = express.Router();

threadRouter.get("/:threadid", watch);
threadRouter.patch("/:threadid/like", threadLike);
threadRouter.get("/:threadid/edit");

export default threadRouter;