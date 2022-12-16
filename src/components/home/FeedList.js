import React from 'react'
import styled from 'styled-components'

import FeedCard from './FeedCard'
import useFeedList from '../../hooks/useFeedList'

const FeedList = () => {
  const {feeds, setTarget, isLast, isLoading} = useFeedList()

  console.log(isLast)

  return (
    <Container>
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
