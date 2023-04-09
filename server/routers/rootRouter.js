import express from "express";
import { getThreadList, createThread } from "../controllers/threadController";

const rootRouter = express.Router();

rootRouter.get("/threads", getThreadList);
rootRouter.post("/write", createThread);

export default rootRouter;