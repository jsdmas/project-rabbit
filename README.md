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

# 개발순서
favicon 설정
mobile first 개발

1. 게시글 CRUD
2. 로그인 기능 (자체 회원가입, 네이버, 카카오)
3. 회원별 게시글 삭제/수정 여부
4. 회원 profile
5. 댓글 기능

# react-query 이슈
1. staleTime : 데이터를 다시 요청하는 주기 
2. cacheTime : 캐싱 처리가 이루어지는 시간을 말합니다 (기본값 : 5분)
3. refetchInterval 사용시 브라우저가 계속 서버에 데이터를 요청해서 사용하지 않았습니다.
