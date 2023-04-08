import axios from "axios";
import { OrderBy, OrderCommends } from "./atoms";
import { HandleErrorHelper } from "./helper/HandleErrorHelper";
import { IpostCommentData, IpostData } from "./types/thread";

export const fetchThreads = async (offset = 0, orderCommend: OrderCommends, orderby: OrderBy) => {
    let response = null;
    try {
        const { data } = await axios.get("/thread", { params: { offset, orderCommend, orderby } });
        response = data;
    } catch (error) {
        HandleErrorHelper(error, "info");
    }
    return response;
};

export const fetchThread = async (threadid: string) => {
    let response = null;
    try {
        const { data } = await axios.get(`/thread/${threadid}`);
        response = data;
    } catch (error) {
        HandleErrorHelper(error);
    }
    return response;
};

export const postThread = async (postData: IpostData) => {
    let response = null;
    try {
        const { data } = await axios.post("/write", postData);
        response = data;
    } catch (error) {
        HandleErrorHelper(error);
    }
    return response;
};

export const deleteThread = async (threadid: string) => {
    try {
        await axios.delete(`/thread/${threadid}`, { data: { threadid } });
    } catch (error) {
        HandleErrorHelper(error);
    }
};

export const patchThreadLike = async (threadid: string) => {
    let response = null;
    try {
        const { data } = await axios.patch(`/thread/${threadid}/like`);
        response = data;
    } catch (error) {
        HandleErrorHelper(error);
    }
    return response;
};

export const postComment = async (commentContent: IpostCommentData, threadid: string, commentParentNum?: number) => {
    let responseData = null;
    try {
        const { data } = await axios.post(`/thread/${threadid}/comment`, { data: { commentContent, commentParentNum } })
        responseData = data;
    } catch (error) {
        HandleErrorHelper(error);
    }
    return responseData;
};

export const editComment = async (commentContent: IpostCommentData, commentId: number) => {
    let responseData = null;
    try {
        const response = await axios.patch(`/thread/comment`, { data: { commentContent, commentId } })
        responseData = response.data;
    } catch (error) {
        HandleErrorHelper(error);
    }
    return responseData;
};

export const deleteComment = async (commentId: number) => {
    let responseData = null;
    try {
        const { data } = await axios.delete(`/thread/comment`, { data: { commentId } });
        responseData = data;
    } catch (error) {
        HandleErrorHelper(error);
    }
    return responseData;
};

export const commentIncrementLike = async (commentId: number) => {
    let responseData = null;
    try {
        const { data } = await axios.patch(`/thread/comment-like`, { commentId });
        responseData = data;
    } catch (error) {
        HandleErrorHelper(error);
    }
    return responseData;
};


