import { faHeart, faReply, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Swal from 'sweetalert2';

import { commentIncrementLike, deleteComment, editComment } from '../../api/threadApi';
import { replyState } from '../../atoms';
import RegexHelper from '../../helper/RegexHelper';
import useError from '../../hooks/useError';
import useLoginInfo from '../../hooks/useLoginInfo';
import { useTextArea } from '../../hooks/useTextArea';
import { IcommentData, IpostCommentData, TTreadId } from '../../types/thread';
import CommentForm from '../CommentForm';
import * as S from './Comment.Style';

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
    <S.Grid inside={inside}>
      <S.User>
        <S.UserImg>
          {commentWriteUserImgUrl ? (
            <img alt={commentWriteUserImgUrl} src={commentWriteUserImgUrl} />
          ) : (
            <FontAwesomeIcon icon={faUser} />
          )}
          {!commentParentNum ? (
            <S.ReplyButton
              onClick={() => (commentId === replyId ? setReplyId(null) : setReplyId(commentId))}
              type="button"
            >
              <FontAwesomeIcon icon={faReply} />
              &nbsp;답글
            </S.ReplyButton>
          ) : null}
        </S.UserImg>
        <S.UserInfo>
          <S.UserInfoCol>
            {commentWriteUser ? (
              <Link to={`/user/${commentUserId}`}>{commentWriteUser}</Link>
            ) : (
              'anonymous'
            )}
          </S.UserInfoCol>
          <S.UserInfoCol>
            {commentModified
              ? `수정:${commentModified.slice(0, 10)}`
              : commentCreated?.slice(0, 10)}
            <S.UserInfoColTime>&nbsp;&nbsp;{commentCreated?.slice(11, 19)}</S.UserInfoColTime>
          </S.UserInfoCol>
          <S.UserInfoCol>
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
          </S.UserInfoCol>
          <S.UserInfoCol>
            <FontAwesomeIcon icon={faHeart} onClick={handleCommentLike} /> &nbsp;&nbsp;{commentLike}
          </S.UserInfoCol>
          {!commentEdit ? (
            <S.UserComment commentEdit={commentEdit}>{commentContent}</S.UserComment>
          ) : (
            <S.PatchCommentForm
              commentEdit={commentEdit}
              onSubmit={handleSubmit(commentEditSubmit)}
            >
              <S.CommentUserIdInput {...register('commentUserId')} defaultValue={commentUserId} />
              <S.CommentTextarea
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
            </S.PatchCommentForm>
          )}
        </S.UserInfo>
      </S.User>
      {!commentParentNum ? (
        commentId === replyId ? (
          <S.FormWrapper fromReplyId={replyId}>
            <CommentForm commentParentNum={replyId} />
          </S.FormWrapper>
        ) : null
      ) : null}
    </S.Grid>
  );
};

export default memo(Comment);
