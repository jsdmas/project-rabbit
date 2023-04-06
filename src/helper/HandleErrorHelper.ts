import { isAxiosError } from 'axios';
import Swal from 'sweetalert2';
import { IErrorTypes } from '../types/error';

export const HandleErrorHelper = (error: unknown) => {
    if (isAxiosError(error) && error.response) {
        const { response: { data } } = error;
        const { rt, rtcode, rtmsg }: IErrorTypes = data;
        Swal.fire({ icon: "info", title: rtmsg, text: `${rt} | ${rtcode}` });
    } else {
        alert("형식을 알수없는 오류입니다.");
    }
    return
}
