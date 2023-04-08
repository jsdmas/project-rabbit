# 목차

- 개요
- 사용기술들
- 기능 구현
- 제작 과정
- 문제 해결

- srcset

```html
<img srcset="images/photo_small.png 400w,
             images/photo_medium.png 700w,
             images/photo_large.png 1000w,
"/>
```

0 ~ 400 은 photo_small.png 사용, 401 ~ 700 은 photo_medium 사용, 701이상은 large 사용  

mobile first 개발
# 해야할일

## 서버관련

1. favicon 설정

## react

1. 게시글 CRUD
   - 댓글, 답글
     -  수정,삭제 기능추가하기
  - 게시글
    - 수정, 삭제 기능추가하기
  - 익명 유저의 경우 댓글이나 게시글 삭제가 다른 모든 사람도 가능하게 만들기
2. 로그인 기능 (자체 회원가입, 네이버, 카카오)
   - 로그인 유저 session 백엔드로 보내주기
   - 로그인 유저별 삭제/수정 기능 만들기
3. 회원 profile
4. atom selector, setter 사용해서 리팩토링

# react-query
1. staleTime : 데이터를 다시 요청하는 주기 
2. cacheTime : 캐싱 처리가 이루어지는 시간을 말합니다 (기본값 : 5분)

# react-query infinity 
처음에는 전역변수 offset을 변경하는 함수 setOffset을 다음 페이지를 호출하는 함수(getNextPageParam)에 넘겨주었습니다.
그러나 offset 값은 setOffset 함수를 호출하여 변경되기 전에 반환되므로 항상 동일한 값을 반환했습니다.   
이로 인해 동일한 페이지의 데이터가 계속 로드되었습니다.    

이 문제를 해결하기 위해 getNextPageParam 옵션에서 lastpage 인자를 사용하여 다음 페이지의 오프셋 값을 계산하고 반환하려 했습니다.

# react-query invalidateQueries
react-query의 invalidateQueries 메서드는 쿼리 데이터를 무효화하고 다시 가져오도록 지시하는 역할을 합니다.  
이 메서드는 즉시 새로운 데이터를 가져오지 않지만, 다음에 해당 쿼리가 실행될 때 서버에서 새로운 데이터를 가져옵니다.
invalidateQueries 메서드를 사용하는 이유는 캐시된 데이터가 최신 상태가 아닐 수 있기 때문입니다.  
예를 들어 mutate 함수가 호출되어 서버의 데이터가 변경되면, 이전에 캐시된 데이터는 더 이상 최신 상태가 아닙니다.  
따라서 invalidateQueries 메서드를 사용하여 캐시된 데이터를 무효화하고 다음에 해당 쿼리가 실행될 때 서버에서 새로운 데이터를 가져올 수 있습니다.
만약 invalidateQueries 메서드를 사용하지 않으면 이전에 캐시된 데이터가 계속 사용될 수 있습니다.   

- 추가사항 + 
  - queryClient 구조분해 사용시 제대로 캐싱되지 않았다는 오류가 나타납니다.
  - 이를 해결하기위해 구조분해하지않고 그냥 사용해봤는데 오류가 해결되었습니다.
  - 정확한 이유는 모르겠습니다. (gpt에 물어봐도 모른다고함)

# 좋아요버튼
좋아요 atom 다시 localstorage로 복구하기(새로고침하면 다시 좋아요 버튼 누를수있음..)

# 댓글창 관련

`답글` 버튼을 누르면 textArea로 focus가 가능하게 만들고 싶었는데 label을 사용하려 했으나 미뤘습니다.(머리아픔)  
useEffect와 useRef를 사용하면 마운트될때 focus를 줄 수 있을거 같으나 코드가 난잡해질거 같아서 보류  

