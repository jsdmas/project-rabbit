import { faHeart, faMessage, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { ROUTER_PATH } from '@/constants/path';
import { THREADLIST_NAME } from '@/constants/ThreadList';
import { createdRefine } from '@/helper/createdRefine';

import { IThreadList } from '../../types/thread';
import * as S from './ThreadList.Style';

const ThreadList = (props: IThreadList) => {
  const { title, content, created, like, post_id, user_id, nickname, userimg, commentCnt } = props;
  const createdTime = createdRefine(created);

  return (
    <S.Wrapper>
      <S.UserInfo>
        <S.Col>
          {userimg ? <img alt={`${user_id}`} src={userimg} /> : <FontAwesomeIcon icon={faUser} />}
        </S.Col>
        <S.Col>
          {nickname ? (
            <Link to={`${ROUTER_PATH.USER}/${user_id}`}>{nickname}</Link>
          ) : (
            THREADLIST_NAME.ANONYMOUS
          )}
        </S.Col>
        <S.Col>{createdTime}</S.Col>
      </S.UserInfo>
      <S.TitleLink to={`${ROUTER_PATH.THREAD}/${post_id}`}>
        <S.Title>{title}</S.Title>
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
      </S.TitleLink>
    </S.Wrapper>
  );
};

export default ThreadList;
