import React from 'react'
import styled from 'styled-components'
import UserProfile from '../../components/my-page/UserProfile'

const MyPage = () => {
  return (
    <Container>
      <UserProfile />
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
