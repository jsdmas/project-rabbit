import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  max-width: 520px;
  max-height: 250px;
  margin: 0px auto;
  padding: 10px;
  display: grid;
  grid-template-rows: 0.2fr 0.8fr;
  row-gap: 10px;
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
  text-overflow: ellipsis;
  place-self: center start;
  overflow: hidden;
`;

export const TitleLink = styled(Link)`
  border-left: 2px solid ${(props) => props.theme.accentColor};
  margin-left: 5px;
  padding-left: 10px;
  color: ${(props) => props.theme.buttonColor};
  width: 100%;
  min-height: 140px;

  display: grid;
  grid-template-rows: 0.2fr 0.7fr 0.1fr;
  transition: 0.2s ease-in;
  &:hover {
    background-color: ${(props) => props.theme.buttonColor};
    color: #fff;
  }
`;

export const Content = styled.div`
  border-radius: inherit;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* 라인수 */
  line-height: 1.68em;
  color: ${(props) => props.theme.textColor};
`;

export const PostInfo = styled.div`
  margin-top: 5px;
  font-size: 12px;
  span:last-child {
    padding-left: 10px;
  }
  color: ${(props) => props.theme.textColor};
`;
