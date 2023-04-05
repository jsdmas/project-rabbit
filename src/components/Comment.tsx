/**
 * 댓글길이 제한 설정, 
 */
import { faHeart, faUser } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import { Link } from "react-router-dom"

export interface IcommentData {
    commentId: number
    commentContent: string
    commentCreated: string
    commentLike: number
    commentWriteUser?: string
    commentModified?: string
    commentParentNum?: number
    commentWriteUserImgUrl?: string
};

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
    padding: 0px 10px 5px 0px;
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
`;

const ButtonSction = styled.span`
    opacity: 1;
`;


const Comment = ({ commentContent, commentCreated, commentLike, commentWriteUser, commentModified, commentWriteUserImgUrl }: IcommentData) => {
    return (
        <>
            <Col>
                {commentWriteUserImgUrl ? "" : <FontAwesomeIcon icon={faUser} />}
            </Col>
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

export default Comment;