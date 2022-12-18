import styled, {css} from 'styled-components'
import {useSelector} from 'react-redux'
import React, {useCallback, useEffect, useState} from 'react'

import {getMyFeedApi} from '../../api/myPage'
import {MEDEA_QUERY} from '../../style/media-query'

const UserFeedList = () => {
  const {loginId} = useSelector(({LoginReducer}) => LoginReducer.user)

  const [feeds, setFeeds] = useState([])

  const getFeeds = useCallback(async () => {
    const {isSuccess, result} = await getMyFeedApi({loginId, pageIndex: 0, size: 10})

    if (isSuccess) {
      console.log(result)
      setFeeds(prev => [...prev, ...result])
    }
  }, [loginId])

  useEffect(() => {
    getFeeds()
  }, [getFeeds])

  console.log(feeds)

  return (
    <Container>
      <ThumbnailList>
        {feeds.length
          ? feeds.map((feed, idx) => (
              <ThumbnailWrapper key={feed?.feedId}>
                <ThumbnailImage src={feed?.contentsList[0]?.contentsUrl} alt={`feed_image_${idx}`} />
              </ThumbnailWrapper>
            ))
          : null}
      </ThumbnailList>
    </Container>
  )
}

const Container = styled.div``

const ThumbnailList = styled.div`
  display: grid;
  width: 100vw;
  grid-template-columns: repeat(3, 1fr);

  ${MEDEA_QUERY.MEDIUM} {
    width: 1000px;
    grid-template-columns: 1fr 1fr 1fr;
    row-gap: 20px;
  }
`

const ThumbnailWrapper = styled.div`
  width: 100%;
  position: relative;

  :after {
    content: '';
    display: block;
    padding-bottom: 100%;
  }

  ${MEDEA_QUERY.MEDIUM} {
    width: 312px;
    height: 312px;
  }
`

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
`

export default UserFeedList
