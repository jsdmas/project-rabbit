import { useEffect, useState } from "react";
import { loginStatus } from "../api/userApi";
import { IUser, IUserState } from "../types/register";

/**
 * @description loggedInState의 atom 값을 백엔드에서 갱신합니다.
 * @returns {Array} 로그인 데이터 로딩 여부(Boolean), 유저 로그인 데이터(Object) 반환
 */
export default function useLoginInfo(): IUser {
    const [isLoading, setIsLoading] = useState(true);
    const [userState, setUserState] = useState<IUserState>({ loginState: false, loginUserId: undefined, loginUserSnsId: undefined });
    useEffect(() => {
        loginStatus().then(result => {
            setUserState(result);
            setIsLoading(false);
        });
    }, []);
    return [isLoading, userState];
};