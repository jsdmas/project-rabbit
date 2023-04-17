import axios from "axios";
import { ILogin, IPostJoin } from "../types/register";

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

export const login = async ({ email, password }: ILogin) => {
    let response = null;
    try {
        const { data: responseData } = await axios.post("/login", { email, password });
        response = responseData;
    } catch (error) {
        throw error;
    }
    return response;
};
