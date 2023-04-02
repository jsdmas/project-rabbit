import { useState, memo, useCallback } from "react";
import styled from "styled-components";
import lightLogo from "../assets/logo_light.png";
import darkLogo from "../assets/logo_dark.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { darkState } from "../atoms";

const Nav = styled.nav`
    z-index: 99;
    position: fixed;
    top: 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    max-width: 1440px;
    height: 6vh;
    background-color: ${props => props.theme.postColor};
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
    div:nth-child(1){
        place-self: center start;
    }
    div:nth-child(2){
        display: flex;
        justify-content: center;
        align-items: center;
    }
    div:nth-child(3){
        place-self: center end;
        color: ${props => props.theme.buttonColor};
    }
`;

const Col = styled.div`
padding: 0px 15px;
`;

const Img = styled.img`
    width: 48px;
    height: 28px;
`;

const Form = styled.form`
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 50%;
    svg{
        position: relative;
        left: 20px;
        color: ${props => props.theme.buttonColor};
    }
    input{
        padding: 5px 10px 5px 22px;
        width: 100%;
        border-radius: 5px;
        border: inherit;
    }
`;

const Menu = styled.div <{ isMenu: boolean }>`
    top : 100%;
    place-self: end;
    position: absolute;
    width: 100px;
    background-color: ${props => props.theme.bgColor};
    border: 1px solid ${props => props.theme.buttonColor};
    color: ${props => props.theme.textColor};
    border-radius: 5px;
    display: ${props => !props.isMenu ? "none" : ""};
`;
const Ul = styled.ul`
    font-size: 1em;
    width: 100%;

`;

const Li = styled.li`
    padding: 5px 0px;
    border-bottom: 1px solid ${props => props.theme.buttonColor};
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    &:hover{
        transition: 0.2s ease-in-out;
        background-color: ${props => props.theme.postColor};
    }
    &:last-child{
        border-bottom: none;
    }
`;


const Header = () => {
    const [isMenu, setIsMenu] = useState(false);
    // menu값이 변경될때만 함수 호출 (dark모드를 변경할때나 다른 메뉴를 클릭할 때 랜더링 방지)
    const menuClick = useCallback(() => setIsMenu(prev => !prev), [isMenu]);
    const [isdark, setIsdark] = useRecoilState(darkState);
    return (
        <Nav>
            <Col>
                <Link to="/">
                    <Img src={isdark ? darkLogo : lightLogo} alt="logo_rabbit" />
                </Link>
            </Col>
            <Col>
                <Form>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />
                    <input type="text" />
                </Form>
            </Col>
            <Col>
                <FontAwesomeIcon icon={faBars} onClick={menuClick} cursor="pointer" />
            </Col>
            <Menu isMenu={isMenu} >
                <Ul>
                    <Li>login/signUp</Li>
                    <Li>시간 순 정렬</Li>
                    <Li>좋아요 순 정렬</Li>
                    <Li onClick={() => setIsdark(prev => !prev)}><FontAwesomeIcon icon={isdark ? faMoon : faSun} /></Li>
                </Ul>
            </Menu>
        </Nav>
    );
};

export default memo(Header);