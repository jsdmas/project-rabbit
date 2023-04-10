import express from "express";
import { getThreadList, createThread, searchThread } from "../controllers/threadController";

const rootRouter = express.Router();

rootRouter.get("/threads", getThreadList);
rootRouter.get("/search", searchThread);
rootRouter.post("/write", createThread);

export default rootRouter;