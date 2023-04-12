import express from "express";
import { getThreadList, createThread } from "../controllers/threadController";
import { createAcount, login } from "../controllers/userController";

const rootRouter = express.Router();
// home
rootRouter.get("/threads", getThreadList);
// 글쓰기
rootRouter.post("/write", createThread);
rootRouter.post("/join", createAcount);
rootRouter.post("/login", login);


export default rootRouter;