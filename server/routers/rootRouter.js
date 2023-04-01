import express from "express";
import { home } from "../controllers/postController";

const rootRouter = express.Router();

rootRouter.get("/getpost", home);

export default rootRouter;