import styled from 'styled-components'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import React, {useCallback, useEffect} from 'react'

import FeedList from './components/FeedList'
import FeedTop from './components/FeedTop'
import RecommandFriend from './components/RecommandFriend'
import {RECOMMAND_FRIENDS} from '../../constants/sample'
import {MEDEA_QUERY} from '../../style/mediaQuery'

const HomePage = () => {
  const {scrollY} = useSelector(({HomeReducer}) => HomeReducer.global)
  const navigate = useNavigate()

  const moveToScroll = useCallback(() => {
    setTimeout(() => {
      window.scrollTo({top: scrollY})
    }, 100)
  }, [scrollY])

  useEffect(() => {
    moveToScroll()
  }, [moveToScroll])

  useEffect(() => {
    const isLogin = localStorage.getItem('jwt')
    if (!isLogin) {
      navigate('/login')
    }
  }, [navigate])

  return (
    <Home>
      <ContentWrapper>
        <FeedWrapper>
          <FeedTop friends={RECOMMAND_FRIENDS} />
          <FeedList />
        </FeedWrapper>
        <RecommandFriendWrapper>
          <RecommandFriend friends={RECOMMAND_FRIENDS} />
        </RecommandFriendWrapper>
      </ContentWrapper>
    </Home>
  )
}

const Home = styled.div`
  width: 100%;
  display: flex;
  padding-top: 30px;
`

const ContentWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  gap: 100px;
`

const FeedWrapper = styled.div`
  width: 520px;
`

const RecommandFriendWrapper = styled.div`
  display: none;
  width: 420px;

  ${MEDEA_QUERY.WIDE_DESKTOP} {
    display: block;
  }
`

export default HomePage
