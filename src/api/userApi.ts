import axios from "axios";
import { ILogin, IPostJoin, IUserState } from "../types/register";
import { IPasswordChange } from "../types/user";

export const postJoin = async (data: IPostJoin) => {
    let response = null;
    try {
        const { data: responseData } = await axios.post("/api/join", { data });
        response = responseData;
    } catch (error) {
        throw error
    }
    return response;
};

export const login = async ({ email, password }: ILogin) => {
    let response = null;
    try {
        const { data: responseData } = await axios.post("/api/auth/login", { email, password });
        response = responseData;
    } catch (error) {
        throw error;
    }
    return response;
};

export const loginStatus = async () => {
    let response: IUserState = { loginState: false };
    try {
        const { data: { loginState, loginUserId, loginUserSnsId } } = await axios.get("/api/auth/check-login-status", { withCredentials: true });
        response = { loginState, loginUserId, loginUserSnsId };
    } catch (error) {
        throw error;
    }
    return response;
};

export const getUserProfile = async (userid?: string) => {
    let response = null;
    try {
        const { data } = await axios.get(`/api/profile/${userid}`, { withCredentials: true });
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
};

export const editDescription = async (userDescription: string, userid?: string) => {
    let response = null;
    try {
        const { data: responseData } = await axios.patch(`/api/profile/${userid}`, { userDescription }, { withCredentials: true });
        response = responseData;
    } catch (error) {
        throw error;
    }
    return response;
};

export const logout = async () => {
    try {
        await axios.post("/api/logout", {}, { withCredentials: true });
    } catch (error) {
        throw error;
    }
};

export const ChangeOfPassword = async ({ currentPW, changePW, loginUserId }: IPasswordChange) => {
    let response = null;
    try {
        const { data } = await axios.patch(`/api/change-password`, { currentPW, changePW, loginUserId }, { withCredentials: true });
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
}

export const deleteUser = async ({ loginUserId }: { loginUserId?: number }) => {
    let response = null;
    try {
        const { data } = await axios.delete(`/api/profile/${loginUserId}`, { withCredentials: true });
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
}

export const uploadUserProfile = async ({ userImageFile, loginUserId }: { userImageFile: File, loginUserId?: number }) => {
    let response = null;
    try {
        const { data } = await axios.patch(`/api/change-photo`, { userImageFile, loginUserId }, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } });
        response = data;
    } catch (error) {
        throw error;
    }
    return response;
};
