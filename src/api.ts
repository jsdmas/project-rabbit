import axios from "axios";
import { OrderBy, OrderCommends } from "./atoms";
import { IpostData } from "./types/thread";

// home
export const fetchThreads = async (offset = 0, orderCommend: OrderCommends, orderby: OrderBy) => {
    let response = null;
    try {
        const { data } = await axios.get("/thread", { params: { offset, orderCommend, orderby } });
        response = data;
    } catch (error) {
        console.log(error);
        return;
    }
    return response;
};

// 단일
export const fetchThread = async (threadid: string) => {
    let response = null;
    try {
        const { data } = await axios.get(`/thread/${threadid}`);
        response = data;
    } catch (error) {
        console.log(error);
        return;
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
        console.error(error);
        return;
    }
    return response;
};
