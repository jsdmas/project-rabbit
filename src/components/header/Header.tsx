import {
  faArrowRightFromBracket,
  faBars,
  faCheckToSlot,
  faFeatherAlt,
  faIdBadge,
  faMagnifyingGlass,
  faMoon,
  faSdCard,
  faSun,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQueryClient } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';

import { logout } from '@/api/userApi';
import darkLogo from '@/assets/logo_dark.png';
import lightLogo from '@/assets/logo_light.png';
import { throttle } from '@/helper/throttle';
import useLoginInfo from '@/hooks/useLoginInfo';

import {
  darkState,
  errorMessageState,
  keywordOptionState,
  OrderBy,
  orderbyState,
  OrderCommends,
  orderCommendState,
  searchHistoryState,
  searchKeywordState,
  SearchOption,
} from '../../atoms';
import * as S from './header.style';

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
    setSearchHistory((prev) => prev.filter((_, i) => i !== index));
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
    sortLike((prev) =>
      prev === OrderCommends['p.created'] ? OrderCommends['p.like'] : OrderCommends['p.created'],
    );
  }, 400);
  const sortTimeClick = throttle(() => {
    queryClient.clear();
    sortTime((prev) => (prev === OrderBy.DESC ? OrderBy.ASC : OrderBy.DESC));
  }, 400);

  //? 로고 클릭 함수
  const homeClick = () => {
    queryClient.clear();
    resetOption();
    resetKeyword();
    resetErrorMessage();
  };
  // 검색 함수
  const { register, handleSubmit, setFocus, setValue } = useForm();
  const onVaild = (data: FieldValues) => {
    const { option, search } = data;

    if (option === SearchOption.none) setFocus('option');
    if (!search || search.trim() === '') setFocus('search');
    if (option !== SearchOption.none && search.trim() !== '') {
      if (!remove) return;
      setSearchOption(option);
      setSearchKeyword(search);
      setHistory(false);
      setSearchHistory((prev) => [search, ...prev]);
      remove();
      resetErrorMessage();
      setValue('search', null);
      queryClient.resetQueries();
    }
  };

  return (
    <S.Nav>
      <S.Col>
        <Link to="/" onClick={homeClick}>
          <S.Img src={isdark ? darkLogo : lightLogo} alt="logo_rabbit" />
        </Link>
      </S.Col>
      <S.Rabbit>Rabbit</S.Rabbit>
      <S.Item>
        {pathname === '/' ? (
          <S.Form onSubmit={handleSubmit(onVaild)}>
            <select {...register('option')}>
              <option value={SearchOption.none}>선택</option>
              <option value={SearchOption.Thread}>Thread</option>
              <option value={SearchOption.Title}>Title</option>
              <option value={SearchOption.User}>User</option>
            </select>
            <S.Item>
              <FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />
              <input
                type="text"
                {...register('search')}
                placeholder="keyword..."
                autoComplete="off"
                onClick={() => setHistory((prev) => !prev)}
              />
              {!history ? null : (
                <S.SearchHistoryBox>
                  <ul>
                    {searchHistory.map((value, index) => {
                      return (
                        <li key={index}>
                          <Link to="" onClick={() => setValue('search', value)}>
                            {value}
                          </Link>
                          <S.HistoryButton type="button" onClick={() => handleHistoryDelete(index)}>
                            <FontAwesomeIcon icon={faXmark} />
                          </S.HistoryButton>
                        </li>
                      );
                    })}
                  </ul>
                </S.SearchHistoryBox>
              )}
            </S.Item>

            <S.SearchButton type="submit">검색</S.SearchButton>
          </S.Form>
        ) : null}
      </S.Item>
      <S.MenuNav>
        <FontAwesomeIcon
          icon={faBars}
          onClick={() => setIsMenu((prev) => !prev)}
          cursor="pointer"
        />
      </S.MenuNav>
      <S.Menu isMenu={isMenu}>
        {isuserLoading ? null : (
          <S.Ul>
            {loginState ? null : (
              <S.Li>
                <Link to="/login">
                  <FontAwesomeIcon icon={faCheckToSlot} />
                  &nbsp;login
                </Link>
              </S.Li>
            )}
            {loginState ? null : (
              <S.Li>
                <Link to="/join">
                  <FontAwesomeIcon icon={faSdCard} />
                  &nbsp;Join
                </Link>
              </S.Li>
            )}
            {loginState ? (
              <S.Li>
                <Link to="" onClick={() => logout().then(() => navigate(0))}>
                  <FontAwesomeIcon icon={faArrowRightFromBracket} />
                  &nbsp;logout
                </Link>
              </S.Li>
            ) : null}
            {loginState ? (
              <S.Li>
                <Link to={`/user/${loginUserId}`}>
                  <FontAwesomeIcon icon={faIdBadge} />
                  &nbsp;my-profile
                </Link>
              </S.Li>
            ) : null}
            <S.Li>
              <Link to="/write">
                <FontAwesomeIcon icon={faFeatherAlt} />
                &nbsp;글쓰기
              </Link>
            </S.Li>
            {pathname === '/' ? <S.Li onClick={sortTimeClick}>시간 정렬</S.Li> : null}
            {pathname === '/' ? <S.Li onClick={sortLikeClick}>좋아요 정렬</S.Li> : null}
            <S.Li onClick={() => setIsdark((prev) => !prev)}>
              <FontAwesomeIcon icon={isdark ? faSun : faMoon} />
            </S.Li>
          </S.Ul>
        )}
      </S.Menu>
    </S.Nav>
  );
};

export default memo(Header);
