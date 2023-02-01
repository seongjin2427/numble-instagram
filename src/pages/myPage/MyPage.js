import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import React, {useEffect} from 'react'

import UserProfile from './components/UserProfile'
import UserFeedList from './components/UserFeedList'

const MyPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const isLogin = localStorage.getItem('jwt')
    if (!isLogin) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <Container>
      <UserProfile />
      <UserFeedList />
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default MyPage
