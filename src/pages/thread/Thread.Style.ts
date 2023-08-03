import styled from 'styled-components';

import { media } from '@/styles/mediaQuery';

export const Wrapper = styled.section`
  margin-top: 8vh;
  color: ${(props) => props.theme.textColor};
  padding: 0px 1em;
`;

export const Head = styled.header`
  display: grid;
  grid-template-columns: 1fr 1.2fr 3fr;
  @media ${media.phone} {
    grid-template-columns: 2fr 1.5fr 1.5fr;
  }
  img {
    width: 30%;
    height: 50%;
    padding-right: 10px;
  }
  svg {
    padding-right: 10px;
  }
  div:first-child {
    place-self: center start;
    font-size: 1.2em;
    @media ${media.desktop} {
      font-size: 1.5em;
    }
  }
  div:last-child {
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
`;

export const Col = styled.div`
  place-self: center center;
`;

export const Main = styled.main`
  background-color: ${(props) => props.theme.postColor};
  min-height: 350px;
  margin-top: 10px;
  border-radius: 5px;
  padding: 10px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ImgDiv = styled.div`
  width: 100%;
  overflow: scroll;
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
  border-bottom: 1px solid ${(props) => props.theme.accentColor};
  div:first-child {
    font-family: 'Noto Sans KR', sans-serif;
    font-size: 1.5em;
    padding-right: 5px;
    word-break: break-all;
    line-height: 35px;
  }
  div:last-child {
    font-size: 0.8em;
    opacity: 0.5;
    white-space: nowrap;
  }
`;

export const LoveBox = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.buttonColor};
  div {
    padding: 15px;
    background-color: ${(props) => props.theme.bgColor};
    border: 1px solid ${(props) => props.theme.buttonColor};
    border-radius: 5px;
    white-space: nowrap;
    cursor: pointer;
  }
`;

export const CommentWrapper = styled.article`
  margin-top: 10px;
  padding: 0px 10px;
  width: 95%;
`;

export const CommentSection = styled.div`
  border-top: 1px solid ${(props) => props.theme.postColor};
`;
