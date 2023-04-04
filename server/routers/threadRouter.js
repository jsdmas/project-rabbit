import express from "express";
import { watch } from "../controllers/threadController";

const threadRouter = express.Router();

threadRouter.get("/:threadid", watch);

export default threadRouter;