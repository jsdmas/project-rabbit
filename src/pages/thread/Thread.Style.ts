import styled from 'styled-components';

import { media } from '@/styles/mediaQuery';

export const Wrapper = styled.section`
  margin-top: 8vh;
  color: ${(props) => props.theme.textColor};
  padding: 0px 1em;
`;

export const Head = styled.header`
  display: flex;
  justify-content: space-around;
  width: 60%;
  img {
    max-width: 55px;
    max-height: 55px;
    padding-right: 10px;
  }
  svg {
    padding-right: 10px;
  }
  div:first-child {
    place-self: center start;
    padding-left: 20px;
  }
  div:nth-child(3) {
    opacity: 0.5;
    font-size: 0.7em;
    place-self: center end;
  }
  div:nth-child(2) {
    font-size: 0.8em;
    display: flex;
    align-items: center;
    justify-content: end;
    place-self: center end;
  }
  div:last-child {
    opacity: 0.5;
    font-size: 0.7em;
    place-self: center end;
  }
`;

export const Col = styled.div`
  place-self: center center;
`;

export const Main = styled.main`
  background-color: ${(props) => props.theme.bgColor};
  min-height: 150px;
  margin: auto;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  line-height: 18px;
`;

export const ImgDiv = styled.div`
  width: 100%;
`;

export const MainImg = styled.img<{ imgWidthSize?: number }>`
  width: ${(props) => props.imgWidthSize};
  @media ${media.phone} {
    max-width: 600px;
  }
  @media ${media.tablet} {
    max-width: 768px;
  }
  @media ${media.desktop} {
    max-width: 1200px;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px 30px 0px;
  padding-bottom: 10px;
  div:first-child {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1.5em;
    padding-right: 5px;
    word-break: break-all;
    line-height: 35px;
  }
`;

export const LoveBox = styled.div`
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
  div {
    padding: 15px;
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid ${(props) => props.theme.textColor};
    border-radius: 5px;
    white-space: nowrap;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
`;

export const CommentWrapper = styled.article`
  margin: auto;
  padding: 0px 10px;
  width: 95%;
`;

export const CommentSection = styled.div`
  border-top: 1px solid ${(props) => props.theme.postColor};
`;
