import React from 'react'
import styled from 'styled-components'

import FeedCard from './FeedCard'
import useFeedList from '../../hooks/useFeedList'
import {useSelector} from 'react-redux'

const FeedList = () => {
  const {toggle} = useSelector(({HomeReducer}) => HomeReducer.global)
  const {feeds, setTarget, isLast, isLoading} = useFeedList()

  return (
    <Container key={toggle}>
      {feeds.map(feed => (
        <FeedCard key={feed.feedId} {...feed} />
      ))}
      {!isLast && !isLoading && <div ref={setTarget}></div>}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export default FeedList
