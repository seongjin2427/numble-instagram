import React from 'react'

const Home = React.lazy(() => import('./pages/home/Home'))
const SignUp = React.lazy(() => import('./pages/signup/SignUp'))
const Login = React.lazy(() => import('./pages/login/Login'))
const Page404 = React.lazy(() => import('./pages/page404/Page404'))
const Page500 = React.lazy(() => import('./pages/page500/Page500'))

const routes = [
  {path: '/', name: 'Home', element: Home},
  {path: '/signup', name: 'SignUp', element: SignUp},
  {path: '/signup', name: 'Login', element: Login},
  {path: '/404', name: '404', element: Page404},
  {path: '/500', name: '500', element: Page500},
]

export default routes
