import React from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import FeedCard from '../../components/home/FeedCard'
import FeedList from '../../components/home/FeedList'
import FeedTop from '../../components/home/FeedTop'

const HomePage = () => {
  // Redux 값 불러오기
  const {user} = useSelector(state => state.LoginReducer)

  return (
    <Home>
      <FeedWrapper>
        <FeedTop />
        <FeedList />
      </FeedWrapper>
    </Home>
  )
}

const Home = styled.div`
  width: 100%
  display: flex;
  flex-direction: column;
  /* background-color: blue; */
  padding: 1rem;
`

const FeedWrapper = styled.div`
  width: 520px;
`

export default HomePage
