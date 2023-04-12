import { useNavigate } from "react-router-dom";
import { HandleErrorHelper } from "../helper/ErrorHelper";

/**
 * @description 데이터를 불러올때 실패를 관리해줍니다.
 * @returns {Array} onError 를 반환합니다.
 */
export default function useError() {
    const navigate = useNavigate();
    const onError = (error: unknown) => {
        navigate("/");
        HandleErrorHelper(error);
    };
    return { onError };
};