import express from "express";
import { getThreadList, createThread } from "../controllers/threadController";
import { createAcount, deleteUser, getUserProfile, logout, patchDescription } from "../controllers/userController";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";

const rootRouter = express.Router();
// home
rootRouter.get("/threads", getThreadList);
// 글쓰기
rootRouter.post("/write", createThread);
// 가입
rootRouter.post("/join", isNotLoggedIn, createAcount);
// 로그아웃
rootRouter.post("/logout", isLoggedIn, logout);
// user-profile
rootRouter.route("/profile/:loginUserId(\\d+)").get(getUserProfile).patch(patchDescription).delete(deleteUser);

export default rootRouter;