import {useCallback, useEffect, useRef, useState} from 'react'

import {getFeedListApi} from '../api/feed'

const useMyPageFeedList = () => {
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

  return {isLast, isLoading, feeds, setTarget}
}

export default useMyPageFeedList
