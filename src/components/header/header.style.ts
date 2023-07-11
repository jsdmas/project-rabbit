import styled from 'styled-components';

import { media } from '@/styles/mediaQuery';

export const Nav = styled.header`
  z-index: 99;
  position: fixed;
  left: 50%;
  transform: translate(-50%);
  top: 0;
  display: grid;
  grid-template-columns: 0.5fr 9fr 0.5fr;
  @media ${media.tablet} {
    grid-template-columns: 0.5fr 1fr 7fr 0.5fr;
  }
  @media ${media.desktop} {
    grid-template-columns: 0.5fr 0.5fr 6fr 0.5fr;
  }
  width: 100%;
  max-width: 1440px;
  min-height: 50px;
  background-color: ${(props) => props.theme.postColor};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  div:nth-child(1) {
    place-self: center start;
  }
`;

export const Rabbit = styled.span`
  display: none;
  color: ${(props) => props.theme.accentColor};
  font-family: 'Noto Sans KR', sans-serif;
  @media ${media.tablet} {
    display: flex;
    align-items: center;
  }
`;

export const Col = styled.div`
  padding: 0px 15px;
`;

export const Img = styled.img`
  width: 48px;
  height: 28px;
  grid-column: span 2;
`;

export const Form = styled.form`
  display: grid;
  grid-template-columns: 0.1fr 1fr 0.1fr;
  width: 100%;
  column-gap: 5px;
  @media ${media.desktop} {
    width: 50%;
    place-self: center center;
    margin-right: 120px;
  }
  svg {
    position: relative;
    left: 20px;
    color: ${(props) => props.theme.buttonColor};
  }
  input {
    padding: 5px 10px 5px 22px;
    border-radius: 5px;
    border: inherit;
    width: 100%;
  }
  select {
    padding: 5px 0px;
    border: 1px solid ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.buttonColor};
    border-radius: 5px;
  }
`;

export const Item = styled.div`
  width: 100%;
  place-self: center center;
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    padding: 5px;
    padding-right: 20px;
  }
  li {
    color: ${(props) => props.theme.textColor};
    display: grid;
    grid-template-columns: 1fr 0.2fr;
    row-gap: 10px;
    place-self: center center;
    width: 100%;
    height: 100%;
    span {
      place-self: center start;
      cursor: pointer;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 90%;
      &:hover {
        color: ${(props) => props.theme.accentColor};
      }
    }
  }
`;

export const MenuNav = styled.span`
  place-self: center end;
  color: ${(props) => props.theme.buttonColor};
  padding: 0px 15px;
`;

export const SearchButton = styled.button`
  white-space: nowrap;
  place-self: center end;
  border: none;
  padding: 5px;
  background-color: ${(props) => props.theme.buttonColor};
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
`;

export const HistoryButton = styled(SearchButton)`
  background-color: ${(props) => props.theme.bgColor};
  font-size: 1em;
  width: 20%;
  place-self: center start;
  @media ${media.phone} {
    place-self: center end;
    padding-right: 20px;
  }
  @media ${media.tablet} {
    place-self: center end;
    padding-right: 20px;
  }
`;

export const SearchHistoryBox = styled.div`
  position: absolute;
  top: 85%;
  width: 43%;
  min-height: 50px;
  max-height: 95px;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
  margin-left: 15px;
  overflow: scroll;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  div {
    width: 100%;
  }
  li {
    border-bottom: 1px solid ${(props) => props.theme.accentColor};
  }
  @media ${media.phone} {
    width: 59%;
  }
  @media ${media.tablet} {
    width: 56%;
    max-height: 150px;
  }
  @media ${media.desktop} {
    width: 30%;
  }
`;

export const Menu = styled.div<{ isMenu: boolean }>`
  top: 100%;
  place-self: end;
  position: absolute;
  width: 100px;
  white-space: nowrap;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.buttonColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 5px;
  display: ${(props) => (!props.isMenu ? 'none' : '')};
`;

export const Ul = styled.ul`
  font-size: 1em;
  width: 100%;
`;

export const Li = styled.li`
  font-family: 'Noto Sans KR', sans-serif;
  padding: 5px 0px;
  border-bottom: 1px solid ${(props) => props.theme.buttonColor};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:hover {
    transition: 0.2s ease-in-out;
    background-color: ${(props) => props.theme.postColor};
  }
  &:last-child {
    border-bottom: none;
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-family: 'Noto Sans KR', sans-serif;
  }
`;
