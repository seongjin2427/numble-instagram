import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import React, {useCallback, useEffect, useState} from 'react'

import Icons from '../../../components/common/Icons'
import {MEDEA_QUERY} from '../../../style/mediaQuery'
import {toggleAction} from '../../../store/actions/home'
import {getMyFeedApi} from '../../../api/myPage'

const UserFeedList = () => {
  const {toggle} = useSelector(({HomeReducer}) => HomeReducer.global)
  const {loginId} = useSelector(({LoginReducer}) => LoginReducer.user)
  const dispatch = useDispatch()

  const [feeds, setFeeds] = useState([])

  const getFeeds = useCallback(async () => {
    const {isSuccess, result} = await getMyFeedApi({loginId, pageIndex: 0, size: 10})

    if (isSuccess) {
      setFeeds(prev => [...prev, ...result])
    }
  }, [loginId])

  useEffect(() => {
    getFeeds()
  }, [getFeeds])

  const toggleNewFeedModal = () => dispatch(toggleAction({toggle: !toggle}))

  return (
    <Container>
      {feeds.length ? (
        <ThumbnailList>
          {feeds.map((feed, idx) => (
            <ThumbnailWrapper key={feed?.feedId}>
              <ThumbnailImage src={feed?.contentsList[0]?.contentsUrl} alt={`feed_image_${idx}`} />
            </ThumbnailWrapper>
          ))}
        </ThumbnailList>
      ) : (
        <NoFeedWrapper>
          <NoFeed>
            <Icon>
              <Icons icon='CameraIcon' size='100%' />
            </Icon>
            <NoFeedTitle>사진 공유</NoFeedTitle>
            <NoFeedSubTitle>사진을 공유하면 회원님의 프로필에 표시됩니다.</NoFeedSubTitle>
            <NoFeedLink onClick={toggleNewFeedModal}>첫 사진 공유하기</NoFeedLink>
          </NoFeed>
        </NoFeedWrapper>
      )}
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`

const ThumbnailList = styled.div`
  display: grid;
  width: 100vw;
  height: fit-content;

  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);

  ${MEDEA_QUERY.MEDIUM} {
    width: 1000px;
    gap: 20px;
    grid-template-rows: repeat(3, 1fr);
    grid-template-columns: repeat(3, 1fr);
  }
`

const ThumbnailWrapper = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  position: relative;
`

const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
`

const NoFeedWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
`

const NoFeed = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Icon = styled.div`
  width: 60px;
  height: 60px;
  margin-bottom: 20px;

  ${MEDEA_QUERY.MEDIUM} {
    width: 85px;
    height: 85px;
  }
`

const NoFeedTitle = styled.h1`
  font-size: 36px;
  font-weight: 500;
  margin-bottom: 15px;
  color: ${({theme}) => theme.colors['gray-900']};

  ${MEDEA_QUERY.MEDIUM} {
    margin-bottom: 20px;
    font-size: 48px;
  }
`

const NoFeedSubTitle = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.colors['gray-900']};
  margin-bottom: 30px;

  ${MEDEA_QUERY.MEDIUM} {
    margin-bottom: 40px;
    font-size: 18px;
  }
`

const NoFeedLink = styled.a`
  font-size: 16px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.blue};
  cursor: pointer;

  ${MEDEA_QUERY.MEDIUM} {
    font-size: 18px;
  }
`

export default UserFeedList
