import axios from "axios";
import { OrderBy, OrderCommends, SearchOption } from "../atoms";
import { IpostCommentData, IpostData } from "../types/thread";

export const fetchThreadList = async (offset = 0, orderCommend: OrderCommends, orderby: OrderBy, searchKeyword: string | null = "", keywordoption?: SearchOption) => {
    let response = null;
    try {
        const { data } = await axios.get("/api/threads", { params: { offset, orderCommend, orderby, searchKeyword, keywordoption } });
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
};

export const fetchThread = async (threadid: string) => {
    let response = null;
    try {
        const { data } = await axios.get(`/api/thread/${threadid}`, { withCredentials: true });
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
};

export const fetchMainTextThread = async (threadid: string) => {
    let response = null;
    try {
        const { data } = await axios.get(`/api/thread/${threadid}/mainText`, { withCredentials: true });
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
};

export const createThread = async ({ userId, postTitle, postContent, postImg }: IpostData) => {
    let response = null;
    let threadImg = null;
    if (postImg) {
        threadImg = postImg[0];
    }
    try {
        const { data } = await axios.post("/api/write", { userId, postTitle, postContent, threadImg }, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } });
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
};

export const updateThread = async ({ userId, postTitle, postContent, postImg }: IpostData, threadid: string) => {
    let response = null;
    let threadImg = null;
    if (postImg) {
        threadImg = postImg[0];
    }
    try {
        const { data } = await axios.patch(`/api/thread/${threadid}`, { userId, postTitle, postContent, threadImg, threadid }, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } });
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
};

export const deleteThread = async (userId: number, threadid: string) => {
    let response = null;
    try {
        const { data } = await axios.delete(`/api/thread/${threadid}`, { data: { threadid, userId }, withCredentials: true });
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
};

export const patchThreadLike = async (threadid: string) => {
    let response = null;
    try {
        const { data } = await axios.patch(`/api/thread/${threadid}/like`);
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
};

export const postComment = async (commentContent: IpostCommentData, threadid: string, commentParentNum?: number) => {
    let responseData = null;
    try {
        const { data } = await axios.post(`/api/thread/${threadid}/comment`, { data: { commentContent, commentParentNum } }, { withCredentials: true })
        responseData = data;
    } catch (error) {
        throw error;
    }
    return responseData;
};

export const editComment = async (commentValue: IpostCommentData, commentId: number) => {
    let responseData = null;
    try {
        const response = await axios.patch(`/api/thread/comment`, { data: { commentValue, commentId } }, { withCredentials: true })
        responseData = response.data;
    } catch (error) {
        throw error;
    }
    return responseData;
};

export const deleteComment = async (commentId: number, commentUserId: number) => {
    let responseData = null;
    try {
        const { data } = await axios.delete(`/api/thread/comment`, { data: { commentId, commentUserId }, withCredentials: true });
        responseData = data;
    } catch (error) {
        throw error;
    }
    return responseData;
};

export const commentIncrementLike = async (commentId: number) => {
    let responseData = null;
    try {
        const { data } = await axios.patch(`/api/thread/comment-like`, { commentId });
        responseData = data;
    } catch (error) {
        throw error;
    }
    return responseData;
};