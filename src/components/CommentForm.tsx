import { faFeatherPointed } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import { postComment } from '../api/threadApi';
import { replyState } from '../atoms';
import RegexHelper from '../helper/RegexHelper';
import useError from '../hooks/useError';
import { useTextArea } from '../hooks/useTextArea';
import { IpostCommentData, TTreadId } from '../types/thread';

const Form = styled.form<{ fromReplyId?: number | null }>`
  margin: auto;
  width: 60%;
  display: flex;
  justify-content: space-around;
  height: 100%;
  button {
    max-width: 50px;
    max-height: 40px;
    place-content: center center;
    border: none;
    background-color: ${(props) => props.theme.accentColor};
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    white-space: nowrap;
  }
`;
const ErrorMessage = styled.span`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 5px auto;
`;

const CommentTextarea = styled.textarea`
  height: 35px;
  width: 80%;
  resize: none;
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 5px;
`;

const CommentForm = ({ commentParentNum }: { commentParentNum?: number }) => {
  const { threadid } = useParams() as TTreadId;
  const queryClient = useQueryClient();
  const setReply = useSetRecoilState(replyState);
  const { errorMessage } = useError();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IpostCommentData>();

  const { mutate } = useMutation(
    (data: IpostCommentData) => postComment(data, threadid, commentParentNum),
    {
      onSuccess: () => queryClient.invalidateQueries(['thread', threadid]),
      onError: (error) => errorMessage(error, false),
    },
  );
  const commentSubmit = (data: IpostCommentData) => {
    mutate(data);
    setReply(null);
    reset();
  };

  const [buttonRef, onkeydown] = useTextArea();

  return (
    <>
      <Form onSubmit={handleSubmit(commentSubmit)}>
        <CommentTextarea
          onKeyDown={onkeydown}
          placeholder="comment..."
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
        <button ref={buttonRef}>
          <FontAwesomeIcon icon={faFeatherPointed} />
          &nbsp;작성
        </button>
      </Form>
      <ErrorMessage>{errors.commentContent?.message}</ErrorMessage>
    </>
  );
};

export default memo(CommentForm);
