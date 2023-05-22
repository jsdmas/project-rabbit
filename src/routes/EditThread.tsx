import styled from 'styled-components';
import RegexHelper from '../helper/RegexHelper';
import BackPageIcon from '../components/BackPageIcon';
import Header from '../components/Header';
import { useForm } from "react-hook-form"
import { updateThread } from '../api/threadApi';
import { useNavigate, useParams } from 'react-router-dom';
import { IpostData, IResponse, TTreadId } from '../types/thread';
import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchMainTextThread } from "../api/threadApi";
import Spinner from '../components/Spinner';
import useError from '../hooks/useError';
import useLoginInfo from '../hooks/useLoginInfo';
import { useEffect } from 'react';
import Meta from '../Meta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faImage, faPencil } from '@fortawesome/free-solid-svg-icons';
import { ContentTextArea, ErrorMessage, Form, Head, ImgDiv, ImgInput, Label, SelectImgInfo, SubmitButton, TitleInput, Wrapper } from '../styles/writeBase';

const UserIdInput = styled.input`
    display: none;
`;

const EditThread = () => {
    const queryClient = useQueryClient();
    const [userloading, { loginUserId }] = useLoginInfo();
    const navigate = useNavigate();
    const { threadid } = useParams() as TTreadId;
    const { register, handleSubmit, formState: { errors }, watch } = useForm<IpostData>();
    const { errorMessage } = useError();
    const { data: response, isLoading } = useQuery<IResponse>(["thread", threadid], () => fetchMainTextThread(threadid), { onError: (error) => errorMessage(error), staleTime: 1000 * 30 });
    const { mutate: editThread, isLoading: editRequest } = useMutation((postData: IpostData) => updateThread(postData, threadid),
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["thread", threadid]);
                Swal.fire({ title: "수정 성공!", icon: "success" })
                navigate(-1);
            }
            , onError: (error) => errorMessage(error),

        });
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
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
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
            <Meta title={`${postTitle} Edit | Rabbit`} description={postContent} />
            <Header />
            {isLoading || editRequest ? <Spinner isLoading={isLoading} /> : (
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
                            <Label htmlFor='threadImg'><FontAwesomeIcon icon={faPencil} />&nbsp;이미지 편집</Label>
                            <SelectImgInfo><FontAwesomeIcon icon={faImage} />&nbsp;선택된 이미지 : {watch("postImg")?.[0]?.name} </SelectImgInfo>
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
                        <SubmitButton type="submit"><FontAwesomeIcon icon={faCheck} /> 완료</SubmitButton>
                    </Form>
                </Wrapper>
            )}
        </>
    );
};

export default EditThread;