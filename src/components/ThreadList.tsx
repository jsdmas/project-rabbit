/**
 * @구현필요  - user img 불러오기
 *          - 게시글 링크 걸기, 이미지 처리
 */

import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { IThreadList } from "../types/thread";
import { memo } from "react";

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    max-width: 320px;
    max-height: 250px;
    margin: 30px auto;
    padding: 10px;
    border-radius: 5px;
    display: grid;
    grid-template-rows: 0.5fr 0.6fr 2fr 0.5fr;
    row-gap: 5px;
    background-color: ${props => props.theme.postColor};
    box-shadow: 0px 0px 3px 2px ${props => props.theme.postColor};
    &:first-child{
        margin-top: 10vh;
    }
`;

const UserInfo = styled.div`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 0.5fr 2fr 3fr;
    place-items: center start;
    color: ${props => props.theme.textColor};
    span:last-child{
        place-self: center end;
        font-size: 8px;
        opacity: 0.6;
    }
`;

const Col = styled.span`
    font-size: 14px;
`;

const Title = styled.h2`
    font-size: 24px;
    text-overflow: ellipsis;
    place-self: center start;
`;

const TitleLink = styled(Link)`
    color: ${props => props.theme.buttonColor};
`;


const Content = styled.div`
    border: 1px solid ${props => props.theme.buttonColor};
    border-radius: inherit;
    padding: 10px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4; /* 라인수 */
    line-height: 1.8em;
    color: ${props => props.theme.textColor};
`;

const PostInfo = styled.div`
    margin-top: 10px;
    display: grid;
    grid-template-columns: 0.3fr 0.3fr 1fr;
    place-items: center center;
    span:last-child{
        margin-top: 2px;
    }
    color: ${props => props.theme.textColor};
`;


const ThreadList = ({ title, content, created, img_name, img_url, like, modified, post_id, user_id, nickname, userimg, commentCnt }: IThreadList) => {
    return (
        <Wrapper>
            <UserInfo>
                <Col>{userimg ? "" : <FontAwesomeIcon icon={faUser} />}</Col>
                <Col>{nickname ? nickname : "anonymous"}</Col>
                <Col>posted by {created.slice(0, 10)}&nbsp;&nbsp;{created.slice(11, 19)}</Col>
            </UserInfo>
            <TitleLink to={`/thread/${post_id}`}><Title>{title}</Title></TitleLink>
            <Content>
                {content}
            </Content>
            <PostInfo>
                <span>
                    <FontAwesomeIcon icon={faHeart} />&nbsp;{like ? like : 0}
                </span>
                <span>
                    <FontAwesomeIcon icon={faMessage} />&nbsp;{commentCnt}
                </span>
            </PostInfo>
        </Wrapper>
    );
};

export default memo(ThreadList);