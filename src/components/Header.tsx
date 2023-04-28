import { useState, memo } from "react";
import styled from "styled-components";
import lightLogo from "../assets/logo_light.png";
import darkLogo from "../assets/logo_dark.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket, faBars, faCheckToSlot, faFeatherAlt, faHourglass, faHourglassHalf, faIdBadge, faMagnifyingGlass, faMoon, faSdCard, faSun, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { darkState, OrderBy, orderbyState, OrderCommends, orderCommendState, keywordOptionState, searchKeywordState, SearchOption, errorMessageState, searchHistoryState } from "../atoms";
import { useQueryClient } from "@tanstack/react-query";
import { throttle } from "lodash";
import { FieldValues, useForm } from "react-hook-form";
import useLoginInfo from "../hooks/useLoginInfo";
import { logout } from "../api/userApi";
import { media } from "../styles/mediaQuery";

const Nav = styled.header`
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
    height: 6vh;
    background-color: ${props => props.theme.postColor};
    box-shadow: 0 0 5px rgba(0,0,0,0.2);
    div:nth-child(1){
        place-self: center start;
    }
`;

const Rabbit = styled.span`
    display: none;
    color: ${props => props.theme.accentColor};
    font-family: 'Noto Sans KR', sans-serif;
    @media ${media.tablet} {
        display: flex;
        align-items: center;
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
    @media ${media.desktop}{
        width: 50%;
        place-self: center center;
        margin-right:120px;
    }
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
`;

const Item = styled.div`
    width: 100%;
    place-self: center center;
    display: flex;
    justify-content: center;
    align-items: center;

    ul{
        padding:5px;
        padding-right: 20px;
    }
    li{
        color : ${props => props.theme.textColor};
        display:grid;
        grid-template-columns: 1fr 0.2fr;
        row-gap: 10px;
        place-self: center center;
        width: 100%;
        height: 100%;
        span{
            place-self: center start;
            cursor: pointer;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 90%;
            &:hover{
                color : ${props => props.theme.accentColor};
            }
        }
    }
`;

const MenuNav = styled.span`
    place-self: center end;
    color: ${props => props.theme.buttonColor};
    padding: 0px 15px;
`;

const SearchButton = styled.button`
    white-space: nowrap;
    place-self: center end;
    border: none;
    padding: 5px;
    background-color: ${props => props.theme.buttonColor};
    color: #fff;
    cursor: pointer;
    border-radius: 5px;
`;

const HistoryButton = styled(SearchButton)`
    background-color: ${props => props.theme.bgColor};
    font-size: 1em;
    width: 20%;
    place-self: center start;
    @media ${media.phone} {
        place-self: center end;
        padding-right:20px;
    }
    @media ${media.tablet} {
        place-self: center end;
        padding-right:20px;
    }
`;

const SearchHistoryBox = styled.div`
    position: absolute;
    top: 85%;
    width: 43%;
    min-height: 50px;
    max-height: 95px;
    background-color: ${props => props.theme.bgColor};
    color: ${props => props.theme.textColor};
    margin-left: 15px;
    overflow: scroll;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    div{
        width: 100%;
    }
    li{
        border-bottom: 1px solid ${props => props.theme.accentColor};
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

const Menu = styled.div <{ isMenu: boolean }>`
    top : 100%;
    place-self: end;
    position: absolute;
    width: 100px;
    white-space: nowrap;
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
    const navigate = useNavigate();

    //? 유저 로그인 정보
    const [isuserLoading, { loginState, loginUserId }] = useLoginInfo();

    // 검색 history
    const [searchHistory, setSearchHistory] = useRecoilState(searchHistoryState);
    const [history, setHistory] = useState(false);
    const handleHistoryDelete = (index: number) => {
        setSearchHistory(prev => prev.filter((_, i) => i !== index));
    };

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

    //? 로고 클릭 함수
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
            setSearchHistory(prev => [search, ...prev])
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
            <Rabbit>Rabbit</Rabbit>
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
                            <input type="text" {...register("search")} placeholder="keyword..." autoComplete="off" onClick={() => setHistory(prev => !prev)} />
                            {!history ? null : (
                                <SearchHistoryBox>
                                    <ul>
                                        {searchHistory.map((value, index) => {
                                            return (
                                                <li key={index} >
                                                    <span onClick={() => setValue("search", value)}>{value}</span>
                                                    <HistoryButton type="button" onClick={() => handleHistoryDelete(index)}><FontAwesomeIcon icon={faXmark} /></HistoryButton>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </SearchHistoryBox>
                            )}
                        </Item>

                        <SearchButton type="submit">검색</SearchButton>
                    </Form> : null}
            </Item>
            <MenuNav>
                <FontAwesomeIcon icon={faBars} onClick={() => setIsMenu(prev => !prev)} cursor="pointer" />
            </MenuNav>
            <Menu isMenu={isMenu} >
                {isuserLoading ? null : (
                    <Ul>
                        {loginState ? null : <Li><Link to="/login"><FontAwesomeIcon icon={faCheckToSlot} />&nbsp;login</Link></Li>}
                        {loginState ? null : <Li><Link to="/join"><FontAwesomeIcon icon={faSdCard} />&nbsp;Join</Link></Li>}
                        {loginState ? <Li><Link to="" onClick={() => logout().then(() => navigate("/"))}><FontAwesomeIcon icon={faArrowRightFromBracket} />&nbsp;logout</Link></Li> : null}
                        {loginState ? <Li><Link to={`/user/${loginUserId}`}><FontAwesomeIcon icon={faIdBadge} />&nbsp;my-profile</Link></Li> : null}
                        <Li><Link to="/write"><FontAwesomeIcon icon={faFeatherAlt} />&nbsp;글쓰기</Link></Li>
                        {pathname === "/" ? <Li onClick={sortTimeClick}>시간 정렬</Li> : null}
                        {pathname === "/" ? <Li onClick={sortLikeClick}>좋아요 정렬</Li> : null}
                        <Li onClick={() => setIsdark(prev => !prev)}><FontAwesomeIcon icon={isdark ? faMoon : faSun} /></Li>
                    </Ul>
                )}
            </Menu>
        </Nav>
    );
};

export default memo(Header);