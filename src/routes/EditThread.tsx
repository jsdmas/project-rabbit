import styled from 'styled-components';
import RegexHelper from '../helper/RegexHelper';
import BackPageIcon from '../components/BackPageIcon';
import Header from '../components/Header';
import { useForm } from "react-hook-form"
import { updateThread } from '../api/threadApi';
import { useNavigate, useParams } from 'react-router-dom';
import { IpostData, IResponse, TTreadId } from '../types/thread';
import Swal from 'sweetalert2';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchMainTextThread } from "../api/threadApi";
import Spinner from '../components/Spinner';
import useError from '../hooks/useError';
import useLoginInfo from '../hooks/useLoginInfo';
import { useEffect } from 'react';

const Wrapper = styled.div`
    margin-top: 8vh;
    color: ${props => props.theme.textColor};
    padding:0px 1em;
    height: 50vh;
`;

const Head = styled.header`
    place-self: center center;
    display: flex;
    justify-content: space-between;
    span{
        font-size: 1.2em;
        color: ${props => props.theme.buttonColor};
    }
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    height: 100%;
    color:${props => props.theme.textColor};
`;

const TitleInput = styled.input`
    width:100%;
    height: 10%;
    background-color: ${props => props.theme.postColor};
    border:1px solid ${props => props.theme.accentColor};
    border-radius: 5px;
    color:${props => props.theme.textColor};
`;

const ContentTextArea = styled.textarea`
    height:50%;
    width: 100%;
    resize: none;
    background-color: ${props => props.theme.postColor};
    border:1px solid ${props => props.theme.accentColor};
    border-radius: 5px;
    color:${props => props.theme.textColor};
`;

const SubmitButton = styled.button`
    width: 100%;
    color: #fff;
    background-color: ${props => props.theme.buttonColor};
    border: none;
    border-radius: 5px;
    height: 10%;
    cursor: pointer;
`;

const ErrorMessage = styled.span`
    color: ${props => props.theme.accentColor};
    height: 3%;
    font-size: 1em;
`;

const ImgDiv = styled.div`
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
`;

const ImgInput = styled.input`
    display: none;

`;
const UserIdInput = styled.input`
    display: none;
`;
const Label = styled.label`
    background-color: ${props => props.theme.buttonColor};
    border-radius: 5px;
    color: #fff;
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
`;
const SelectImgInfo = styled.div`
    white-space: nowrap;
    padding-left: 5%;
    display: flex;
    align-items: center;
    width: 70%;
`;


const EditThread = () => {
    const [userloading, { loginUserId }] = useLoginInfo();
    const navigate = useNavigate();
    const { threadid } = useParams() as TTreadId;
    const { register, handleSubmit, formState: { errors }, watch } = useForm<IpostData>();
    const { onError } = useError();
    const { data: response, isLoading } = useQuery<IResponse>(["thread", threadid], () => fetchMainTextThread(threadid), { onError, retry: 3, retryDelay: 600 });
    const { mutate: editThread } = useMutation((postData: IpostData) => updateThread(postData, threadid), { onError: (error) => onError(error) });
    const [threadItem] = response?.data ?? [];
    const { postTitle, postContent, userId } = threadItem ?? {};
    const onVaild = async (postData: IpostData) => {
        Swal.fire({
            title: "게시글을 정말 수정 하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                editThread(postData);
                navigate(-1);
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
            .then((result) => result.isConfirmed ? Swal.fire({ title: "수정 성공!", icon: "success" }) : null)
    };
    // 글 작성자가 아닐경우 home으로 이동, 익명의 작성자 게시글 이라면 수정가능
    useEffect(() => {
        if (userId != null) {
            if (!userloading && (loginUserId != userId)) {
                navigate("/");
            }
        }
    }, [userloading, loginUserId, userId, navigate]);
    return (
        <>
            <Header />
            {isLoading ? <Spinner isLoading={isLoading} /> : (
                <Wrapper>
                    <Head>
                        <BackPageIcon />
                        <span>EditThread</span>
                    </Head>
                    <Form onSubmit={handleSubmit(onVaild)}>
                        <UserIdInput {...register("userId")} defaultValue={userId} />
                        <TitleInput {...register("postTitle", {
                            required: "제목은 반드시 적어야 합니다.",
                            maxLength: {
                                value: 50,
                                message: "제목은 최대 50글자입니다."
                            },
                            minLength: {
                                value: 1,
                                message: "최소 1글자 이상적어야 합니다."
                            },
                            validate: {
                                RegexValue: (title) => RegexHelper.value(title) ? true : "제목을 올바르게 적어주세요",
                            }
                        })} placeholder='Title...' defaultValue={postTitle} />
                        <ErrorMessage>{errors?.postTitle?.message}</ErrorMessage>
                        <ImgDiv>
                            <Label htmlFor='threadImg'>이미지 편집</Label>
                            <SelectImgInfo>선택된 이미지 : {watch("postImg")?.[0]?.name} </SelectImgInfo>
                            <ImgInput id='threadImg' type="file" {...register("postImg")} accept="image/*" />
                        </ImgDiv>
                        <ContentTextArea {...register("postContent", {
                            required: "본문은 반드시 적어야 합니다.",
                            maxLength: {
                                value: 1000000,
                                message: "본문은 최대 1000000글자입니다."
                            },
                            minLength: {
                                value: 1,
                                message: "최소 1글자 이상적어야 합니다."
                            },
                            validate: {
                                RegexValue: (content) => RegexHelper.value(content) ? true : "본문을 올바르게 적어주세요",
                            }
                        })} placeholder='Content...' defaultValue={postContent} />
                        <ErrorMessage>{errors?.postContent?.message}</ErrorMessage>
                        <SubmitButton type="submit">완료</SubmitButton>
                    </Form>
                </Wrapper>
            )}
        </>
    );
};

export default EditThread;