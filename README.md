# Rabbit

<img width="328" alt="logo_light" src="https://user-images.githubusercontent.com/105098581/235834084-71f07345-3396-445c-82ab-7c9f88ce0f5e.png">

> AWS DB, 웹 애플리케이션 배포까지 하며 기본적인 웹 아키텍처 이해도가 높아졌습니다.
> 댓글 & 게시글 CRUD, 유저 프로필 사진, 소개글 변경, 비밀번호 변경 등의 기능을 구현하였습니다.
> REST 아키텍처 스타일을 준수하며 설계하였고 passport 라이브러리를 사용하여 로그인 전략을 구현하며 OAuth 개념을 익혔습니다.

> 배포의경우 AWS 비용문제로 서버를 중단하게 되었습니다.

| 소개 | 글을 올리고 자신만의 프로필을 만들 수 있는 SNS 사이트 입니다. |
| --- | --- |
| 기간 | 1차 완성 : 23.03.29 ~ 23.05.03 / 리팩토링 : 23.07.08 ~ 진행중 |
| 인원 | 개인 프로젝트 |

|![](https://file.notion.so/f/s/77bd244e-046e-489f-bd9d-5dcda8d2daea/Untitled.png?id=88940a51-881f-403a-bd13-3bbdd1040c23&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691532000000&signature=fWjSw_PuyLlXJW2dxQ90_yNtOWCGdeovr_wpyiDnVgM&downloadName=Untitled.png)|![](https://file.notion.so/f/s/b01571ba-09d9-4f90-b495-a521ad604314/Untitled.png?id=b0c8452e-b35e-4314-b081-8da633a72d4b&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691532000000&signature=xhiAxlasuDRdc8PuFUdl7p1x_g6CLvNz0jh0AgZIGao&downloadName=Untitled.png)|
|![](https://file.notion.so/f/s/d9bd9eaa-a5bd-4cd4-81d1-81ed388b1f11/Untitled.png?id=b7ab07d6-ab19-40c5-9895-193f05016ece&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691532000000&signature=ZV3DyNKvGvTzxgnqIglMQqEcjM9NZdpYX1mOEBuNGCU&downloadName=Untitled.png)|![](https://file.notion.so/f/s/0df7dfbb-3b9f-4239-9d56-40f3cf403afe/Untitled.png?id=09916a23-4427-468d-ac8e-237df4b8d705&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691532000000&signature=hVEjujjiO_QKCbc7WdOxlvKoY0NTaFRUxVVTH2j9JA8&downloadName=Untitled.png)|

### 💾 **기술 스택**

- Style : `Styled-Components`
- state management : `Recoil`
- asynchronous state management ****:**** `React-Query`
- Language : `TypeScript`
- Interface : `React.js`
- DB : `AWS RDS`
- DBMS : `MYSQL`

### 📈Development Period

- 2023.03.29 ~ 2023.05.03
- refactor : 2023.07.08 ~


# 🌟 기능

스타일 리펙토링 전 사진 입니다.
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
