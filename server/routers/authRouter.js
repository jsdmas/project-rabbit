import express from "express";
import { isNotLoggedIn } from "../middlewares";
import { login, loginStatus } from "../controllers/userController";
import passport from "passport";

const authRouter = express.Router();

// 로그인
authRouter.post("/login", isNotLoggedIn, login);
// 로그인 여부 확인
authRouter.get("/check-login-status", loginStatus);
// naver
authRouter.get("/naver", isNotLoggedIn, passport.authenticate('naver'));
authRouter.get("/naver/callback", isNotLoggedIn, passport.authenticate('naver', { successRedirect: "http://localhost:3000", failureRedirect: "http://localhost:3000" }));
// kakao
authRouter.get("/kakao", isNotLoggedIn, passport.authenticate('kakao'));
authRouter.get('/kakao/callback', isNotLoggedIn, passport.authenticate('kakao', { successRedirect: "http://localhost:3000", failureRedirect: "http://localhost:3000" }));

export default authRouter;