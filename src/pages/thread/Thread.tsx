import { faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import { deleteThread, fetchThread, patchThreadLike } from '../../api/threadApi';
import BackPageIcon from '../../components/BackPageIcon';
import Comment from '../../components/Comment';
import CommentForm from '../../components/CommentForm';
import Header from '../../components/header/Header';
import Spinner from '../../components/Spinner';
import useError from '../../hooks/useError';
import useLoginInfo from '../../hooks/useLoginInfo';
import Meta from '../../Meta';
import { IcommentData, IResponse, TTreadId } from '../../types/thread';
import * as S from './Thread.Style';

const Thread = () => {
  const { threadid } = useParams() as TTreadId;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { errorMessage } = useError();
  const [imgWidth, setImgWidth] = useState(0);
  const [userloading, { loginUserId }] = useLoginInfo();
  const { data: response, isLoading } = useQuery<IResponse>(
    ['thread', threadid],
    () => fetchThread(threadid),
    { onError: (error) => errorMessage(error), staleTime: 1000 * 60 },
  );
  const [threadItem] = response?.data ?? [];
  const {
    postContent,
    postCreated,
    postLike,
    postTitle,
    postWriteUser,
    postWriteUserImgUrl,
    postModified,
    userId,
    postImg,
  } = threadItem ?? {};
  const onSuccess = () => queryClient.invalidateQueries(['thread', threadid]);
  const { mutate: threadlike } = useMutation(patchThreadLike, {
    onSuccess,
    onError: (error) => errorMessage(error, false),
  });
  const { mutate: deleteMutate, isLoading: deleteRequset } = useMutation(
    (threadid: string) => deleteThread(userId, threadid),
    {
      onSuccess: () => {
        onSuccess();
        Swal.fire({ title: '삭제 성공!', icon: 'success' });
        navigate('/');
      },
      onError: (error) => errorMessage(error, false),
    },
  );
  const likeIncrement = () => {
    const now = new Date();
    const incrementTime = new Date(localStorage.getItem('threadIncrementTime') || 0);

    if (!incrementTime || now.getTime() - incrementTime.getTime() > 1000 * 30) {
      threadlike(threadid);
      localStorage.setItem('threadIncrementTime', now.toString());
    } else {
      Swal.fire({
        icon: 'warning',
        text: '게시글 좋아요는 30초마다 누를 수 있습니다.',
      });
    }
  };

  const handleThreadDelete = () => {
    Swal.fire({
      title: '게시글을 정말 삭제 하시겠습니까?',
      text: '삭제한 게시글은 복구할 수 없습니다.',
      icon: 'question',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        deleteMutate(threadid);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  const handleImgLoad = (event: any) => {
    const imgElement = event.currentTarget as HTMLImageElement;

    setImgWidth(imgElement.naturalWidth);
  };

  return (
    <>
      <Meta title={`${postTitle} | Rabbit`} description={postContent} image={postImg} />
      <Header />
      {isLoading || deleteRequset ? (
        <Spinner isLoading={isLoading} />
      ) : (
        <S.Wrapper>
          <S.Head>
            <S.Col>
              <BackPageIcon />
            </S.Col>
            <S.Col>
              {postWriteUserImgUrl ? (
                <img alt={postWriteUserImgUrl} src={postWriteUserImgUrl} />
              ) : (
                <FontAwesomeIcon icon={faUser} />
              )}{' '}
              {postWriteUser ? <Link to={`/user/${userId}`}>{postWriteUser}</Link> : 'anonymous'}
            </S.Col>
            <S.Col>
              {postModified
                ? `수정됨 : ${postModified?.slice(0, 10)} ${postModified?.slice(11, 19)}`
                : `posted by ${postCreated?.slice(0, 10)} ${postCreated?.slice(11, 19)}`}
            </S.Col>
          </S.Head>
          <S.Main>
            <S.TitleSection>
              <S.Col>{postTitle}</S.Col>
              <S.Col>
                {/* 로그인유저, 익명유저 식별 */}
                {userloading ? null : userId == loginUserId || userId == null ? (
                  <>
                    <Link to={'edit'}>수정</Link>&nbsp;|&nbsp;
                    <Link to="" onClick={handleThreadDelete}>
                      삭제
                    </Link>
                  </>
                ) : null}
              </S.Col>
            </S.TitleSection>
            <S.ImgDiv>
              {postImg ? (
                <S.MainImg
                  src={postImg}
                  alt={postImg}
                  onLoad={handleImgLoad}
                  imgWidthSize={imgWidth}
                />
              ) : null}
            </S.ImgDiv>
            {postContent}
            <S.LoveBox>
              <S.Col onClick={likeIncrement}>
                <FontAwesomeIcon icon={faHeart} />
                &nbsp;&nbsp;{postLike ? postLike : 0}
              </S.Col>
            </S.LoveBox>
          </S.Main>
          <S.CommentWrapper>
            <CommentForm />
            {response?.commentData?.map((parent: IcommentData) =>
              parent.commentParentNum === null ? (
                <S.CommentSection key={parent.commentId}>
                  <Comment {...parent} />
                  {response?.commentData
                    ?.filter((child) => child.commentParentNum === parent.commentId)
                    .map((child) => {
                      return <Comment {...child} inside={'10vw'} key={child.commentId} />;
                    })}
                </S.CommentSection>
              ) : null,
            )}
          </S.CommentWrapper>
        </S.Wrapper>
      )}
    </>
  );
};

export default memo(Thread);
