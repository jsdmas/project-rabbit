import express from "express";
import { home, postWrite } from "../controllers/threadController";

const rootRouter = express.Router();

rootRouter.get("/thread", home);
rootRouter.post("/write", postWrite);

export default rootRouter;