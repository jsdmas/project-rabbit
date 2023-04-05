import { faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchThread } from "../api";
import BackPageIcon from "../components/BackPageIcon";
import Comment, { IcommentData } from "../components/Comment";
import Header from "../components/Header";

type TTreadId = {
    threadid: string
};

interface IData {
    postId: number
    postTitle: string
    postWriteUser: string
    postContent: string
    postCreated: string
    postLike: number
    postImg?: string
    postImgName?: string
    postModified?: string
    postWriteUserImgUrl?: string
}

interface IResponse {
    commentData: IcommentData[]
    data: IData[]
    pubdate: string
    rt: string
    rtcode: number
    rtmsg: string
}

const Wrapper = styled.div`
    margin-top: 8vh;
    color: ${props => props.theme.textColor};
    padding:0px 1em;
`;

const Head = styled.div`
    display: grid;
    grid-template-columns: 1fr 1.2fr 3fr;
    div:first-child{
        font-size: 1.5em;
    }
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
`;

const CommentForm = styled.form`
    display: grid;
    grid-template-columns: 1fr 0.2fr;
    button{
        border: none;
        background-color: ${props => props.theme.buttonColor};
        color: #fff;
        border-radius: 5px;
        cursor: pointer;
    }
`;

const CommentTextarea = styled.textarea`
    height: 6vh;
    width: 90%;
    resize: none;
    border: 1px solid ${props => props.theme.accentColor};
    border-radius: 5px;
`;

const CommentSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const CommentDiv = styled.div`
    margin-top: 10px;
    display: flex;
    height: 9vh;
    display: grid;
    grid-template-columns: 0.2fr 1fr 0.1fr;
    grid-template-rows: 1fr;
    column-gap: 5px;
    
`;

const ReplyForm = styled.form`
    white-space: nowrap;
    place-self: center center;
`;

const ReplyButton = styled.button`
    color:#fff;
    background-color: ${props => props.theme.buttonColor};
    border: none;
    cursor: pointer;
    border-radius: 5px;
`;

const CommentChildDiv = styled(CommentDiv)`
    padding-left: 10vw;
`;

const Thread = () => {
    const { threadid } = useParams() as TTreadId;
    const { data: response } = useQuery<IResponse>(["thread", threadid], () => fetchThread(threadid), {
        staleTime: 1000 * 60 * 10,
        cacheTime: 1000 * 60 * 10
    });
    const [threadItem] = response?.data ?? [];
    const { postContent, postCreated, postLike, postTitle, postWriteUser, postWriteUserImgUrl } = threadItem ?? {};

    console.log(response);

    return (
        <>
            <Header />
            <Wrapper>
                <Head>
                    <Col><BackPageIcon /></Col>
                    <Col>{postWriteUserImgUrl ? "" : <FontAwesomeIcon icon={faUser} />} {postWriteUser}</Col>
                    <Col>posted by {postCreated?.slice(0, 10)} {postCreated?.slice(11, 19)}</Col>
                </Head>
                <Main>
                    <TitleSection>
                        <Col>{postTitle}</Col>
                        <Col><Link to={`edit`}>Edit</Link></Col>
                    </TitleSection>
                    {postContent}
                    <LoveBox>
                        <Col>
                            <FontAwesomeIcon icon={faHeart} />&nbsp;&nbsp;{postLike}
                        </Col>
                    </LoveBox>
                </Main>
                <CommentWrapper>
                    <CommentForm>
                        <CommentTextarea placeholder="comment..." />
                        <button>작성</button>
                    </CommentForm>
                    {response?.commentData.map((parent: IcommentData) =>
                        parent.commentParentNum === null ? (
                            <CommentSection key={parent.commentId}>
                                <CommentDiv>
                                    <Comment {...parent} />
                                    <ReplyForm>
                                        <ReplyButton>답글</ReplyButton>
                                    </ReplyForm>
                                </CommentDiv>
                                {response?.commentData
                                    .filter(child => child.commentParentNum === parent.commentId)
                                    .map(child => (
                                        <CommentChildDiv key={child.commentId}>
                                            <Comment {...child} />
                                        </CommentChildDiv>
                                    ))}
                            </CommentSection>
                        ) : null
                    )}
                </CommentWrapper>
            </Wrapper>
        </>
    );
};

export default memo(Thread);
