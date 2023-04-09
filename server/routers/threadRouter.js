import express from "express";
import { likethread, createComment, watchThread, threadDeleteComment, updateComment, likecomment, threadDelete, editThread, getThreadMainText } from "../controllers/threadController";

const threadRouter = express.Router();

// thread 조회, 수정, 삭제
threadRouter.route("/:threadid(\\d+)").get(watchThread).patch(editThread).delete(threadDelete);
// thread 좋아요
threadRouter.patch("/:threadid(\\d+)/like", likethread);
// thread 내용 (댓글 제외)
threadRouter.get("/:threadid(\\d+)/mainText", getThreadMainText);

// 댓글 수정, 삭제
threadRouter.route("/comment").patch(updateComment).delete(threadDeleteComment);
// 댓글 좋아요
threadRouter.patch("/comment-like", likecomment);
// 댓글 생성
threadRouter.post("/:threadid(\\d+)/comment", createComment);

export default threadRouter;