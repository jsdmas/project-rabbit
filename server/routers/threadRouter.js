import express from "express";
import { watch } from "../controllers/threadController";

const threadRouter = express.Router();

threadRouter.get("/:threadid", watch);
threadRouter.get("/:threadid/edit");

export default threadRouter;