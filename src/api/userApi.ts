import axios from "axios";
import { IPostJoin } from "../types/register";

export const postJoin = async (data: IPostJoin) => {
    let response = null;
    try {
        const { data: responseData } = await axios.post("/join", { data });
        response = responseData;
    } catch (error) {
        throw error
    }
    return response;
};