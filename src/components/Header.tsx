import { useState, memo } from "react";
import styled from "styled-components";
import lightLogo from "../assets/logo_light.png";
import darkLogo from "../assets/logo_dark.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faMagnifyingGlass, faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { darkState, OrderBy, orderbyState, OrderCommends, orderCommendState, keywordOptionState, searchKeywordState, SearchOption, errorMessageState } from "../atoms";
import { useQueryClient } from "@tanstack/react-query";
import { throttle } from "lodash";
import { FieldValues, useForm } from "react-hook-form";
import useLoginInfo from "../hooks/useLoginInfo";

const Nav = styled.nav`
    z-index: 99;
    position: fixed;
    left: 50%;
    transform: translate(-50%);
    top: 0;
    display: grid;
    grid-template-columns: 0.5fr 9fr 0.5fr;
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
    grid-column: span 2;
`;

const Form = styled.form`
    display: grid;
    grid-template-columns: 0.1fr 1fr 0.1fr;
    width: 100%;
    column-gap:5px;
    svg{
        position: relative;
        left: 20px;
        color: ${props => props.theme.buttonColor};
    }
    input{
        padding: 5px 10px 5px 22px;
        border-radius: 5px;
        border: inherit;
        width: 100%;
    }
    select{
        padding: 5px 0px;
        border: 1px solid ${props => props.theme.accentColor};
        color: ${props => props.theme.buttonColor};
        border-radius: 5px;
    }
    button{
        place-self: center end;
        border: none;
        padding: 5px;
        background-color: ${props => props.theme.buttonColor};
        color: #fff;
        cursor: pointer;
        border-radius: 5px;
    }
`;

const Item = styled.div`
`;

const SearchButton = styled.button`
white-space: nowrap;
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
    a{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }
`;

const Header = ({ remove }: { remove?: () => void }) => {
    const queryClient = useQueryClient();
    const { pathname } = useLocation();
    //? 유저 로그인 정보
    const [userLoading, userState] = useLoginInfo();
    //? 검색 option  State
    const sortLike = useSetRecoilState(orderCommendState);
    const sortTime = useSetRecoilState(orderbyState);
    const setSearchOption = useSetRecoilState(keywordOptionState);
    const setSearchKeyword = useSetRecoilState(searchKeywordState);

    //? 검색 option reset
    const resetOption = useResetRecoilState(keywordOptionState);
    const resetKeyword = useResetRecoilState(searchKeywordState);
    const resetErrorMessage = useResetRecoilState(errorMessageState);

    //? 다크모드, 메뉴 상태 
    const [isdark, setIsdark] = useRecoilState(darkState);
    const [isMenu, setIsMenu] = useState(false);

    //? 검색조건 함수
    const sortLikeClick = throttle(() => {
        queryClient.clear();
        sortLike(prev => prev === OrderCommends["p.created"] ? OrderCommends["p.like"] : OrderCommends["p.created"]);
    }, 300);
    const sortTimeClick = throttle(() => {
        queryClient.clear();
        sortTime(prev => prev === OrderBy.DESC ? OrderBy.ASC : OrderBy.DESC);
    }, 300);

    // 로고 클릭 함수
    const homeClick = () => {
        queryClient.clear();
        resetOption();
        resetKeyword();
        resetErrorMessage();
    };
    const { register, handleSubmit, setFocus, setValue } = useForm();
    const onVaild = (data: FieldValues) => {
        const { option, search } = data;
        if (option === SearchOption.none) setFocus("option");
        if (!search || search.trim() === "") setFocus("search");
        if (option !== SearchOption.none && search.trim() !== "") {
            if (!remove) return;
            setSearchOption(option);
            setSearchKeyword(search);
            remove();
            resetErrorMessage();
            setValue("search", null);
            queryClient.resetQueries();
        }
    };
    return (
        <Nav>
            <Col>
                <Link to="/" onClick={homeClick} >
                    <Img src={isdark ? darkLogo : lightLogo} alt="logo_rabbit" />
                </Link>
            </Col>
            <Item>
                {pathname === "/" ?
                    <Form onSubmit={handleSubmit(onVaild)}>
                        <select  {...register("option")}>
                            <option value={SearchOption.none}>선택</option>
                            <option value={SearchOption.Thread}>Thread</option>
                            <option value={SearchOption.Title}>Title</option>
                            <option value={SearchOption.User}>User</option>
                        </select>
                        <Item>
                            <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />
                            <input type="text" {...register("search")} placeholder="keyword..." />
                        </Item>
                        <SearchButton type="submit">검색</SearchButton>
                    </Form> : null}
            </Item>
            <Col>
                <FontAwesomeIcon icon={faBars} onClick={() => setIsMenu(prev => !prev)} cursor="pointer" />
            </Col>
            <Menu isMenu={isMenu} >
                <Ul>
                    <Li><Link to="/login">login</Link></Li>
                    <Li><Link to="/join">Join</Link></Li>
                    <Li><Link to={`/user/${userState?.loginUserId}`}>my-profile</Link></Li>
                    <Li><Link to="/write">글쓰기</Link></Li>
                    {pathname === "/" ? <Li onClick={sortTimeClick}>시간 순 정렬</Li> : null}
                    {pathname === "/" ? <Li onClick={sortLikeClick}>좋아요 순 정렬</Li> : null}
                    <Li onClick={() => setIsdark(prev => !prev)}><FontAwesomeIcon icon={isdark ? faMoon : faSun} /></Li>
                </Ul>
            </Menu>
        </Nav>
    );
};

export default memo(Header);