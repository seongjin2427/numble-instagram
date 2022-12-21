import {useCallback, useEffect, useRef, useState} from 'react'

import {getFeedListApi} from '../api/feed'
import {useSelector} from 'react-redux'

const useFeedList = () => {
  const [feeds, setFeeds] = useState([])
  const [target, setTarget] = useState(null)
  const [isLast, setIsLast] = useState(false)
  const {current: page} = useRef({pageIndex: 0, size: 10})
  const {refetch} = useSelector(({HomeReducer}) => HomeReducer.global)

  const getFeedItems = useCallback(
    async init => {
      if (init) page.pageIndex = 0
      const {isSuccess, result} = await getFeedListApi(page)
      if (isSuccess) {
        if (!result.length) {
          setIsLast(true)
          return
        }

        if (init) {
          setFeeds(result)
          return
        }

        page.pageIndex += 1
        setFeeds(prev => prev.concat(result))
      }
    },
    [page],
  )

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
    getFeedItems(refetch)
  }, [refetch, getFeedItems])

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
