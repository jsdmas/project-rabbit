import axios from "axios";
import { ILogin, IPostJoin, IUserState } from "../types/register";

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
        const { data: responseData } = await axios.post("/auth/login", { email, password });
        response = responseData;
    } catch (error) {
        throw error;
    }
    return response;
};

export const loginStatus = async () => {
    let response: IUserState = { loginState: false };
    try {
        const { data: { loginState, loginUserId } } = await axios.get("/auth/check-login-status", { withCredentials: true });
        response = { loginState, loginUserId };
    } catch (error) {
        throw error;
    }
    return response;
};

export const getUserProfile = async (userid?: string) => {
    let response = null;
    try {
        const { data } = await axios.get(`/profile/${userid}`, { withCredentials: true });
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
};

export const editDescription = async (userDescription: string, userid?: string) => {
    let response = null;
    try {
        const { data: responseData } = await axios.patch(`/profile/${userid}`, { userDescription }, { withCredentials: true });
        response = responseData;
    } catch (error) {
        throw error;
    }
    return response;
};
