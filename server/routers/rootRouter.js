import express from "express";
import { getThreadList, createThread } from "../controllers/threadController";

const rootRouter = express.Router();
// home
rootRouter.get("/threads", getThreadList);
// 글쓰기
rootRouter.post("/write", createThread);

export default rootRouter;