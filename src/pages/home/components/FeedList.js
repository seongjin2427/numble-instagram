import React from 'react'
import styled from 'styled-components'

import FeedCard from './FeedCard'
import useFeedList from '../../../hooks/useFeedList'

const FeedList = () => {
  const {feeds, setTarget, isLast} = useFeedList()

  return (
    <Container>
      {feeds.map((feed, idx) => (
        <FeedCard key={feed.feedId} ref={!isLast && idx === feeds.length - 1 ? setTarget : null} {...feed} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`

export default FeedList
