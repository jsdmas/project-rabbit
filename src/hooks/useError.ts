import { useNavigate } from "react-router-dom";
import { isAxiosError } from "axios";
import Swal, { SweetAlertIcon } from "sweetalert2";
import { IErrorTypes } from "../types/error";

/**
 * @description 데이터를 불러올때 실패를 관리해줍니다.
 * @returns {Array} onError 를 반환합니다.
 */
export default function useError() {
    const navigate = useNavigate();
    const HandleErrorHelper = (error: unknown, icon: SweetAlertIcon = "error") => {
        if (isAxiosError(error) && error.response) {
            const { response: { data } } = error;
            const { rt, rtcode, rtmsg }: IErrorTypes = data;
            Swal.fire({ icon, title: rtmsg, text: `${rt} | ${rtcode}` });
        } else {
            alert("형식을 알수없는 오류입니다.");
        }
    }

    const onError = (error: unknown) => {
        navigate("/");
        HandleErrorHelper(error);
    };
    return { onError };
};