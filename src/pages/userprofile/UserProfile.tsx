import {
  faComment,
  faGear,
  faImage,
  faPaste,
  faPenToSquare,
  faPerson,
  faPersonRunning,
  faUnlock,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { deleteUser, editDescription, getUserProfile, uploadUserProfile } from '../../api/userApi';
import BackPageIcon from '../../components/BackPageIcon';
import Header from '../../components/Header';
import Spinner from '../../components/Spinner';
import useError from '../../hooks/useError';
import useLoginInfo from '../../hooks/useLoginInfo';
import Meta from '../../Meta';
import { media } from '../../styles/mediaQuery';
import { IActivityCount, Iprofile } from '../../types/user';

const Grid = styled.section`
  margin: auto;
  margin-top: 8vh;
  max-width: 600px;
  display: grid;
  height: 60vh;
  grid-template-rows: 1fr 5fr 2fr 0.2fr 2fr;
`;
const TopNav = styled.nav`
  display: grid;
  margin: auto;
  grid-template-columns: 1fr 1fr;
  padding: 0 20px;
  width: 80%;
  span {
    place-self: center start;
  }
  svg {
    place-self: center end;
    font-size: 1.5em;
    color: ${(props) => props.theme.buttonColor};
    transition: 0.2s ease-in-out;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.accentColor};
      transform: rotate(90deg);
    }
  }
`;

const ProfileImg = styled.figure`
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    width: 30%;
    height: 30%;
  }
  img {
    max-width: 80%;
    max-height: 80%;
  }
`;

const UserDescription = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;

  p {
    word-break: break-all;
    line-height: 20px;
  }
  color: ${(props) => props.theme.textColor};
  span {
    width: 20%;
    display: flex;
    justify-content: space-evenly;
    font-size: 22px;
    h2 {
      font-family: 'Noto Sans KR', sans-serif;
      white-space: nowrap;
    }
  }
  p {
    opacity: 0.6;
    padding: 10px;
  }

  svg {
    color: ${(props) => props.theme.buttonColor};
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const UserActivitySection = styled.div`
  color: ${(props) => props.theme.accentColor};
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const EditForm = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  textarea {
    width: 80%;
    height: 100%;
    border-radius: 5px;
    resize: none;
  }
  button {
    width: 10%;
    height: 100%;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.buttonColor};
    color: #fff;
    white-space: nowrap;
    &:hover {
      background-color: ${(props) => props.theme.accentColor};
    }
  }
`;

const ErrorMessage = styled.span`
  display: flex;
  justify-content: center;
  color: ${(props) => props.theme.textColor};
`;

const SettingMenu = styled.div`
  position: absolute;
  top: 15%;
  right: 0%;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.accentColor};
  height: 15%;
  width: 30%;
  white-space: nowrap;
  border-radius: 5px;
  font-size: 0.8em;

  @media ${media.tablet} {
    width: 15%;
    right: 20%;
  }
  @media ${media.desktop} {
    width: 10%;
    right: 31%;
  }
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 1.2em;
`;

const Li = styled.li`
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.postColor};
  &:hover {
    background-color: ${(props) => props.theme.buttonColor};
    color: #fff;
  }
  label {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: ${(props) => props.theme.accentColor};
    cursor: pointer;
    font-family: 'Noto Sans KR', sans-serif;
    &:hover {
      color: #fff;
    }
  }

  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Noto Sans KR', sans-serif;
    &:hover {
      color: #fff;
    }
  }
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.accentColor};
  &:last-child {
    border-bottom: none;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const UserProfile = () => {
  const [, { loginUserId, loginUserSnsId }] = useLoginInfo();
  const { userid } = useParams();
  const { errorMessage } = useError();
  const queryClient = useQueryClient();
  const [edit, setEdit] = useState(false);
  const [setting, setSetting] = useState(false);
  const onSuccess = () => queryClient.invalidateQueries(['userProfile', userid]);

  // userInfo 데이터
  const { isLoading, data: response } = useQuery(
    ['userProfile', userid],
    () => getUserProfile(userid),
    { onError: (error) => errorMessage(error), staleTime: 1000 * 30 },
  );
  const { img_url, img_name, description, nickname }: Iprofile = response?.data ?? {};
  const { postCount, commentCount }: IActivityCount = response?.activityCount ?? {};

  // 회원탈퇴
  const { mutate: deleteUserMutate } = useMutation(deleteUser, {
    onError: (error) => errorMessage(error),
  });
  const onDeleteUser = () => {
    Swal.fire({
      title: '정말 회원탈퇴 하시겠습니까?',
      icon: 'question',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        deleteUserMutate({ loginUserId });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) =>
      result.value ? Swal.fire({ title: '탈퇴 성공!', icon: 'success' }) : null,
    );
  };
  // edit description
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ userDescription: string }>();
  const { mutate: editInfo } = useMutation(
    (userDescription: string) => editDescription(userDescription, userid),
    { onSuccess, onError: (error) => errorMessage(error) },
  );
  const onVaild = ({ userDescription }: { userDescription: string }) => {
    editInfo(userDescription);
    setEdit((prev) => !prev);
  };

  // edit Profile
  const { mutate: userImage } = useMutation(uploadUserProfile, {
    onSuccess,
    onError: (error) => errorMessage(error, false),
  });

  const onUploadImage = (event: any) => {
    if (event.currentTarget.files) {
      const userImageFile = event.currentTarget.files[0];

      userImage({ userImageFile, loginUserId });
    }
  };

  return (
    <>
      <Meta title={`${nickname} Profile | Rabbit`} description={description} image={img_url} />
      <Header />
      {isLoading ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <Grid>
          <TopNav>
            <BackPageIcon />
            {userid == loginUserId ? (
              <FontAwesomeIcon onClick={() => setSetting((prev) => !prev)} icon={faGear} />
            ) : null}
            {/* 프로필 사진 변경, 비밀번호 변경, 회원 탈퇴 */}
          </TopNav>
          <ProfileImg>
            {img_url ? <img src={img_url} alt={img_name} /> : <FontAwesomeIcon icon={faPerson} />}
          </ProfileImg>
          <UserDescription>
            <span>
              {userid == loginUserId ? (
                <>
                  <FontAwesomeIcon onClick={() => setEdit((prev) => !prev)} icon={faPenToSquare} />
                  &nbsp;&nbsp;
                </>
              ) : null}
              <h2>{nickname}</h2>
            </span>
            {!edit ? (
              <p>{description ? description : '소개글이 없습니다.'}</p>
            ) : (
              <EditForm onSubmit={handleSubmit(onVaild)}>
                <textarea
                  defaultValue={description}
                  {...register('userDescription', {
                    maxLength: {
                      value: 50000,
                      message: '최대 50000자까지 가능합니다.',
                    },
                  })}
                />
                <button>수정</button>
              </EditForm>
            )}
          </UserDescription>
          <ErrorMessage>{errors?.userDescription?.message}</ErrorMessage>
          <UserActivitySection>
            <span>
              <FontAwesomeIcon icon={faPaste} />
              &nbsp;thread : {postCount}{' '}
            </span>
            <span>
              <FontAwesomeIcon icon={faComment} />
              &nbsp;comment : {commentCount}
            </span>
          </UserActivitySection>
          {!setting ? null : (
            <>
              <SettingMenu>
                <Ul>
                  <Li>
                    <label htmlFor="userImageFile">
                      <FontAwesomeIcon icon={faImage} />
                      &nbsp;사진 변경
                    </label>
                  </Li>
                  {loginUserSnsId ? null : (
                    <Li>
                      <Link to="/user/change-password">
                        <FontAwesomeIcon icon={faUnlock} />
                        &nbsp;비밀번호 변경
                      </Link>
                    </Li>
                  )}
                  <Li>
                    <Link to="" onClick={onDeleteUser}>
                      <FontAwesomeIcon icon={faPersonRunning} />
                      &nbsp;회원 탈퇴
                    </Link>
                  </Li>
                </Ul>
              </SettingMenu>
              <FileInput
                type="file"
                id="userImageFile"
                onChange={onUploadImage}
                accept="image/*"
                name="userImageFile"
              />
            </>
          )}
        </Grid>
      )}
    </>
  );
};

export default memo(UserProfile);
