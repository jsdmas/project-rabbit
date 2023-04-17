import styled from "styled-components";
import Header from "../components/Header";
import BackPageIcon from "../components/BackPageIcon";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/userApi";
import { ILogin } from "../types/register";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isAxiosError } from "axios";
import { IErrorTypes } from "../types/error";

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
    height: 30vh;
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

const NaverOAuthLogin = styled.div`
    margin: auto;
    width: 80%;
    background-color: rgb(10,226,97);
    height: 7vh;
    border-radius: 5px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    &:hover{
        background-color: rgb(16, 174, 79);
    }
    span{
        font-size: 30px;
        font-weight: bold;
        padding-right: 15px;
    }
`;

const KakaoOAuthLogin = styled(NaverOAuthLogin)`
    background-color: rgb(236,215,3);
    color: rgb(57,28,28);
    &:hover{
        background-color: rgb(204, 188, 21);
    }
    svg{
        font-size: 24px;
        font-weight: bold;
        padding-right: 15px;
        margin-bottom: 2px;
    }
`;

const Login = () => {
    const navigate = useNavigate();
    const { isLoading, mutate } = useMutation(login, {
        onSuccess: () => navigate("/"),
        onError: (error) => {
            if (isAxiosError(error) && error.response) {
                const { response: { data } } = error;
                const { rt, rtcode, rtmsg }: IErrorTypes = data;
                Swal.fire({ icon: "error", title: rtmsg, text: `${rt} | ${rtcode}` });
            }
        }
    }
    );
    const { register, handleSubmit } = useForm<ILogin>();
    const onVaild = ({ email, password }: ILogin) => {
        mutate({ email, password });
    }
    return (
        <>
            <Header />
            <Wrapper>
                <Head>
                    <BackPageIcon />
                    <h1>로그인</h1>
                </Head>
                <Form onSubmit={handleSubmit(onVaild)}>
                    <Input type="email" placeholder='email' {...register("email")} />
                    <Input type="password" placeholder='password' {...register("password")} />
                    {isLoading ? <Spinner isLoading={isLoading} /> : <Button>완료</Button>}
                </Form>
                <NaverOAuthLogin onClick={() => window.location.href = "http://localhost:8000/auth/naver"}><span>N</span>네이버 로그인</NaverOAuthLogin>
                <KakaoOAuthLogin><FontAwesomeIcon icon={faComment} /> 카카오 로그인</KakaoOAuthLogin>
            </Wrapper>
        </>
    );
};

export default memo(Login);