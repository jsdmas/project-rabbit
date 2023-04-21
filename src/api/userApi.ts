import axios from "axios";
import { ILogin, IPostJoin, IUserState } from "../types/register";
import { IPasswordChange } from "../types/user";

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
        const { data: { loginState, loginUserId, loginUserSnsId } } = await axios.get("/auth/check-login-status", { withCredentials: true });
        response = { loginState, loginUserId, loginUserSnsId };
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

export const logout = async () => {
    try {
        await axios.post("/logout", {}, { withCredentials: true });
    } catch (error) {
        throw error;
    }
};

export const ChangeOfPassword = async ({ currentPW, changePW, loginUserId }: IPasswordChange) => {
    let response = null;
    try {
        const { data } = await axios.patch(`/change-password`, { currentPW, changePW, loginUserId }, { withCredentials: true });
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
}

export const deleteUser = async ({ loginUserId }: { loginUserId?: number }) => {
    let response = null;
    try {
        const { data } = await axios.delete(`/profile/${loginUserId}`, { withCredentials: true });
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
}

export const uploadUserProfile = async ({ file, loginUserId }: { file: File, loginUserId?: number }) => {
    let response = null;
    try {
        const { data } = await axios.patch(`/change-photo`, { file, loginUserId }, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } });
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
};
