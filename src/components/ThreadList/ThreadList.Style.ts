import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  max-width: 320px;
  max-height: 250px;
  margin: 30px auto;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.accentColor};
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.3);
  display: grid;
  grid-template-rows: 0.5fr 0.6fr 2fr 0.5fr;
  row-gap: 10px;
  background-color: ${(props) => props.theme.postColor};
  &:first-child {
    margin-top: 10vh;
  }
`;

export const UserInfo = styled.article`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 0.5fr 2fr 3fr;
  place-items: center start;
  color: ${(props) => props.theme.textColor};
  img:first-child {
    width: 70%;
    padding-right: 10px;
  }
  span:last-child {
    place-self: center end;
    font-size: 8px;
    opacity: 0.6;
  }
`;

export const Col = styled.span`
  font-size: 14px;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-family: 'Noto Sans KR', sans-serif;
  width: 100%;
  height: 100%;
  padding-bottom: 10%;
  text-overflow: ellipsis;
  place-self: center start;
  transition: 0.2s ease-in;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
    color: #fff;
  }
`;

export const TitleLink = styled(Link)`
  color: ${(props) => props.theme.buttonColor};
  overflow: hidden;
`;

export const Content = styled.div`
  border: 1px solid ${(props) => props.theme.buttonColor};
  border-radius: inherit;
  padding: 10px;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4; /* 라인수 */
  line-height: 1.8em;
  color: ${(props) => props.theme.textColor};
`;

export const PostInfo = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 0.3fr 0.3fr 1fr;
  place-items: center center;
  span:last-child {
    margin-top: 2px;
  }
  color: ${(props) => props.theme.textColor};
`;
