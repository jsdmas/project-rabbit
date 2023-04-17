import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import styled from 'styled-components';
import BackPageIcon from '../components/BackPageIcon';
import { IPostJoin } from '../types/register';
import RegexHelper from '../helper/RegexHelper';
import { postJoin } from '../api/userApi';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { IErrorTypes } from '../types/error';
import useError from '../hooks/useError';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Wrapper = styled.div`
    margin : 7vh auto;
    display: grid;
    gap: 30px;
`;

const Head = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10vh;
    margin: auto;
    width: 50%;
    span{
        font-size: 1.2em;
        color: ${props => props.theme.buttonColor};
        position: absolute;
        left: 10%;
    }
    h1{
        font-size: 1.4em;
        color: ${props => props.theme.buttonColor};
    }

`;

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    height: 50vh;
    row-gap: 3vh;
    span{
        place-self: center center;
        color: ${props => props.theme.textColor};
    }
`;

const Input = styled.input`
    place-self: center center;
    width: 80%;
    padding: 10px 5px;
    border-radius: 5px;
    border: 1px solid ${props => props.theme.accentColor};
    
    &::placeholder{
        color:${props => props.theme.buttonColor};
        padding-left: 8px;
    }
`;

const Button = styled.button`
    cursor: pointer;
    place-self: center center;
    width: 80%;
    border: none;
    border-radius: 5px;
    padding: 10px 5px;
    width: 30%;
    background-color: ${props => props.theme.buttonColor};
    color: #fff;
    transition: 0.2s ease-in-out;
    &:hover{
        background-color: ${props => props.theme.accentColor};
    }
`;


const Join = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<IPostJoin>();
    const [errorMessage, setErrorMessage] = useState("");
    const { onError } = useError();
    const { mutate, isLoading } = useMutation(postJoin, {
        onSuccess: () => {
            navigate("/login")
            Swal.fire({
                title: "가입 성공!",
                text: "로그인 해주세요!",
                icon: "success",
            })
        },
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                const { response: { data } } = error;
                const { rtcode, rtmsg }: IErrorTypes = data;
                rtcode === 409 ? setErrorMessage(rtmsg) : onError(error);
            }
        },
        retry: 3, retryDelay: 600
    });
    const onVaild = (data: IPostJoin) => {
        const { confirm, ...restData } = data;
        mutate(restData);
    };
    return (
        <>
            <Header />
            <Wrapper>
                <Head>
                    <BackPageIcon />
                    <h1>회원가입</h1>
                </Head>
                <Form onSubmit={handleSubmit(onVaild)}>
                    <Input type="email" placeholder='email' {...register("email", {
                        required: "email은 필수입니다.",
                        maxLength: {
                            value: 50,
                            message: "최대 50자까지 가능합니다."
                        },
                        validate: {
                            RegexValue: (value) => RegexHelper.value(value) ? true : "양식을 올바르게 적어주세요.",
                            RegexEmail: (value) => RegexHelper.email(value) ? true : "이메일 형식을 올바르게 적어주세요.",
                        }
                    })} />
                    <span>{errors?.email?.message}</span>
                    {errorMessage ? <span>{errorMessage}</span> : null}
                    <Input type="password" placeholder='password' {...register("password", {
                        required: "password를 입력해주세요.",
                        maxLength: {
                            value: 255,
                            message: "최대 255자까지 가능합니다."
                        },
                        validate: {
                            RegexValue: (value) => RegexHelper.value(value) ? true : "양식을 올바르게 적어주세요",

                        }
                    })} />
                    <span>{errors?.password?.message}</span>
                    <Input type="password" placeholder='비밀번호 확인' {...register("confirm", {
                        required: "password를 입력해주세요.",
                        validate: {
                            RegexCompare: (passwordConfirm = "", formValues) => RegexHelper.compareTo(passwordConfirm, formValues.password) ? true : "비밀번호를 확인해주세요",
                        }
                    })} />
                    <span>{errors?.confirm?.message}</span>
                    <Input placeholder='nickname' {...register("nickname", {
                        required: "nickname은 필수입니다.",
                        maxLength: {
                            value: 20,
                            message: "최대 20자까지 가능합니다."
                        },
                        validate: {
                            RegexValue: (value) => RegexHelper.value(value) ? true : "양식을 올바르게 적어주세요",
                        }
                    })} />
                    <span>{errors?.nickname?.message}</span>
                    {isLoading ? <Spinner isLoading={isLoading} /> : <Button>완료</Button>}
                </Form>
            </Wrapper>
        </>
    );
};

export default Join;