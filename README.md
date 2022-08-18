## 항해 6주차(미니 프로젝트)

📆 <strong>2022. 08. 12 ~ 08. 18</strong>
<br/>
🧑🏻‍💻 <strong>항해99 8기 E반 3조<br/>BE: 장지유, 김대석, 서우혁<br/>FE: 김영진, 한효승, 박종현</strong>

## 🖥 삼조전자

### 프로젝트 링크

- [삼조전자 사이트](http://hanghaekimyoungjin.s3-website.ap-northeast-2.amazonaws.com)
  <br />

### 프로젝트 설명

- 📢 개발자들에게 없어서는 안될 노트북, 키보드, 마우스 중고거래 사이트
- ❗️ 개발자들에게 인증 받은 좋은 제품들을 좋은 가격에 거래 해봅시다.

## 🛠 Stack

- <strong>Client</strong>
<p>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black">
  <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white">
</p>

- <strong>UI</strong>

<p>
  <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
  <img src="https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=Bootstrap&logoColor=white">
</p>

- <strong>Deploy</strong>

<p>
  <img src="https://img.shields.io/badge/Amazon S3-569A31?style=for-the-badge&logo=Amazon S3&logoColor=white">
</p>

## ✅ Function

<h3 align="center">메인 화면(비회원)</h3>

- 홈페이지에 처음 접속한 모습입니다.
- 모든 글을 볼 수 있으나 글 작성이나 댓글 작성을 하려면 로그인을 해야합니다.
- 비회원이 작성하기를 누를 경우, 로그인 화면으로 이동합니다.

<img width="960" alt="스크린샷 2022-08-18 오후 5 00 21" src="https://user-images.githubusercontent.com/97172050/185355498-d6f168bc-97cf-4f4a-b98f-45b0d547e18c.png">

- 카테고리를 선택할 수 있습니다.

<img width="960" alt="스크린샷 2022-08-18 오후 5 01 04" src="https://user-images.githubusercontent.com/97172050/185355980-0420f568-cb50-4ee2-b5d3-fe9505477e9b.png">

<h3 align="center">회원가입 화면</h3>

- 중복확인 버튼을 누르면 아래에 텍스트가 나옵니다.
- 비밀번호 눈 아이콘을 누르면 비밀번호를 확인할 수 있습니다.

<img width="960" alt="스크린샷 2022-08-18 오후 5 02 24" src="https://user-images.githubusercontent.com/97172050/185356230-63fc1ae5-9932-4e71-bfdf-97abfcc27a76.png">

<h3 align="center">로그인 화면</h3>

<img width="960" alt="스크린샷 2022-08-18 오후 5 02 47" src="https://user-images.githubusercontent.com/97172050/185356702-cf5f678b-f62e-4b8a-a5f1-028539de8d6c.png">

<h3 align="center">메인 화면(회원)</h3>

- 헤더에 로그인, 회원가입 버튼이 사라지고 로그아웃 버튼이 추가됩니다.
- 글 작성이 가능합니다.

<img width="960" alt="스크린샷 2022-08-18 오후 5 03 41" src="https://user-images.githubusercontent.com/97172050/185356887-f34ec1dc-df8c-4922-ab83-c909e9fbf73c.png">

<h3 align="center">상품 상세 화면</h3>

- 상품의 내용을 확인할 수 있습니다.
- 글을 쓴 본인만 수정, 삭제 버튼이 활성화 됩니다.

<img width="960" alt="스크린샷 2022-08-18 오후 5 04 23" src="https://user-images.githubusercontent.com/97172050/185357490-9e6ce902-f253-4ba9-93e3-767a413bf732.png">

- 댓글을 작성할 수 있습니다.
- 댓글도 마찬가지로 본인이 쓴 댓글만 수정, 삭제가 가능합니다.

<img width="960" alt="스크린샷 2022-08-18 오후 5 04 30" src="https://user-images.githubusercontent.com/97172050/185358889-48d22829-e789-4b47-b9e3-489732eea68f.png">

<h3 align="center">상품 작성 화면</h3>

- 업로드할 사진이 미리보기 됩니다.

<img width="960" alt="스크린샷 2022-08-18 오후 5 28 45" src="https://user-images.githubusercontent.com/97172050/185360621-ca6168e7-ccf8-4920-bfaf-cf698c0fade3.png">

## 🧭 File Directory

```bash
/src
  ├── app //리덕스 관리
  │   ├── store.js
  │   └── slice //슬라이스 관리
  │
  ├── components //컴포넌트 폴더
  │   ├── common //여러 페이지에 공통으로 들어가는 컴포넌트 관리
  │   ├── elements //전역에 사용할 엘리먼트 관리
  │   └── img //이미지 파일 관리
  │
  ├── pages //페이지 관리
  │
  ├── shared //라우터 관리
  │
  ├── utils //각종 함수 파일 관리
  │
  ├── App.js
  └── index.js

```

## 🧑🏻‍💻 FrontEnd Members

| 이름   | 담당 API                            |
| ------ | ----------------------------------- |
| 김영진 | 로그인 · 회원가입 · 상세페이지 조회 |
| 박종현 | 헤더 · 댓글 작성, 조회, 수정, 삭제  |
| 한효승 | 글 작성, 삭제 · 전체페이지 조회     |

## ☄️ Trouble Shooting

[key값 유무에 따른 랜더링 방식](https://pentagonal-ferret-270.notion.site/mini_project_trouble_shooting-key-98cc8e36b362487f8feec04956021f4a)

[S3 오류와 싸우다..](https://pentagonal-ferret-270.notion.site/mini_project_trouble_shooting-S3-0185a52617e247c5807fd06e0d8cf3d7)

[엑셀 대시보드에 간략하게 작성한 트러블 슈팅들](https://docs.google.com/spreadsheets/d/1zk1ID-tb5E1GCsaC8noXmv6_zY6w10y2Yyj_azkJCOo/edit#gid=1820889286)
