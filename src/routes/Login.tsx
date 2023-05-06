import styled from "styled-components";
import Header from "../components/Header";
import BackPageIcon from "../components/BackPageIcon";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { login } from "../api/userApi";
import { ILogin } from "../types/register";
import Spinner from "../components/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faComment, faN, faSignsPost } from "@fortawesome/free-solid-svg-icons";
import { memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { isAxiosError } from "axios";
import { IErrorTypes } from "../types/error";
import useLoginInfo from "../hooks/useLoginInfo";
import Meta from "../Meta";
import { media } from "../styles/mediaQuery";

const Wrapper = styled.section`
    margin : 7vh auto;
    display: grid;
    gap: 30px;
    max-width: 600px;
`;

const Head = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    margin: auto;
    width: 50%;
    span{
        font-size: 2em;
        color: ${props => props.theme.buttonColor};
        position: absolute;
        left: 10%;
        @media ${media.tablet} {
            left: 20%;
        }
        @media ${media.desktop} {
            left: 30%;
        }
    }
    h1{
        font-size: 1.4em;
        color: ${props => props.theme.buttonColor};
        font-family: 'Noto Sans KR', sans-serif;
    }

`;

const Form = styled.form`
    display: grid;
    grid-template-columns: 1fr;
    height: 200px;
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
    width: 60%;
    margin-top: 20px;
    @media ${media.tablet} {
        width: 50%;
    }
    background-color: rgb(10,226,97);
    min-height: 50px;
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
    svg{
        font-size: 1.5em;
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
        margin-bottom: 2px;
    }
`;

const Login = () => {
    const navigate = useNavigate();
    const [userInfoLoading, { loginState }] = useLoginInfo();
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
    const { register, handleSubmit, formState: { errors } } = useForm<ILogin>();
    const onVaild = ({ email, password }: ILogin) => {
        mutate({ email, password });
    }
    // 로그인 여부
    useEffect(() => { if (!userInfoLoading && loginState) navigate("/") }, [userInfoLoading, loginState, navigate]);
    return (
        <>
            <Meta title="Login | Rabbit" description="Rabbit 로그인 페이지 입니다." />
            {userInfoLoading ? <Spinner isLoading={userInfoLoading} /> : (
                <>
                    <Header />
                    <Wrapper>
                        <Head>
                            <BackPageIcon />
                            <h1><FontAwesomeIcon icon={faSignsPost} />&nbsp;로그인</h1>
                        </Head>
                        <Form onSubmit={handleSubmit(onVaild)}>
                            <Input type="email" placeholder='email' {...register("email", { required: "⚠️ email를 입력해주세요." })} />
                            <span>{errors?.email?.message}</span>
                            <Input type="password" placeholder='password' {...register("password", { required: "⚠️ password를 입력해주세요." })} />
                            <span>{errors?.password?.message}</span>
                            {isLoading ? <Spinner isLoading={isLoading} /> : <Button><FontAwesomeIcon icon={faCheck} />&nbsp;login</Button>}
                        </Form>
                        <NaverOAuthLogin onClick={() => window.location.href = "https://sdmas-rabbit.fly.dev/api/auth/naver"}><FontAwesomeIcon icon={faN} />&nbsp;네이버 로그인</NaverOAuthLogin>
                        <KakaoOAuthLogin onClick={() => window.location.href = "https://sdmas-rabbit.fly.dev/api/auth/kakao"}><FontAwesomeIcon icon={faComment} /> 카카오 로그인</KakaoOAuthLogin>
                    </Wrapper>
                </>
            )}
        </>
    );
};

export default memo(Login);