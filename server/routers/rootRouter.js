import express from "express";
import { home } from "../controllers/threadController";

const rootRouter = express.Router();

rootRouter.get("/thread", home);

export default rootRouter;