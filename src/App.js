import React, {Suspense} from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

const loading = <div>화면을 불러오는 중 입니다.</div>

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))
const AuthLayout = React.lazy(() => import('./layout/AuthLayout'))

// Pages
const Home = React.lazy(() => import('./pages/home/Home'))
const Login = React.lazy(() => import('./pages/login/Login'))
const LoginForm = React.lazy(() => import('./pages/login/components/LoginForm'))
const KakaoLoginForm = React.lazy(() => import('./pages/login/components/KakaoLoginForm'))

const Board = React.lazy(() => import('./pages/board/Board'))
const MyPage = React.lazy(() => import('./pages/myPage/MyPage.js'))
const Chat = React.lazy(() => import('./pages/chat/Chat.js'))

const SignUp = React.lazy(() => import('./pages/signup/SignUp'))
const FirstInfo = React.lazy(() => import('./pages/signup/components/UserInformation'))
const Birthday = React.lazy(() => import('./pages/signup/components/Birthday'))
const MarketingAgree = React.lazy(() => import('./pages/signup/components/MarketingAgree'))

const Page404 = React.lazy(() => import('./pages/page404/Page404'))
const Page500 = React.lazy(() => import('./pages/page500/Page500'))

//컴포넌트
const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route exact path='/signup' name='Sign up Page' element={<SignUp />}>
              <Route path='/signup' name='FirstInfo Page' element={<FirstInfo />} />
              <Route path='/signup/birthday' name='Birthday Page' element={<Birthday />} />
              <Route path='/signup/marketing' name='Marketing Agree Page' element={<MarketingAgree />} />
            </Route>
            <Route exact path='/login' name='Login Page' element={<Login />}>
              <Route path='/login' name='Login Form Page' element={<LoginForm />} />
            </Route>
            <Route exact path='/app' name='Login Page' element={<Login />}>
              <Route path='/app/kakao-login' name='Kakao Login Page' element={<KakaoLoginForm />} />
            </Route>
          </Route>
          <Route path='/board' element={<Board />} />
          <Route element={<DefaultLayout />}>
            <Route exact path='/my-page' element={<MyPage />} />
            <Route exact path='/chat' element={<Chat />} />
            <Route exact path='/404' name='Page 404' element={<Page404 />} />
            <Route exact path='/500' name='Page 500' element={<Page500 />} />
            <Route exact path='/*' name='Home' element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
