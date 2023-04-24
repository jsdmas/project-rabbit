import { useEffect } from "react";
import Header from "../components/Header";
import useLoginInfo from "../hooks/useLoginInfo";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import BackPageIcon from "../components/BackPageIcon";
import { IPassword } from "../types/user";
import RegexHelper from "../helper/RegexHelper";
import { useMutation } from "@tanstack/react-query";
import { ChangeOfPassword } from "../api/userApi";
import useError from "../hooks/useError";
import { isAxiosError } from "axios";
import { IErrorTypes } from "../types/error";
import Swal from "sweetalert2";
import Meta from "../Meta";

const Grid = styled.section`
    margin-top:  10vh;
    height: 60vh;
`;

const TopNav = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%;
    h2{
        color: ${props => props.theme.buttonColor};
        font-size: 24px;
    }
    span{
        position: absolute;
        left: 10%;
        font-size: 1.8em;
    }
`;

const Form = styled.form`
    padding-top: 5vh;
    margin: auto;
    height: 50%;
    width: 60%;
    display: grid;
    grid-template-rows: 1fr 0.5fr 1fr 0.5fr 1fr 0.5fr 0.7fr;
    button{
        width: 82%;
        place-self: center center;
        border: none;
        border-radius: 5px;
        color: #fff;
        background-color: ${props => props.theme.buttonColor};
        cursor: pointer;
        height: 100%;
        &:hover{
            background-color: ${props => props.theme.accentColor};
        }
    }
    span{
        color: ${props => props.theme.textColor};
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8em;
    }
`;

const PasswordInput = styled.input`
    height: 60%;
    place-self: center center;
    width: 80%;
    border:1px solid ${props => props.theme.buttonColor};
    border-radius: 5px;
`;

const ChangePassword = () => {
    const navigate = useNavigate();
    const { onError } = useError();
    const [isLoading, { loginState, loginUserId, loginUserSnsId }] = useLoginInfo();
    // 로그인 판별 - sns 로 접속한 사람은 비밀번호가 존재하지 않으므로 접근제한.
    useEffect(() => {
        if ((!loginState && !isLoading) || loginUserSnsId) {
            navigate("/")
        };
    }, [isLoading, loginState, navigate, loginUserSnsId]);

    const { mutate } = useMutation(ChangeOfPassword, {
        onSuccess: () => navigate(-1),
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                const { response: { data } } = error;
                const { rtcode, rtmsg }: IErrorTypes = data;
                rtcode === 401 ? Swal.fire({
                    icon: "error",
                    title: rtmsg
                }) : onError(error);
            }
        }
    });

    const { register, handleSubmit, formState: { errors } } = useForm<IPassword>();
    const onVaild = (data: IPassword) => {
        const { changePW, currentPW } = data;
        mutate({ changePW, currentPW, loginUserId });
    };
    return (
        <>
            <Meta title="change-password | Rabbit" description="비밀번호 변경 페이지" />
            <Header />
            <Grid>
                <TopNav>
                    <BackPageIcon />
                    <h2>비밀번호 변경</h2>
                </TopNav>
                <Form onSubmit={handleSubmit(onVaild)}>
                    <PasswordInput type="password" placeholder="기존 비밀번호" {...register("currentPW", {
                        required: "password를 입력해주세요.",
                        maxLength: {
                            value: 255,
                            message: "최대 255자까지 가능합니다."
                        },
                        validate: {
                            RegexValue: (value) => RegexHelper.value(value) ? true : "양식을 올바르게 적어주세요",
                            RegexCompare: (passwordConfirm = "", formValues) => RegexHelper.compareTo(passwordConfirm, formValues.changePW) ? "이전 비밀번호와 같습니다." : true,
                        }
                    })} />
                    <span>{errors?.currentPW?.message}</span>
                    <PasswordInput type="password" placeholder="변경할 비밀번호" {...register("changePW", {
                        required: "변경할 password를 입력해주세요.",
                        maxLength: {
                            value: 255,
                            message: "최대 255자까지 가능합니다."
                        },
                        validate: {
                            RegexValue: (value) => RegexHelper.value(value) ? true : "양식을 올바르게 적어주세요",
                        }
                    })} />
                    <span>{errors?.changePW?.message}</span>
                    <PasswordInput type="password" placeholder="변경할 비밀번호 확인" {...register("changePWCompare", {
                        required: "변경할 password를 확인해주세요.",
                        validate: {
                            RegexCompare: (passwordConfirm = "", formValues) => RegexHelper.compareTo(passwordConfirm, formValues.changePW) ? true : "비밀번호를 확인해주세요",
                        }
                    })} />
                    <span>{errors?.changePWCompare?.message}</span>
                    <button>수정</button>
                </Form>
            </Grid>
        </>
    );
};

export default ChangePassword;