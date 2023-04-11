import { memo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import styled from "styled-components";
import { IcommentData, IResponse, TTreadId } from "../types/thread";
import { faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchThread, patchThreadLike, deleteThread } from "../api/threadApi";
import BackPageIcon from "../components/BackPageIcon";
import Comment from "../components/Comment";
import Header from "../components/Header";
import CommentForm from "../components/CommentForm";
import Spinner from "../components/Spinner";
import { HandleErrorHelper } from "../helper/HandleErrorHelper";
import { error } from "console";


const Wrapper = styled.div`
    margin-top: 8vh;
    color: ${props => props.theme.textColor};
    padding:0px 1em;
`;

const Head = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.2fr 3fr;
    div:last-child{
        opacity: 0.5;
        font-size: 0.7em;
        place-self: center end;
    }
    div:nth-child(2){
        font-size: 0.8em;
        place-self: center end;
    }
`;

const Col = styled.div`
    place-self: center center;
`;

const Main = styled.main`
    background-color: ${props => props.theme.postColor};
    min-height: 350px;
    margin-top: 10px;
    border-radius: 5px;
    padding: 10px 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const TitleSection = styled.div`
    display: flex;
    justify-content: space-between;
    margin:10px 0px 30px 0px;
    padding-bottom: 10px;
    border-bottom: 1px solid ${props => props.theme.accentColor};
    div:first-child{
        font-size: 1.5em;
        padding-right: 5px;
    }
    div:last-child{
        font-size: 0.8em;
        opacity: 0.5;
        white-space:nowrap;
    };
`;

const LoveBox = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    color: ${props => props.theme.buttonColor};
    div{
        padding: 15px;
        background-color: ${props => props.theme.bgColor};
        border: 1px solid ${props => props.theme.buttonColor};
        border-radius: 5px;
        white-space: nowrap;
        cursor: pointer;
    }
`;

const CommentWrapper = styled.div`
    margin-top: 10px;
    padding: 0px 10px;
    width: 100%;
`;

const CommentSection = styled.div`
    border-top: 1px solid ${props => props.theme.postColor};
`;

const Thread = () => {
    const { threadid } = useParams() as TTreadId;
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data: response, isLoading } = useQuery<IResponse>(["thread", threadid], () => fetchThread(threadid),
        {
            onError: (error) => {
                navigate("/");
                HandleErrorHelper(error);
            }, retry: 3, retryDelay: 600
        });

    const [threadItem] = response?.data ?? [];
    const { postContent, postCreated, postLike, postTitle, postWriteUser, postWriteUserImgUrl, postModified } = threadItem ?? {};
    const onSuccess = () => queryClient.invalidateQueries(["thread", threadid]);
    const { mutate: threadlike } = useMutation(patchThreadLike, { onSuccess });
    const { mutate: deleteMutate } = useMutation(deleteThread, { onSuccess });
    const likeIncrement = () => {
        const now = new Date();
        const incrementTime = new Date(localStorage.getItem("threadIncrementTime") || 0);
        if (!incrementTime || now.getTime() - incrementTime.getTime() > 1000 * 30) {
            threadlike(threadid);
            localStorage.setItem("threadIncrementTime", now.toString());
        } else {
            Swal.fire({
                icon: "warning",
                text: "게시글 좋아요는 30초마다 누를 수 있습니다.",
            });
        }
    };

    const handleThreadDelete = () => {
        Swal.fire({
            title: "게시글을 정말 삭제 하시겠습니까?",
            text: "삭제한 게시글은 복구할 수 없습니다.",
            icon: "question",
            showCancelButton: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                deleteMutate(threadid);
                navigate(-1);
            },
            allowOutsideClick: () => !Swal.isLoading()
        })
            .then((result) => result.isConfirmed ? Swal.fire({ title: "삭제 성공!", icon: "success" }) : null)
            .catch(error => {
                navigate("/");
                HandleErrorHelper(error);
            });
    };
    return (
        <>
            <Header />
            {isLoading ? <Spinner isLoading={isLoading} /> : (
                <Wrapper>
                    <Head>
                        <Col><BackPageIcon /></Col>
                        <Col>{postWriteUserImgUrl ? "" : <FontAwesomeIcon icon={faUser} />} {postWriteUser ? postWriteUser : "anonymous"}</Col>
                        <Col>{postModified ? `수정됨 : ${postModified?.slice(0, 10)} ${postModified?.slice(11, 19)}` : `posted by ${postCreated?.slice(0, 10)} ${postCreated?.slice(11, 19)}`}</Col>
                    </Head>
                    <Main>
                        <TitleSection>
                            <Col>{postTitle}</Col>
                            <Col><Link to={`edit`}>수정</Link>&nbsp;|&nbsp;<Link to="" onClick={handleThreadDelete}>삭제</Link></Col>
                        </TitleSection>
                        {postContent}
                        <LoveBox>
                            <Col onClick={likeIncrement}>
                                <FontAwesomeIcon icon={faHeart} />&nbsp;&nbsp;{postLike ? postLike : 0}
                            </Col>
                        </LoveBox>
                    </Main>
                    <CommentWrapper>
                        <CommentForm />
                        {response?.commentData?.map((parent: IcommentData) =>
                            parent.commentParentNum === null ? (
                                <CommentSection key={parent.commentId}>
                                    <Comment {...parent} />
                                    {response?.commentData
                                        ?.filter(child => child.commentParentNum === parent.commentId)
                                        .map(child => (
                                            <Comment {...child} inside={"10vw"} key={child.commentId} />
                                        ))}
                                </CommentSection>
                            ) : null
                        )}
                    </CommentWrapper>
                </Wrapper>
            )}
        </>
    );
};

export default memo(Thread);
