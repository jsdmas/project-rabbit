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
   - search 검색기록 만들기 (localstorage)
   - 커스텀 훅으로 중복코드 정리
    
2. user 관련
   - 로그인 기능 (자체 회원가입, 네이버, 카카오)
     - 조건 검사 (id, 이메일 중복검사)
     - 패스워드 해싱
     - status code 400 으로 인증 실패시 신호 보내기
   - 로그인 유저 session 백엔드로 보내주기
   - 로그인 유저별 삭제/수정 기능 만들기
   - 회원 profile

3. 개선
   - 404처리 페이지 & middleware 설정
   - 디자인 개선 
   - 반응형 디자인 


<select id="getThreads">
   SELECT p.*, u.nickname, u.img_url AS userimg , COUNT(c.comment_id) AS commentCnt
   FROM post p
   LEFT OUTER JOIN user u ON p.user_id = u.user_id
   LEFT OUTER JOIN comment c ON p.post_id = c.post_id
   GROUP BY p.post_id, p.title, p.content, p.created, p.img_name, p.img_url, p.like, p.modified, p.user_id, u.nickname, u.img_url
   ORDER BY ${orderCommend} ${orderby}
      <if test="offset >= 0">
         LIMIT 4 OFFSET ${offset}
      </if>
</select>


<select id="selectCountAll">
   SELECT COUNT(*) AS postCount FROM post
      <if test="searchKeyword != null and searchKeyword != ''">
         <if test="keywordoption == 'title'">
         WHERE post.title LIKE CONCAT('%', #{searchKeyword}, '%')
         </if>
         <if test="keywordoption == 'user'">
         WHERE user.nickname LIKE CONCAT('%', #{searchKeyword}, '%')
         </if>
         <if test="keywordoption == 'content'">
         WHERE post.content LIKE CONCAT('%', #{searchKeyword}, '%')
         </if>
      </if>
</select>