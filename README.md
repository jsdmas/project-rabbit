# Rabbit
<img width="328" alt="logo_light" src="https://user-images.githubusercontent.com/105098581/235834084-71f07345-3396-445c-82ab-7c9f88ce0f5e.png">  

- 글을 올리고 자신만의 프로필을 만들 수 있는 SNS 사이트 입니다.   
- 로그인 하지 않고도 글 작성이 가능합니다.  
- 트위터, reddit 같은 SNS를 참고하여 만들었습니다.

## 💫 서비스 주소
https://sdmas-rabbit.fly.dev

### test 계정
| email                 | passWord  |
| --------------------- | --------- |
| testemail01@naver.com | 1q2w3e4r! |
| testemail01@test.com  | 123qwe!   |

# 🌟 기능

| 게시글 무한 스크롤                                                                                                     | 게시글 최신순 정렬                                                                                                    |
| ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| ![](https://user-images.githubusercontent.com/105098581/235679195-eb821f04-584a-43e4-bfd4-cb6e3acbba3b.gif)            | ![](https://user-images.githubusercontent.com/105098581/235680606-346e4323-09f9-4d93-8e81-9758c14ac812.gif)           |
| 게시글 좋아요순 정렬                                                                                                   | 게시글 생성                                                                                                           |
| ![](https://user-images.githubusercontent.com/105098581/235828578-b4d8d3a5-cbc3-45c7-ada8-82a0ad89c227.gif)            | ![게시글생성](https://user-images.githubusercontent.com/105098581/235828838-9faba980-bb3d-4d79-983d-3d898049e203.gif) |
| 게시글 수정                                                                                                            | 게시글 삭제                                                                                                           |
| ![게시글수정](https://user-images.githubusercontent.com/105098581/235828988-efd13fb8-3345-4e91-8df0-1ab828da4ecf.gif)  | ![삭제](https://user-images.githubusercontent.com/105098581/235829138-0f07fd3a-da4d-4081-80bf-d87be5ebfb8c.gif)       |
| 댓글&답글 생성                                                                                                         | 댓글&답글 수정                                                                                                        |
| ![댓글,답글-1](https://user-images.githubusercontent.com/105098581/235829335-86f762fe-3971-414a-a962-4e1ee663c6b3.gif) | ![댓글수정-1](https://user-images.githubusercontent.com/105098581/235829643-bdb6b4aa-cb1c-4b78-a869-fb870a82adb4.gif) |
| 댓글&답글 삭제                                                                                                         | 게시글&댓글 좋아요                                                                                                    |
| ![](https://user-images.githubusercontent.com/105098581/235829787-878a81f6-8ad5-4e7f-a63c-465923f24089.gif)            | ![](https://user-images.githubusercontent.com/105098581/235829948-3f0d3df1-b645-47c5-8fff-83a28c618ce3.gif)           |
| 로그인(local)                                                                                                          | 로그인(kakao)                                                                                                         |
| ![local-1](https://user-images.githubusercontent.com/105098581/235830903-594aa54e-8abf-4d6f-a811-e1297561781d.gif)     | ![kakao-1](https://user-images.githubusercontent.com/105098581/235830898-c1d77bd3-fb96-436c-b7d2-73c3b30e7fcd.gif)    |
| 회원가입                                                                                                               | 비밀번호 변경                                                                                                         |
| ![](https://user-images.githubusercontent.com/105098581/235831488-91133916-1b69-4983-82ed-260de9971d02.gif)            | ![pass](https://user-images.githubusercontent.com/105098581/235831633-79badfc7-f23b-48f9-90c9-df8db940efaf.gif)       |
| 프로필 수정                                                                                                            | 게시글 검색                                                                                                           |
| ![pi-1](https://user-images.githubusercontent.com/105098581/235831772-3578b9b3-ff58-4b52-b923-43e681dc89df.gif)        | ![검색](https://user-images.githubusercontent.com/105098581/235831928-76dd9b9d-eda4-4a0b-b224-c7fc2fca091a.gif)       |
| 다크모드                                                                                                               |                                                                                                                       |
| ![](https://user-images.githubusercontent.com/105098581/235830126-7892efb7-62a6-4d56-9a3b-017660a8d663.gif)            |
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

### 📊 기능 정리 
pdf 다운로드 : 
