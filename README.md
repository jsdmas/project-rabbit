# 아직 미완성입니다

# 주요기능

![](https://user-images.githubusercontent.com/105098581/230824846-92a0fbee-27bc-4230-bb5c-35b58b3a0db6.png)


![](https://user-images.githubusercontent.com/105098581/230824560-14425091-f4ad-4a8b-b51a-086a4e6c533f.gif)


# figma

[figma](https://www.figma.com/file/VdqnJ2uhOuZA9jhywhxCsX/Like-Reddit?node-id=8-70&t=WSYYUJuWCmMMVJgE-0)

# 해야할일

## 서버관련
1. favicon 설정

## react

1. 게시글 CRUD
   - 이미지 post 가능하게 하기 (로그인 구현 & 세션처리 하면서 같이 구현)
   - search 검색기록 만들기 (localstorage atom effect)
    
2. user 관련
   - 로그인 기능 (자체 회원가입, 네이버, 카카오)
   - 로그인 유저 session 처리
   - 로그인 유저별 삭제/수정 기능 만들기
   - 회원 profile
   - 유저 회원 탈퇴시 3일뒤 계정 삭제하는 로직 만들기

3. 개선
   - 404처리 페이지 & middleware 설정
   - 디자인 개선 
   - 반응형 디자인 
   - meta 파일 적용 (react Helmet)


swal usecallback 묶기
프론트로 보내줄거 : 로그인 여부, user_id
백엔드로 수정, 삭제시 비교할거 : 게시글, 게시물 user_id & 로그인중인 client의 user_id
