# Rabbit

<img width="328" alt="logo_light" src="https://user-images.githubusercontent.com/105098581/235834084-71f07345-3396-445c-82ab-7c9f88ce0f5e.png">

> - AWS DB, 웹 애플리케이션 배포까지 하며 기본적인 웹 아키텍처 이해도가 높아졌습니다.
> - 댓글 & 게시글 CRUD, 유저 프로필 사진, 소개글 변경, 비밀번호 변경 등의 기능을 구현하였습니다.
> - REST 아키텍처 스타일을 준수하며 설계하였고 passport 라이브러리를 사용하여 로그인 전략을 구현하며 OAuth 개념을 익혔습니다.

> 배포의경우 AWS 비용문제로 서버를 중단하게 되었습니다.

| 소개 | 글을 올리고 자신만의 프로필을 만들 수 있는 SNS 사이트 입니다. |
| ---- | ------------------------------------------------------------- |
| 기간 | 1차 완성 : 23.03.29 ~ 23.05.03 / 리팩토링 : 23.07.08 ~ 진행중 |
| 인원 | 개인 프로젝트                                                 |

| ![](https://file.notion.so/f/s/77bd244e-046e-489f-bd9d-5dcda8d2daea/Untitled.png?id=88940a51-881f-403a-bd13-3bbdd1040c23&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691532000000&signature=fWjSw_PuyLlXJW2dxQ90_yNtOWCGdeovr_wpyiDnVgM&downloadName=Untitled.png) | ![](https://file.notion.so/f/s/b01571ba-09d9-4f90-b495-a521ad604314/Untitled.png?id=b0c8452e-b35e-4314-b081-8da633a72d4b&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691532000000&signature=xhiAxlasuDRdc8PuFUdl7p1x_g6CLvNz0jh0AgZIGao&downloadName=Untitled.png) |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ![](https://file.notion.so/f/s/d9bd9eaa-a5bd-4cd4-81d1-81ed388b1f11/Untitled.png?id=b7ab07d6-ab19-40c5-9895-193f05016ece&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691532000000&signature=ZV3DyNKvGvTzxgnqIglMQqEcjM9NZdpYX1mOEBuNGCU&downloadName=Untitled.png) | ![](https://file.notion.so/f/s/0df7dfbb-3b9f-4239-9d56-40f3cf403afe/Untitled.png?id=09916a23-4427-468d-ac8e-237df4b8d705&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691532000000&signature=hVEjujjiO_QKCbc7WdOxlvKoY0NTaFRUxVVTH2j9JA8&downloadName=Untitled.png) |

### 💾 **기술 스택**

- Style : `Styled-Components`
- state management : `Recoil`
- asynchronous state management \***\*:\*\*** `React-Query`
- Language : `TypeScript`
- Interface : `React.js`
- DB : `AWS RDS`
- DBMS : `MYSQL`

### 📈Development Period

- 2023.03.29 ~ 2023.05.03
- refactor : 2023.07.08 ~

### **💻 핵심 구현 기능**

- 초기 로딩속도 개선

  - 실제 사이트 앱 배포 후 초기 로딩 속도가 느려지는 현상을 최적화 하였습니다.

  javaScript 파일의 크기 떄문에 다운로드하는 데 시간이 오래 걸리고, 이로 인해 **초기 로딩속도가 느려지는 문제가 발생**했습니다.

  이를 해결하기 위해 **React.lazy**를 적용하여 코드를 분할해 동적으로 컴포넌트를 로드하고 **webpack-bundle-analyzer** 패키지를 사용하여 용량이 큰 파일, 라이브러리를 파악하고 제거하여 초기 로딩 시간을 개선하였습니다.  
  이러한 변경으로 인해 **리소스 크기는 204kB 차이**가 나며, 실행 시 앱의 **렌더링 속도가 0.76초 빨라졌습니다**.

  **Code Splitting 전**
  ![](https://file.notion.so/f/s/32249e34-4935-4968-8375-69ca7e51d5b2/Untitled.png?id=a8de9186-ef46-4421-8a5c-710f8625d555&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691539200000&signature=4pxxOYtufpiGSyhdazH3EIl2jugC1UQmeG2UugZa4_g&downloadName=Untitled.png)
  ![](https://file.notion.so/f/s/ba35e552-64e4-43de-b6dd-4ba80e5cfc86/Untitled.png?id=a173cd7c-3466-47a9-9653-97f5f01f5b20&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691539200000&signature=j2Yhz6R_xT_1iJwa1dHVsN_EJbc9wC35NFs6UmXlC-M&downloadName=Untitled.png)
  ![](https://file.notion.so/f/s/60158ceb-c63c-4f17-8a9f-e8f675dc7d4a/Untitled.png?id=06a88f6e-185b-4709-9ad2-b80be3ff4d23&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691539200000&signature=fk1eLduW0B4sG3RqKGUmA-2kITrUjP3R_jm0Z-zV2Ss&downloadName=Untitled.png)

  **Code Splitting 후**
  ![](https://file.notion.so/f/s/ce5f7240-563c-4ea4-8d27-4312868d6b23/Untitled.png?id=3b276eb9-5aac-4874-8b38-53f4989b27c0&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691539200000&signature=PEk9Ysr8VkxhsmqpxStxd0Nq1WQ6haOfeimMnfW_72A&downloadName=Untitled.png)
  ![](https://file.notion.so/f/s/089b6701-4deb-4e24-af0c-f238f8c09c6f/Untitled.png?id=87212d55-fbcc-4914-862e-8aabfca0930b&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691539200000&signature=XIBfj9U5JbaBqpEEz7TVWxi2mMHZhj6BDEeJWw6uYuo&downloadName=Untitled.png)
  ![](https://file.notion.so/f/s/1fe352a5-8c13-4900-b43f-2ee624e64f9b/Untitled.png?id=5ce59b54-728b-4635-8c3d-04c81358752b&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691539200000&signature=18ZzWvO38QJOGO3yqHcwBnSfpwKd2RDleeyTrHyM9-w&downloadName=Untitled.png)

- 스크롤 최적화

  스크롤을 빠르게 내리면 많은 요청이 동시에 발생하여 서버로부터 데이터를 받기 위한 네트워크 대기 시간이 증가했습니다.

  이를 해결하기 위해 **Throttle**기능을 구현하여 일정 시간 동안 여러 번의 요청이 들어와도 가장 마지막으로 들어온 요청만 처리하도록 하였고 비동기로 실행되는 **Intersection Observer API**를 사용하여 부하를 줄였습니다.

  또한, 이전의 게시글목록을 저장하기 위해 React-Query 라이브러리를 사용하여 **Cache처리**하여 네트워크 비용을 감소시켰습니다.

  **throttle 적용 무한스크롤**

  ![](https://file.notion.so/f/s/c12a0e71-d142-4d63-8987-62afab768a85/Untitled.gif?id=4f3311b8-9a76-4111-8731-409c04d2d76e&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691539200000&signature=QDi0-Grbbvis6_tyJth9kRR3N0aQ5wYZTFgCBXy6suw&downloadName=Untitled.gif)

  **Cache된 무한스크롤 게시글 목록 데이터**
  ![](https://file.notion.so/f/s/e238710b-15a1-45e6-a5bc-8d0a1ff65b50/Untitled.png?id=c6dcd086-5761-4cce-a017-986a4e09cad6&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691539200000&signature=9POIJRMVbmWcncC14qjSVDCs0ChCynu-ZkXTC2Slh_M&downloadName=Untitled.png)

- 페이지 데이터 변경
  댓글이나 좋아요같은 변경사항이 일어난 경우 React-Query의 **useMutation**을 사용해 성공, 실패시 ajax요청을 처리해주고 해당 페이지의 **queryKey의 유효성을 제거**해주며 **서버에 새롭게 데이터를 요청**하도록 구현하였습니다.
  이를 통해 **데이터 관리 및 상태 업데이트, 유효성 관리 에 대한 지식이 향상**되었습니다.  
  ![](https://file.notion.so/f/s/2e6211b1-fc79-40d1-a7e7-02fa950abe77/Untitled.gif?id=6ddd8df4-3023-4e44-8596-8a5b29606a7d&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691539200000&signature=cORNvgi3kjGuyLjImVEh12IkUsW5cV-9Vnz3vhab9AU&downloadName=Untitled.gif)
- page별 cache 적용
  페이지 재방문시 서버에서 다시 데이터를 가져오는 것은 불필요한 비용을 발생시키고 페이지 이동이 매끄럽지 못해 사용자 경험을 저해한다 생각했습니다.  
  이를위해 React-Query 라이브러리를 이용하여 페이지별로 Cache기능을 구현하여 네트워크 비용을 감소시켰습니다.

  > **queriesMap** 이라는 프로퍼티로 요청결과를 캐싱하여 저장하고 있습니다.

  ![](https://file.notion.so/f/s/d5e23e3f-7225-453c-aa14-eeecf73a42eb/Untitled.png?id=91fcc9a7-d58e-4cc0-80bf-0a0a6123de5a&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691539200000&signature=s3HcmSmtsTsxZK5t1VzuVdo8d75JoA0jEbPefM7Fl1k&downloadName=Untitled.png)

- 사용자 경험

  - 회원가입시 서버에서 **이미 사용중인 이메일이 존재**할 경우 사용자에게 알려주도록 구현했습니다.

  - 비밀번호 변경 시 서버에서 **기존 비밀번호와 같다면** 사용자에게 알려주도록 구현했습니다.

  - 사진 용량을 10KB로 제한하여 **용량 초과시 메세지**를 보여주도록 구현했습니다.

  에러메시지의 경우 서버에서 보내준 메시지를 사용자에게 보내주도록 구현했습니다.

  **사진용량 초과 메시지**

  ![](https://file.notion.so/f/s/f4acb025-07d5-45fd-bb08-4886877f167c/Untitled.gif?id=d605a890-78fb-45f3-ae36-6a4ed37f759d&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691539200000&signature=CrZXe5GAjU8R5jcPqUA4V9qTy-ODgA3vJso0sR4r-vE&downloadName=Untitled.gif)

  **비밀번호 변경 메시지**

  ![](https://file.notion.so/f/s/22c1d593-31ee-4af3-a021-27f6996057d6/Untitled.gif?id=bd61524d-501e-4207-9a73-ed93c07e602d&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691539200000&signature=o3wmoUWT6qkBs2kSaAU4zmZrDQL4Lg7pWaIsM5WHKbE&downloadName=Untitled.gif)

- 검색엔진 최적화
  React-Helmet 라이브러리를 사용하여 각 페이지마다 메타데이터를 설정하여 **SEO를 최적화** 하였습니다.  
  ![](https://file.notion.so/f/s/28fad2a2-d953-4612-a41c-b70815a60828/Untitled.png?id=93a1e655-e68e-4310-8b1d-f034555ca48d&table=block&spaceId=4ad879ee-8801-419a-8198-54a28ce85176&expirationTimestamp=1691539200000&signature=B_FFceWQ97zlILWn366ol3d8uwoQhavWP9AtKAmNurs&downloadName=Untitled.png)

### ‼️ **깨달은 점**

- React-Query를 사용하며 **데이터 관리 및 상태 업데이트**에 대한 경험과 지식 상승
- **로그인 여부**에 따라 **라우팅을 제어**하거나 **요청을 제한**하는 경험을 통해 **보안 지식 및 사용자 경험 향상**
- 검색창을 구현하고 데이터를 정렬하는 경험을 통해 **데이터 핸들링 능력 향상**
- DB에 저장할 데이터의 유효성을 검사하며 **백엔드 협업 지식, 예외처리, 에러핸들링 능력 향상**
- password를 DB에 **해싱** 하여 저장하는 경험을 통해 **사용자 보안 지식 향상**
- SQL문을 직접 작성해보며 프론트, 백엔드간의 **데이터 흐름을 이해**하고 **알맞은 Status Code**를 사용해 응답 하며 **REST 설계에 대한 경험**

### 📦 api 명세서

| API                             | URL                            | Method |
| ------------------------------- | ------------------------------ | ------ |
| 글목록 가져오기                 | /api/threads                   | GET    |
| 글쓰기                          | /api/write                     | POST   |
| 회원가입                        | /api/join                      | POST   |
| 로그아웃                        | /api/logout                    | POST   |
| 사용자 프로필정보 가져오기      | /api/profile/:loginUserId      | GET    |
| 사용자의 프로필 소개글 업데이트 | /api/profile/:loginUserId      | PATCH  |
| 사용자 계정을 삭제              | /api/profile/:loginUserId      | DELETE |
| 비밀번호 변경                   | /api/change-password           | PATCH  |
| 사용자의 프로필 사진을 변경     | /api/change-photo              | PATCH  |
| 게시글 조회                     | /api/thread/:threadid          | GET    |
| 게시글 수정                     | /api/thread/:threadid          | PATCH  |
| 게시글 삭제                     | /api/thread/:threadid          | DELETE |
| 게시글 좋아요                   | /api/thread/:threadid/like     | PATCH  |
| 게시글 내용 조회                | /api/thread/:threadid/mainText | GET    |
| 댓글 수정                       | /api/thread/comment            | PATCH  |
| 댓글 삭제                       | /api/thread/comment            | DELETE |
| 댓글 좋아요                     | /api/thread/comment-like       | PATCH  |
| 댓글 생성                       | /api/thread/:threadid/comment  | POST   |
| 로그인                          | /api/auth/login                | POST   |
| 로그인 여부 확인                | /api/auth/check-login-status   | GET    |
| 네이버 로그인                   | /api/auth/naver                | GET    |
| 네이버 로그인 콜백              | /api/auth/naver/callback       | GET    |
| 카카오 로그인                   | /api/auth/kakao                | GET    |
| 카카오 로그인 콜백              | /api/auth/kakao/callback       | GET    |

# 🌟 기능

스타일 리펙토링 전 사진 입니다.
| 게시글 무한 스크롤 | 게시글 최신순 정렬 |
| :--------------------------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------: |
| ![](https://user-images.githubusercontent.com/105098581/235679195-eb821f04-584a-43e4-bfd4-cb6e3acbba3b.gif) | ![](https://user-images.githubusercontent.com/105098581/235680606-346e4323-09f9-4d93-8e81-9758c14ac812.gif) |
| 게시글 좋아요순 정렬 | 게시글 생성 |
| ![](https://user-images.githubusercontent.com/105098581/235828578-b4d8d3a5-cbc3-45c7-ada8-82a0ad89c227.gif) | ![게시글생성](https://user-images.githubusercontent.com/105098581/235828838-9faba980-bb3d-4d79-983d-3d898049e203.gif) |
| 게시글 수정 | 게시글 삭제 |
| ![게시글수정](https://user-images.githubusercontent.com/105098581/235828988-efd13fb8-3345-4e91-8df0-1ab828da4ecf.gif) | ![삭제](https://user-images.githubusercontent.com/105098581/235829138-0f07fd3a-da4d-4081-80bf-d87be5ebfb8c.gif) |
| 댓글&답글 생성 | 댓글&답글 수정 |
| ![댓글,답글-1](https://user-images.githubusercontent.com/105098581/235829335-86f762fe-3971-414a-a962-4e1ee663c6b3.gif) | ![댓글수정-1](https://user-images.githubusercontent.com/105098581/235829643-bdb6b4aa-cb1c-4b78-a869-fb870a82adb4.gif) |
| 댓글&답글 삭제 | 게시글&댓글 좋아요 |
| ![](https://user-images.githubusercontent.com/105098581/235829787-878a81f6-8ad5-4e7f-a63c-465923f24089.gif) | ![](https://user-images.githubusercontent.com/105098581/235829948-3f0d3df1-b645-47c5-8fff-83a28c618ce3.gif) |
| 로그인(local) | 로그인(kakao) |
| ![local-1](https://user-images.githubusercontent.com/105098581/235830903-594aa54e-8abf-4d6f-a811-e1297561781d.gif) | ![kakao-1](https://user-images.githubusercontent.com/105098581/235830898-c1d77bd3-fb96-436c-b7d2-73c3b30e7fcd.gif) |
| 회원가입 | 비밀번호 변경 |
| ![](https://user-images.githubusercontent.com/105098581/235831488-91133916-1b69-4983-82ed-260de9971d02.gif) | ![pass](https://user-images.githubusercontent.com/105098581/235831633-79badfc7-f23b-48f9-90c9-df8db940efaf.gif) |
| 프로필 수정 | 게시글 검색 |
| ![pi-1](https://user-images.githubusercontent.com/105098581/235831772-3578b9b3-ff58-4b52-b923-43e681dc89df.gif) | ![검색](https://user-images.githubusercontent.com/105098581/235831928-76dd9b9d-eda4-4a0b-b224-c7fc2fca091a.gif) |
| 다크모드 | |
| ![](https://user-images.githubusercontent.com/105098581/235830126-7892efb7-62a6-4d56-9a3b-017660a8d663.gif) |
| |
