# Welcome to neordinary-template-web-react-js
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
#### [License: Only use for softsquared project]

### 🏠 [템플릿 페이지](http://localhost:3000)
### 🗺 [GitLab 소스](https://gitlab.com/softsquared/tech-department/outsource/template-outsource/neordinary-template-web-react-js)
#

## Prerequisites
- npm = 8.5.0
- node = v16.14.2
- react = v17.0.2
- redux = 4.1.2
- styled-components = ^5.3.5

#

## 설치법

```sh
npm install

or

npm install --force
```

#

## 로컬 실행법 / 배포 소스 빌드법
```sh
npm run start

npm run build-dev // Local 환경에서 개발을 완료하고 바로 서버로 Push 했을 경우 작동이 안되는 경우 (node version, os version, security group 보안설정)

npm run build-stage //

npm run build-prod //
```

#

## 저작권자
👤 **(주)소프트스퀘어드**

#

## 구조

> 폴더구조
```
ito-88
├─ src
│  ├─ api
│  ├─ App.js
│  ├─ assets
│  │  ├─ icons
│  │  └─ images
│  ├─ components
│  │  ├─ common
│  │  ├─ header
│  ├─ constants
│  ├─ dataManager
│  ├─ hooks
│  ├─ index.js
│  ├─ layout
│  ├─ pages
│  │  ├─ chat
│  │  ├─ home
│  │  ├─ login
│  │  ├─ myPage
│  │  ├─ page404
│  │  ├─ page500
│  │  └─ signup
│  ├─ store
│  │  ├─ actions
│  │  └─ reducers
│  ├─ style
│  └─ utils
│─ tsconfig.json
├─ .browserslistrc
├─ .editorconfig
├─ .env.development
├─ .env.development.local
├─ .env.production
├─ .env.stage
├─ .eslintignore
├─ .eslintrc.js
├─ .gitignore
├─ .prettierignore
├─ .prettierrc.js
├─ appspec.yml
├─ package.json
├─ public
└─ README.md
```

----

> src > assets 폴더
```

assets 폴더는 서비스를 구현하는데 사용되는 디자인 요소들을 보관하는 폴더입니다.

<icons>
프로젝트에서 사용된 svg 아이콘을 저장하는 폴더입니다.

<images>
프로젝트에서 사용된 이미지를 저장하는 폴더입니다.

```

----

> src > components 폴더
```

components 폴더는 사용되는 도메인 별로 폴더를 분리하여 관리하였습니다.

<chat>
채팅 관련 컴포넌트

<common>
두 도메인 이상에 사용되는 공통 컴포넌트

<header>
공통 헤더 컴포넌트에서 사용된 컴포넌트

<home>
메인 Feed 리스트 페이지에 사용되는 컴포넌트

<login>
로그인 페이지에서 사용된 컴포넌트

<my-page>
마이 페이지에서 사용된 컴포넌트

<signup>
회원가입에서 사용된 컴포넌트

<AppHeader.js>
공통 헤더 컴포넌트


```

----

> src > dataManager 폴더
```

dataManager 폴더는 기본 템플릿에 포함되어 있었던 폴더로
데이터를 운용하는데 사용되는 기능들을 구현한 폴더입니다.

<ApiConfig.js>
HTTP 통신 요청시에 사용한 Axios 포함 유틸

```
----

> src > hooks 폴더
```

hooks 폴더는 리액트 커스텀 훅이 작성된 파일을 관리하는 폴더입니다.

<useFeedList.js>
메인 피드 리스트에서 무한스크롤을 적용하기 위한 커스텀 훅

<useImageList.js>
새 피드 작성 시 이미지 업로드와 관련된 로직을 분리한 커스텀 훅

<useMyPageFeedList.js>
마이 페이지 내 피드 리스트에서 무한스크롤을 적용하기 위한 커스텀 훅

<useToggle.js>
단순한 토글 작업을 공통적으로 사용하기 위한 커스텀 훅

```

----

> src > layout 폴더
```

layout 폴더는 큰 틀의 레이아웃을 별도로 분리하여 관리하기 위한 폴더입니다.

<AuthLayout.js>
로그인 및 회원가입 페이지에서 사용된, 헤더가 없는 레이아웃 컴포넌트

<DefaultLayout.js>
로그인 및 회원가입 외 페이지에서 사용된, 페더가 포함된 레이아웃 컴포넌트


```

----

> src > pages 폴더
```

pages폴더는 페이지를 나타냄에 따라 폴더로 분리하여 컴포넌트를 관리하였습니다.

<board>
Feed 상세 페이지

<chat>
채팅 페이지

<home>
메인 Feed List 페이지

<login>
로그인 페이지

<myPage>
마이 페이지

<page404>
404 오류 페이지

<page500>
500 오류 페이지

<signup>
회원가입 페이지


```

----

> src > store 폴더
```

store 폴더는 전역 상태 관리를 위한 Redux 관련 코드들을 모아둔 폴더입니다.

<actions>
받은 파라미터에 type을 부착하여 reducer에서 변경시킬 상태값을 구분할 수 있도록 도와줍니다.

<reducers>
action 코드로부터 받은 type에 따라 특정 상태를 전역적으로 변경시키도록 도와주는 기능을 합니다.

```

> src > style 폴더
```

style 폴더는 css 및 스타일과 관련된 코드를 관리하는 폴더입니다.

<media-query.js>
반응형 웹 구현을 위한 미디어 쿼리 객체 상수를 작성해둔 파일입니다.

<styled.js>
global style을 작성한 파일입니다. App.js에서 적용시키고 있습니다

<theme.js>
styled-components 라이브러리에서 제공하는 theming을 적용시키기 위해 작성한 파일입니다.

```
---
> src > utils 폴더
```

utils 폴더는 코드를 작성하는데 유용하게 사용되는 함수를 모아둔 폴더입니다.

<firebase.js>
파이어베이스 초기 설정과 관련된 파일

<signup.js>
회원가입 시에 생년월일 리스트를 쉽게 구현할 수 있는 함수를 작성한 파일

<timeformat.js>
시간에 대해 얼마만큼 지났는지 상대적으로 나타내기 위한 함수를 작성한 파일

<utility.js>
기본 템플릿에 포함된 파일, 유효성 검사에 대한 로직을 모아둔 파일

```

----

> src > 그밖의 파일들
```
<App.js>
프로젝트 내의 라우트 구조를 작성한 파일

<index.js>
전역적으로 사용되는 Provider 등을 적용시키기 위한 파일

```