import React, {useEffect, useState} from 'react'
import styled, {css} from 'styled-components'
import {getFeedListApi} from '../../api/feed'
import FeedCard from './FeedCard'

const FeedList = () => {
  const [feeds, setFeeds] = useState([])

  useEffect(() => {
    ;(async function () {
      const {isSuccess, result} = await getFeedListApi(0, 10)
      if (isSuccess) {
        setFeeds(result)
      }
    })()
  }, [])

  return (
    <Container>
      {feeds.map(feed => (
        <FeedCard key={feed.feedId} {...feed} />
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
