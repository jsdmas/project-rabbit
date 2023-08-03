import { faHeart, faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { IThreadList } from '../../types/thread';
import * as S from './ThreadList.Style';

const ThreadList = (props: IThreadList) => {
  const { title, content, created, like, post_id, user_id, nickname, userimg, commentCnt } = props;

  return (
    <S.Wrapper>
      <S.UserInfo>
        <S.Col>
          {userimg ? <img alt={`${user_id}`} src={userimg} /> : <FontAwesomeIcon icon={faUser} />}
        </S.Col>
        <S.Col>{nickname ? <Link to={`/user/${user_id}`}>{nickname}</Link> : 'anonymous'}</S.Col>
        <S.Col>
          posted by {created.slice(0, 10)}&nbsp;&nbsp;{created.slice(11, 19)}
        </S.Col>
      </S.UserInfo>
      <S.TitleLink to={`/thread/${post_id}`}>
        <S.Title>{title}</S.Title>
      </S.TitleLink>
      <S.Content>{content}</S.Content>
      <S.PostInfo>
        <span>
          <FontAwesomeIcon icon={faHeart} />
          &nbsp;{like ? like : 0}
        </span>
        <span>
          <FontAwesomeIcon icon={faMessage} />
          &nbsp;{commentCnt}
        </span>
      </S.PostInfo>
    </S.Wrapper>
  );
};

export default memo(ThreadList);
