import {useCallback, useEffect, useRef, useState} from 'react'

import {getFeedListApi} from '../api/feed'

const useFeedList = () => {
  const [feeds, setFeeds] = useState([])
  const [target, setTarget] = useState(null)
  const [isLast, setIsLast] = useState(false)
  const {current: page} = useRef({pageIndex: 0, size: 10})

  const getFeedItems = useCallback(async () => {
    const {isSuccess, result} = await getFeedListApi(page)
    if (isSuccess) {
      if (!result.length) {
        setIsLast(true)
        return
      }
      setFeeds(prev => prev.concat(result))
      page.pageIndex += 1
    }
  }, [page])

  const onIntersect = useCallback(
    ([entry], observer) => {
      setTimeout(async () => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target)
          await getFeedItems()
        }
      }, 400)
    },
    [getFeedItems],
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

  return {isLast, feeds, setTarget}
}

export default useFeedList
