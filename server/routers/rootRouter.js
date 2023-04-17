import express from "express";
import { getThreadList, createThread } from "../controllers/threadController";
import { createAcount, login, logout } from "../controllers/userController";
import { isLoggedIn, isNotLoggedIn } from "../middlewares";
import passport from "passport";

const rootRouter = express.Router();
// home
rootRouter.get("/threads", getThreadList);
// 글쓰기
rootRouter.post("/write", createThread);
// 가입
rootRouter.post("/join", isNotLoggedIn, createAcount);
// 로그인
rootRouter.post("/login", isNotLoggedIn, login);
// naver
rootRouter.get("/auth/naver", isNotLoggedIn, passport.authenticate('naver'));
rootRouter.get("/auth/naver/callback", isNotLoggedIn, passport.authenticate('naver', { successRedirect: "http://localhost:3000" }));

// 로그아웃
rootRouter.post("/logout", isLoggedIn, logout);


export default rootRouter;