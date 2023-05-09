# Rabbit
<center>

<img width="328" alt="logo_light" src="https://user-images.githubusercontent.com/105098581/235834084-71f07345-3396-445c-82ab-7c9f88ce0f5e.png">  

글을 올리고 자신만의 프로필을 만들 수 있는 SNS 사이트 입니다.   
로그인 하지 않고도 글 작성이 가능합니다.  
트위터, reddit 같은 SNS를 참고하여 만들었습니다.

## 💫 서비스 주소 (23.05.09 - aws 서버 중단)
https://sdmas-rabbit.fly.dev 
 

### test 계정
| email                 | passWord  |
| --------------------- | --------- |
| testemail01@naver.com | 1q2w3e4r! |
| testemail01@test.com  | 123qwe!   |

</center>

# 🌟 기능

|                                                   게시글 무한 스크롤                                                   |                                                  게시글 최신순 정렬                                                   |
| :--------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
|      ![](https://user-images.githubusercontent.com/105098581/235679195-eb821f04-584a-43e4-bfd4-cb6e3acbba3b.gif)       |      ![](https://user-images.githubusercontent.com/105098581/235680606-346e4323-09f9-4d93-8e81-9758c14ac812.gif)      |
|                                                  게시글 좋아요순 정렬                                                  |                                                      게시글 생성                                                      |
|      ![](https://user-images.githubusercontent.com/105098581/235828578-b4d8d3a5-cbc3-45c7-ada8-82a0ad89c227.gif)       | ![게시글생성](https://user-images.githubusercontent.com/105098581/235828838-9faba980-bb3d-4d79-983d-3d898049e203.gif) |
|                                                      게시글 수정                                                       |                                                      게시글 삭제                                                      |
| ![게시글수정](https://user-images.githubusercontent.com/105098581/235828988-efd13fb8-3345-4e91-8df0-1ab828da4ecf.gif)  |    ![삭제](https://user-images.githubusercontent.com/105098581/235829138-0f07fd3a-da4d-4081-80bf-d87be5ebfb8c.gif)    |
|                                                     댓글&답글 생성                                                     |                                                    댓글&답글 수정                                                     |
| ![댓글,답글-1](https://user-images.githubusercontent.com/105098581/235829335-86f762fe-3971-414a-a962-4e1ee663c6b3.gif) | ![댓글수정-1](https://user-images.githubusercontent.com/105098581/235829643-bdb6b4aa-cb1c-4b78-a869-fb870a82adb4.gif) |
|                                                     댓글&답글 삭제                                                     |                                                  게시글&댓글 좋아요                                                   |
|      ![](https://user-images.githubusercontent.com/105098581/235829787-878a81f6-8ad5-4e7f-a63c-465923f24089.gif)       |      ![](https://user-images.githubusercontent.com/105098581/235829948-3f0d3df1-b645-47c5-8fff-83a28c618ce3.gif)      |
|                                                     로그인(local)                                                      |                                                     로그인(kakao)                                                     |
|   ![local-1](https://user-images.githubusercontent.com/105098581/235830903-594aa54e-8abf-4d6f-a811-e1297561781d.gif)   |  ![kakao-1](https://user-images.githubusercontent.com/105098581/235830898-c1d77bd3-fb96-436c-b7d2-73c3b30e7fcd.gif)   |
|                                                        회원가입                                                        |                                                     비밀번호 변경                                                     |
|      ![](https://user-images.githubusercontent.com/105098581/235831488-91133916-1b69-4983-82ed-260de9971d02.gif)       |    ![pass](https://user-images.githubusercontent.com/105098581/235831633-79badfc7-f23b-48f9-90c9-df8db940efaf.gif)    |
|                                                      프로필 수정                                                       |                                                      게시글 검색                                                      |
|    ![pi-1](https://user-images.githubusercontent.com/105098581/235831772-3578b9b3-ff58-4b52-b923-43e681dc89df.gif)     |    ![검색](https://user-images.githubusercontent.com/105098581/235831928-76dd9b9d-eda4-4a0b-b224-c7fc2fca091a.gif)    |
|                                                        다크모드                                                        |                                                                                                                       |
|      ![](https://user-images.githubusercontent.com/105098581/235830126-7892efb7-62a6-4d56-9a3b-017660a8d663.gif)       |
|                                                                                                                        |


# 🛠️ Skills

### 📄 Front-end

- `Language` : TypeScript  
- `Framework` : React  
- `State management` : recoil  
- `Style` : styled-component  
### 💾 Back-end

- `Language` : javaScript
- `Framework` : express
- `DBMS` : MySQL
### 🔋Server

- AWS RDS
# 프로젝트 구조
Font-end
```
📦src
 ┣ 📂api
 ┣ 📂assets // logo img file
 ┣ 📂components
 ┣ 📂helper
 ┣ 📂hooks
 ┣ 📂routes
 ┣ 📂styles // 컬러 설정 & 반응형 설정
 ┣ 📂types 
 ┣ App.tsx
 ┣ atoms.ts // state 관리
 ┣ index.tsx
 ┣ Meta.tsx // 페이지 정보
 ┗ Router.tsx // react 라우팅 설정
```
Back-end
```
📦server
 ┣ 📂controllers
 ┣ 📂helper
 ┣ 📂mappers // mybatis를 활용한 SQL문 모음
 ┣ 📂routers // api 라우터 설정
 ┣ 📂services // controller에 적용시키는 기능들
 ┣ middlewares.js
 ┗ server.js
```
### ⚙️ Server ERD
<img width="483" alt="erd" src="https://user-images.githubusercontent.com/105098581/235833047-e14042ef-9a56-45ec-abb9-5dfa59d8e901.png">


### 📈Development Period

2023.03.29 ~ 2023.05.03

### 🖼️ 목업

| [![My Skills](https://skillicons.dev/icons?i=figma&theme=light)](https://skillicons.dev) | [figma-rabbit](https://www.figma.com/file/VdqnJ2uhOuZA9jhywhxCsX/Like-Reddit?node-id=8-70&t=WSYYUJuWCmMMVJgE-0) |
| ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |

### Commit message 
| fix  | 기능에 대한 버그 수정 |
| ---- | --------------------- |
| test | 테스트 코드 추가/수정 |
| fin  | 기능 구현 완료        |
### 개발 환경
|                                    vscode                                     |                                                                   pretter                                                                    |                                                                   eslint                                                                   |
| :---------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------: |
| [![My Skills](https://skillicons.dev/icons?i=vscode)](https://skillicons.dev) | <img width="50" alt="prettier" src="https://user-images.githubusercontent.com/105098581/235866550-a35ae665-c5d0-4357-8040-93c12f791f50.png"> | <img width="50" alt="eslint" src="https://user-images.githubusercontent.com/105098581/235866608-b6ef0c39-f2e1-4406-bf24-919441bde36c.png"> |


# 📊 개발 내용

### React
개발자 생태계가 크기 때문에 에러에 대처하기가 비교적 쉽고, 라이브러리가 많아 개발에 용이할 것이라 생각했습니다.  
  
Virtual DOM을 이용해 브라우저 렌더링 횟수를 줄여주고, 컴포넌트 단위로 코드를 나누어 재사용할 수 있기 때문에, 유지보수를 하기에도 좋다고 판단하여 사용하였습니다.
### typescript

javaScript는 런타임에서 변수의 타입이 결정되기 때문에 실행 시점이 되어야 에러를 파악할 수 있지만,  
  
타입스크립트는 코드 작성 시점에 타입 에러를 발견할 수 있습니다.  
  
매번 타입을 결정해야 하기 때문에 번거롭고 코드양이 증가하는 단점도 있지만,  
  
에러를 미리 발견할 수 있고, 무엇보다 자동 완성이 된다는 면에서 도입을 결정하였습니다.  

### 전역 변수 관리, 서버 통신 로직 분리

개발 중 routes 담당 page에서 상태관리, 서버 통신 로직이 중구난방으로 섞여있어
유지보수가 힘들어지고 가독성이 떨어지는 상황이 발생하였습니다.  
  
그래서 상태 관리 라이브러리인 **recoil**과 값을 쉽게 가져오고 캐싱, 업데이트, 에러핸들링 등 비동기 과정을 수월하게 해주는 **react-query**를 사용하였습니다.  
  
그 결과, 기존 로직들을 분리해 가독성 향상및 유지보수 과정이 수월하게 되었습니다.

### custom Hook

page나 component에서 에러처리를 할떄, 그리고 로그인 여부를 확인할 떄 반복되는 코드가 발견되었습니다.  
  
그래서 hook으로 만들어서 범용적으로 사용할 수 있게 개발하였습니다.  

### react-hook-form

기존 회원가입이나 비밀번호 변경 등 form register를 구현할떄마다 usestate를 사용해  
  
error, 상태값, 조건, 서버 통신값 관리 등 코드가 길어져 가독성및 유지보수가 떨어지는 상황이 발생했습니다.  
  
해결 방법으로 **react-hook-form**을 사용하여 가독성을 높이고 유지보수를 높였습니다.  

### 무한스크롤
무한 스크롤 구현 방법은 크게 3가지로 나눌 수 있었습니다. scroll event, IntersectionObserver API, react-query : useInfiniteQuery  

이번 프로젝트에서는 무한스크롤을 쉽게 구현해주는 useInfiniteQuery를 사용하였고 이유는 다음과 같습니다.  
  
- 데이터 페칭
- 캐싱 처리, 로딩 및 오류 상태 관리
- 리액트 쿼리 개발자 도구 지원 (추적 용이)
- 프리패칭(Prefetching) : 다음 페이지 데이터를 미리 가져와서, 다음 페이지로 넘어갈 때 미리 데이터를 가져왔기 때문에 매끄럽게 처리 되는 기능.
- 가비지 컬렉션

다음 데이터가 호출될 타이밍은 IntersectionObserver 를 통해 구현하였습니다.  
  
또한, 호출되는 타이밍을 조절하여 과부하를 막기위해 **throttle** 를 사용하였습니다.
