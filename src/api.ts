import axios from "axios";
import { OrderBy, OrderCommends } from "./atoms";

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
        console.log(data);
        response = data;
    } catch (error) {
        console.log(error);
        return;
    }
    return response;
};