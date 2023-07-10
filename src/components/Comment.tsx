import { faHeart, faReply, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { memo, useState } from 'react';
import { IcommentData, IpostCommentData, TTreadId } from '../types/thread';
import CommentForm from './CommentForm';
import { useRecoilState } from 'recoil';
import { replyState } from '../atoms';
import { deleteComment, editComment, commentIncrementLike } from '../api/threadApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import RegexHelper from '../helper/RegexHelper';
import useError from '../hooks/useError';
import useLoginInfo from '../hooks/useLoginInfo';
import { media } from '../styles/mediaQuery';
import { useTextArea } from '../hooks/useTextArea';

const Grid = styled.section<{ inside?: string }>`
  display: grid;
  grid-template-rows: 3fr 0.2fr;
  gap: 10px;
  padding-left: ${(props) => (props.inside ? props.inside : '')};
  padding-top: 10px;
`;

const User = styled.article`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
`;

const FormWrapper = styled.article<{ fromReplyId?: number | null }>`
  grid-column: 1 / -1;
  visibility: ${(props) => (props.fromReplyId ? '' : 'hidden')};
`;

const UserImg = styled.figure`
  height: 100%;
  place-items: center;
  place-content: center;
  display: flex;
  flex-direction: column;
  gap: 10px;
  img {
    width: 30%;
    @media ${media.tablet} {
      width: 30%;
    }
    @media ${media.desktop} {
      width: 20%;
    }
  }
`;

const UserInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 1fr;
  font-size: 0.8em;
  gap: 10px;
  span:nth-child(2) {
    opacity: 0.5;
  }
  svg {
    color: ${(props) => props.theme.buttonColor};
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.accentColor};
      transition: 0.2s;
    }
  }
`;

const UserInfoCol = styled.span`
  white-space: nowrap;
  display: flex;
`;

const UserInfoColTime = styled.span`
  display: none;
  @media ${media.tablet} {
    display: flex;
  }
`;

const ReplyButton = styled.button`
  background-color: ${(props) => props.theme.accentColor};
  border: none;
  font-size: 0.7em;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
`;

const UserComment = styled.div<{ commentEdit: boolean }>`
  grid-column: 1 / -1;
  visibility: ${(props) => (props.commentEdit ? 'none' : '')};
`;

const PatchCommentForm = styled.form<{ commentEdit: boolean }>`
  grid-column: 1 / -1;
  visibility: ${(props) => (props.commentEdit ? '' : 'none')};
  display: grid;
  grid-template-columns: 1fr 0.2fr;
  height: 100%;
  button {
    border: none;
    background-color: ${(props) => props.theme.buttonColor};
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  span {
    margin-top: 10px;
    color: ${(props) => props.theme.accentColor};
  }
`;

const CommentTextarea = styled.textarea`
  height: 6vh;
  width: 90%;
  resize: none;
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 5px;
`;

const CommentUserIdInput = styled.input`
  display: none;
`;

const Comment = ({
  inside,
  commentContent,
  commentCreated,
  commentLike,
  commentWriteUser,
  commentModified,
  commentWriteUserImgUrl,
  commentParentNum,
  commentId,
  commentUserId,
}: IcommentData) => {
  const { threadid } = useParams() as TTreadId;
  const queryClient = useQueryClient();
  const [commentEdit, setCommentEdit] = useState(false);
  const [userloading, { loginUserId }] = useLoginInfo();
  const [replyId, setReplyId] = useRecoilState(replyState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IpostCommentData>();
  const { errorMessage } = useError();
  const onSuccess = () => queryClient.invalidateQueries(['thread', threadid]);
  const [buttonRef, onkeydown] = useTextArea();

  const { mutate: editMutate } = useMutation(
    (data: IpostCommentData) => editComment(data, commentId),
    { onSuccess, onError: (error) => errorMessage(error, false) },
  );
  const { mutate: deleteCommentMutate } = useMutation(
    (commentId: number) => deleteComment(commentId, commentUserId),
    { onSuccess, onError: (error) => errorMessage(error, false) },
  );
  const { mutate: likeMutate } = useMutation(commentIncrementLike, {
    onSuccess,
    onError: (error) => errorMessage(error, false),
  });

  const commentEditSubmit = (data: IpostCommentData) => {
    Swal.fire({
      title: '댓글을 정말 수정 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        editMutate(data);
        setCommentEdit((prev) => !prev);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) =>
      result.value ? Swal.fire({ title: '수정 성공!', icon: 'success' }) : null,
    );
  };
  const handleCommentDelete = () => {
    Swal.fire({
      title: '댓글을 정말 삭제 하시겠습니까?',
      text: '삭제한 댓글은 복구할 수 없습니다.',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      preConfirm: () => {
        deleteCommentMutate(commentId);
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) =>
      result.value ? Swal.fire({ title: '삭제 성공!', icon: 'success' }) : null,
    );
  };
  const handleCommentLike = () => {
    const now = new Date();
    const incrementTime = new Date(localStorage.getItem('commentIncrementTime') || 0);
    if (!incrementTime || now.getTime() - incrementTime.getTime() > 1000 * 10) {
      likeMutate(commentId);
      localStorage.setItem('commentIncrementTime', now.toString());
    } else {
      Swal.fire({
        icon: 'warning',
        text: '댓글 좋아요는 10초마다 누를 수 있습니다.',
      });
    }
  };

  return (
    <Grid inside={inside}>
      <User>
        <UserImg>
          {commentWriteUserImgUrl ? (
            <img alt={commentWriteUserImgUrl} src={commentWriteUserImgUrl} />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
          {!commentParentNum ? (
            <ReplyButton
              onClick={() => (commentId === replyId ? setReplyId(null) : setReplyId(commentId))}
              type="button"
            >
              <FontAwesomeIcon icon={faReply} />
              &nbsp;답글
            </ReplyButton>
          ) : null}
        </UserImg>
        <UserInfo>
          <UserInfoCol>
            {commentWriteUser ? (
              <Link to={`/user/${commentUserId}`}>{commentWriteUser}</Link>
            ) : (
              'anonymous'
            )}
          </UserInfoCol>
          <UserInfoCol>
            {commentModified
              ? `수정:${commentModified.slice(0, 10)}`
              : commentCreated?.slice(0, 10)}
            <UserInfoColTime>&nbsp;&nbsp;{commentCreated?.slice(11, 19)}</UserInfoColTime>
          </UserInfoCol>
          <UserInfoCol>
            {/* 익명 작성자는 수정/삭제 가능 다른 로그인 유저가 작성한 버튼은 보이지 않는다. */}
            {userloading ? null : commentUserId == loginUserId || commentUserId == null ? (
              <>
                <Link to="" onClick={() => setCommentEdit((prev) => !prev)}>
                  수정
                </Link>{' '}
                &nbsp;|&nbsp;
                <Link to="" onClick={handleCommentDelete}>
                  삭제
                </Link>
              </>
            ) : null}
          </UserInfoCol>
          <UserInfoCol>
            <FontAwesomeIcon icon={faHeart} onClick={handleCommentLike} /> &nbsp;&nbsp;{commentLike}
          </UserInfoCol>
          {!commentEdit ? (
            <UserComment commentEdit={commentEdit}>{commentContent}</UserComment>
          ) : (
            <PatchCommentForm commentEdit={commentEdit} onSubmit={handleSubmit(commentEditSubmit)}>
              <CommentUserIdInput {...register('commentUserId')} defaultValue={commentUserId} />
              <CommentTextarea
                defaultValue={commentContent}
                onKeyDown={onkeydown}
                {...register('commentContent', {
                  required: '내용은 반드시 적어야 합니다.',
                  maxLength: {
                    value: 50000,
                    message: '내용은 최대 50000글자입니다.',
                  },
                  minLength: {
                    value: 1,
                    message: '최소 1글자 이상적어야 합니다.',
                  },
                  validate: {
                    RegexValue: (commentContent) =>
                      RegexHelper.value(commentContent) ? true : '내용을 올바르게 적어주세요',
                  },
                })}
              />
              <button ref={buttonRef}>수정</button>
              <span>{errors.commentContent?.message}</span>
            </PatchCommentForm>
          )}
        </UserInfo>
      </User>
      {!commentParentNum ? (
        commentId === replyId ? (
          <FormWrapper fromReplyId={replyId}>
            <CommentForm commentParentNum={replyId} />
          </FormWrapper>
        ) : null
      ) : null}
    </Grid>
  );
};

export default memo(Comment);
