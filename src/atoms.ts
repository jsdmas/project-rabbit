import { atom } from 'recoil';

export enum OrderCommends {
  'p.created' = 'p.created',
  'p.like' = 'p.like',
}

export enum OrderBy {
  'DESC' = 'DESC',
  'ASC' = 'ASC',
}

export enum SearchOption {
  'Thread' = 'content',
  'User' = 'user',
  'Title' = 'title',
  'none' = 'none',
}

// 정렬 종류(좋아요, 시간)
export const orderCommendState = atom<OrderCommends>({
  key: 'orderCommend',
  default: OrderCommends['p.created'],
});

// 오름차순, 내림차순
export const orderbyState = atom<OrderBy>({
  key: 'orderby',
  default: OrderBy.DESC,
});

// 다크모드
export const darkState = atom({
  key: 'isdark',
  default: false,
});

// 답글 구분
export const replyState = atom<number | null>({
  key: 'reply',
  default: null,
});

// 검색 종류 (유저, 제목, 게시글)
export const keywordOptionState = atom<SearchOption>({
  key: 'keywordOption',
  default: SearchOption.none,
});

// 검색 단어
export const searchKeywordState = atom<null | string>({
  key: 'searchKeyword',
  default: null,
});

// 에러 메세지(home에 표사되는검색 결과)
export const errorMessageState = atom({
  key: 'errorMessageState',
  default: '',
});

export const searchHistoryState = atom<string[]>({
  key: 'searchHistory',
  default: [],
  effects_UNSTABLE: [
    // onSet : 값이 변경될때마다 실행되는 함수,
    // setSelf : atom 값을 변경하는 함수
    ({ onSet, setSelf }) => {
      // 새로고침 시 로컬 스토리지에서 값을 불러옴
      const savedValue = localStorage.getItem('searchHistory');

      // 만약 저장된 값이 존재한다면
      if (savedValue != null) {
        // json으로 변환하여 가져온다
        setSelf(JSON.parse(savedValue));
      }

      // 값이 변경될 때마다 로컬 스토리지에 저장
      onSet((newValue) => {
        localStorage.setItem('searchHistory', JSON.stringify(newValue));
      });
    },
  ],
});
