import axios from "axios";
import { OrderBy, OrderCommends } from "./atoms";
import { HandleErrorHelper } from "./helper/HandleErrorHelper";
import { IpostData } from "./types/thread";

export const fetchThreads = async (offset = 0, orderCommend: OrderCommends, orderby: OrderBy) => {
    let response = null;
    try {
        const { data } = await axios.get("/thread", { params: { offset, orderCommend, orderby } });
        response = data;
    } catch (error) {
        HandleErrorHelper(error);
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
        console.log(response);
    } catch (error) {
        HandleErrorHelper(error);
    }
    return response;
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


