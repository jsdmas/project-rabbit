import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import styled from 'styled-components';
import BackPageIcon from '../components/BackPageIcon';
import { IPostJoin } from '../types/register';
import RegexHelper from '../helper/RegexHelper';
import { postJoin } from '../api/userApi';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { IErrorTypes } from '../types/error';
import useError from '../hooks/useError';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useLoginInfo from '../hooks/useLoginInfo';
import Meta from '../Meta';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faCheck } from '@fortawesome/free-solid-svg-icons';
import { media } from '../styles/mediaQuery';

const Wrapper = styled.section`
  margin: 7vh auto;
  display: grid;
  gap: 30px;
  max-width: 600px;
`;

const Head = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  margin: auto;
  width: 50%;
  span {
    font-size: 2em;
    color: ${(props) => props.theme.buttonColor};
    position: absolute;
    left: 10%;
    @media ${media.tablet} {
      left: 20%;
    }
    @media ${media.desktop} {
      left: 30%;
    }
  }
  h1 {
    font-size: 1.4em;
    color: ${(props) => props.theme.buttonColor};
    font-family: 'Noto Sans KR', sans-serif;
  }
`;

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  height: 350px;
  row-gap: 3vh;
  span {
    place-self: center center;
    color: ${(props) => props.theme.textColor};
  }
`;

const Input = styled.input`
  place-self: center center;
  width: 80%;
  padding: 10px 5px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.accentColor};

  &::placeholder {
    color: ${(props) => props.theme.buttonColor};
    padding-left: 8px;
  }
`;

const Button = styled.button`
  cursor: pointer;
  place-self: center center;
  width: 80%;
  border: none;
  border-radius: 5px;
  padding: 10px 5px;
  width: 30%;
  background-color: ${(props) => props.theme.buttonColor};
  color: #fff;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: ${(props) => props.theme.accentColor};
  }
`;

const Join = () => {
  const navigate = useNavigate();
  const [userInfoLoading, { loginState }] = useLoginInfo();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostJoin>();
  const [errorMessage, setErrorMessage] = useState('');
  const { errorMessage: onErrorLogin } = useError();
  const { mutate, isLoading } = useMutation(postJoin, {
    onSuccess: () => {
      navigate('/login');
      Swal.fire({
        title: '가입 성공!',
        text: '로그인 해주세요!',
        icon: 'success',
      });
    },
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        const {
          response: { data },
        } = error;
        const { rtcode, rtmsg }: IErrorTypes = data;
        rtcode === 401 ? setErrorMessage(rtmsg) : onErrorLogin(error, false);
      }
    },
  });
  const onVaild = (data: IPostJoin) => {
    const { confirm, ...restData } = data;
    mutate(restData);
  };
  // 로그인 여부
  useEffect(() => {
    if (!userInfoLoading && loginState) navigate('/');
  }, [userInfoLoading, loginState, navigate]);
  return (
    <>
      <Meta title="회원가입 | Rabbit" description="Rabbit 회원가입 페이지입니다." />
      {userInfoLoading ? (
        <Spinner isLoading={userInfoLoading} />
      ) : (
        <>
          <Header />
          <Wrapper>
            <Head>
              <BackPageIcon />
              <h1>
                <FontAwesomeIcon icon={faAddressCard} />
                &nbsp;회원가입
              </h1>
            </Head>
            <Form onSubmit={handleSubmit(onVaild)}>
              <Input
                type="email"
                placeholder="email"
                {...register('email', {
                  required: 'email은 필수입니다.',
                  maxLength: {
                    value: 50,
                    message: '최대 50자까지 가능합니다.',
                  },
                  validate: {
                    RegexValue: (value) =>
                      RegexHelper.value(value) ? true : '양식을 올바르게 적어주세요.',
                    RegexEmail: (value) =>
                      RegexHelper.email(value) ? true : '이메일 형식을 올바르게 적어주세요.',
                  },
                })}
              />
              <span>{errors?.email?.message}</span>
              {errorMessage ? <span>{errorMessage}</span> : null}
              <Input
                type="password"
                placeholder="password"
                {...register('password', {
                  required: 'password를 입력해주세요.',
                  maxLength: {
                    value: 255,
                    message: '최대 255자까지 가능합니다.',
                  },
                  validate: {
                    RegexValue: (value) =>
                      RegexHelper.value(value) ? true : '양식을 올바르게 적어주세요',
                  },
                })}
              />
              <span>{errors?.password?.message}</span>
              <Input
                type="password"
                placeholder="비밀번호 확인"
                {...register('confirm', {
                  required: 'password를 입력해주세요.',
                  validate: {
                    RegexCompare: (passwordConfirm = '', formValues) =>
                      RegexHelper.compareTo(passwordConfirm, formValues.password)
                        ? true
                        : '비밀번호를 확인해주세요',
                  },
                })}
              />
              <span>{errors?.confirm?.message}</span>
              <Input
                placeholder="nickname"
                {...register('nickname', {
                  required: 'nickname은 필수입니다.',
                  maxLength: {
                    value: 20,
                    message: '최대 20자까지 가능합니다.',
                  },
                  validate: {
                    RegexValue: (value) =>
                      RegexHelper.value(value) ? true : '양식을 올바르게 적어주세요',
                  },
                })}
              />
              <span>{errors?.nickname?.message}</span>
              {isLoading ? (
                <Spinner isLoading={isLoading} />
              ) : (
                <Button>
                  <FontAwesomeIcon icon={faCheck} />
                  &nbsp;완료
                </Button>
              )}
            </Form>
          </Wrapper>
        </>
      )}
    </>
  );
};

export default Join;
