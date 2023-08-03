import styled from 'styled-components';

import { media } from '@/styles/mediaQuery';

export const Grid = styled.section<{ inside?: string }>`
  display: grid;
  grid-template-rows: 3fr 0.2fr;
  gap: 10px;
  padding-left: ${(props) => (props.inside ? props.inside : '')};
  padding-top: 10px;
`;

export const User = styled.article`
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr 3fr;
  gap: 10px;
`;

export const FormWrapper = styled.article<{ fromReplyId?: number | null }>`
  grid-column: 1 / -1;
  visibility: ${(props) => (props.fromReplyId ? '' : 'hidden')};
`;

export const UserImg = styled.figure`
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

export const UserInfo = styled.div`
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

export const UserInfoCol = styled.span`
  white-space: nowrap;
  display: flex;
`;

export const UserInfoColTime = styled.span`
  display: none;
  @media ${media.tablet} {
    display: flex;
  }
`;

export const ReplyButton = styled.button`
  background-color: ${(props) => props.theme.accentColor};
  border: none;
  font-size: 0.7em;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
  white-space: nowrap;
`;

export const UserComment = styled.div<{ commentEdit: boolean }>`
  grid-column: 1 / -1;
  visibility: ${(props) => (props.commentEdit ? 'none' : '')};
`;

export const PatchCommentForm = styled.form<{ commentEdit: boolean }>`
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

export const CommentTextarea = styled.textarea`
  height: 6vh;
  width: 90%;
  resize: none;
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 5px;
`;

export const CommentUserIdInput = styled.input`
  display: none;
`;
