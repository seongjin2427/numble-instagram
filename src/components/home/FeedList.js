import styled from 'styled-components'
import React, {useCallback, useEffect, useRef, useState} from 'react'

import FeedCard from './FeedCard'
import {getFeedListApi} from '../../api/feed'

const FeedList = () => {
  const [feeds, setFeeds] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [target, setTarget] = useState(null)
  const [isLast, setIsLast] = useState(false)
  const {current: page} = useRef({pageIndex: 0, size: 10})

  const getFeedItems = useCallback(async () => {
    setIsLoading(true)
    const {isSuccess, result} = await getFeedListApi(page)
    if (isSuccess) {
      if (!result.length) {
        setIsLast(true)
        return
      }
      setFeeds(prev => prev.concat(result))
      page.pageIndex += 1
    }
    setIsLoading(false)
  }, [page])

  const onIntersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting && !isLoading) {
        observer.unobserve(entry.target)
        await getFeedItems()
      }
    },
    [isLoading, getFeedItems],
  )

  useEffect(() => {
    getFeedItems()
  }, [getFeedItems])

  useEffect(() => {
    let observer
    if (target) {
      observer = new IntersectionObserver(onIntersect, {})
      observer.observe(target)
    }
    return () => observer && observer.disconnect()
  }, [target, onIntersect])

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
