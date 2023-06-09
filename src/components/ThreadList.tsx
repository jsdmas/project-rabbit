import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeart, faMessage } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { IThreadList } from "../types/thread";
import { memo } from "react";

const Wrapper = styled.section`
    width: 100%;
    height: 100%;
    max-width: 320px;
    max-height: 250px;
    margin: 30px auto;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${props => props.theme.accentColor};
    box-shadow: 5px 5px 5px 0px rgba(0,0,0,0.3);
    display: grid;
    grid-template-rows: 0.5fr 0.6fr 2fr 0.5fr;
    row-gap: 10px;
    background-color: ${props => props.theme.postColor};
    &:first-child{
        margin-top: 10vh;
    }
`;

const UserInfo = styled.article`
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: 0.5fr 2fr 3fr;
    place-items: center start;
    color: ${props => props.theme.textColor};
    img:first-child{
        width: 70%;
        padding-right: 10px;
    }
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
    font-family: 'Noto Sans KR', sans-serif;
    width: 100%;
    height: 100%;
    padding-bottom: 10%;
    text-overflow: ellipsis;
    place-self: center start;
    transition: 0.2s ease-in;
    &:hover{
        background-color: ${props => props.theme.accentColor};
        color: #fff;
    }
`;

const TitleLink = styled(Link)`
    color: ${props => props.theme.buttonColor};
    overflow: hidden;   
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
                <Col>{userimg ? <img alt={`${user_id}`} src={userimg} /> : <FontAwesomeIcon icon={faUser} />}</Col>
                <Col>{nickname ? <Link to={`/user/${user_id}`}>{nickname}</Link> : "anonymous"}</Col>
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