import React from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'

import FeedList from '../../components/home/FeedList'
import FeedTop from '../../components/home/FeedTop'
import RecommandFriend from '../../components/home/RecommandFriend'
import {RECOMMAND_FRIENDS} from '../../constants/sample'
import {MEDEA_QUERY} from '../../style/media-query'

const HomePage = () => {
  // Redux 값 불러오기
  const {user} = useSelector(state => state.LoginReducer)

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
