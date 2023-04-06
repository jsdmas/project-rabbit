/**
 * 댓글길이 제한 설정, 
 */
import { faHeart, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { memo } from "react"
import { IcommentData } from "../types/thread"

const Wrapper = styled.span`
    place-self: center start;
    display: flex;
    flex-direction: column;
    flex:1;
    height: 100%;
    border-top: 1px solid ${props => props.theme.postColor};
    padding-top: 5px;
`;

const Col = styled.div`
    place-self: center center;
`;

const CommentInfo = styled.span`
    display: flex;
    row-gap: 10px;
    font-size: 0.8em;
    white-space: nowrap;
    div:first-child{
        opacity: 0.5;
        place-self: center start;
    }
`;

const CommentContent = styled.span`
    font-size: 12px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 60%;
    margin-top: 5px;
`;

const ButtonSction = styled.span`
    opacity: 1;
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

const UserImgDiv = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    margin-right: 10px;
    place-self: center center;
    justify-content: space-between;
    height: 70%;
`;

const Comment = ({ commentContent, commentCreated, commentLike, commentWriteUser, commentModified, commentWriteUserImgUrl, commentParentNum }: IcommentData) => {
    return (
        <>
            <UserImgDiv>
                <Col>
                    {commentWriteUserImgUrl ? "" : <FontAwesomeIcon icon={faUser} />}
                </Col>
                {!commentParentNum ? (<ReplyForm>
                    <ReplyButton>답글</ReplyButton>
                </ReplyForm>) : null}
            </UserImgDiv>
            <Wrapper>
                <CommentInfo>
                    <Col>
                        {commentWriteUser ? "" : "anonymous"} &nbsp;
                        {commentCreated?.slice(0, 10)} &nbsp;
                    </Col>
                    <ButtonSction>
                        <Link to="">수정</Link> | <Link to="">삭제</Link> &nbsp;
                        <FontAwesomeIcon icon={faHeart} /> &nbsp;{commentLike}
                    </ButtonSction>
                </CommentInfo>
                <CommentContent>
                    {commentContent}
                </CommentContent>
            </Wrapper>
        </>
    );
};

export default memo(Comment);