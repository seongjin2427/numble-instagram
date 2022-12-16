/* eslint-disable react/prop-types */
import React, {forwardRef, useCallback, useEffect, useState} from 'react'
import styled, {css} from 'styled-components'

import Carousel from './Carousel'
import Icons from '../common/Icons'
import useToggle from '../../hooks/useToggle'
import Typography from '../common/Typography'

import sampleProfile from '../../assets/images/sample_profile.svg'
import ReplyCard from './ReplyCard'
import {convertRelativeTimeFormat} from '../../utils/timeformat'
import {getCommentsApi} from '../../api/feed'
import Profile from '../common/Profile'
import FeedIconSet from '../common/FeedIconSet'
import FeedText from './FeedText'
import FeedCommand from '../common/FeedCommand'

const FeedCard = (
  {feedId, contentsList, feedLoginId, feedText, feedCommentCount, feedCreatedAt, feedUpdatedAt},
  ref,
) => {
  const [commentToggle, commentOnToggle] = useToggle()
  const [comments, setComments] = useState([])

  const getComments = useCallback(async () => {
    const {isSuccess, result} = await getCommentsApi({feedId, pageIndex: 0, size: 10})
    if (isSuccess) {
      setComments(result)
    }
  }, [feedId])

  useEffect(() => {
    getComments()
  }, [getComments])

  return (
    <Container ref={ref}>
      <FeedPhotoWrapper>
        <Carousel>
          {contentsList.map(({contentsUrl}, idx) => (
            <FeedPhotoBox key={idx}>
              <FeedPhotoImage src={contentsUrl} alt={'img'} />
            </FeedPhotoBox>
          ))}
        </Carousel>
        <ProfileWrapper>
          <Profile size='30px' src={sampleProfile} gap='5px' loginId={feedLoginId} color='white' />
        </ProfileWrapper>
        <MoreWrapper>
          <Icons icon='MoreCircleIcon' size='30px' />
        </MoreWrapper>
      </FeedPhotoWrapper>
      <FeedContentWrapper>
        <FeedIconSet feedId={feedId} />
        <FeedContent>
          <Typography as='p' margin='0 0 10px 0' fontWeight={700}>
            좋아요 271개
          </Typography>
          <FeedText feedLoginId={feedLoginId} feedText={feedText} />
          {feedCommentCount > 2 && (
            <Typography as='p' fontSize='14px' margin='0 0 15px 0' color='gray-400'>
              댓글 32개 모두 보기
            </Typography>
          )}
          <Typography as='p' fontSize='12px' margin='0 0 20px 0' color='gray-400'>
            {convertRelativeTimeFormat(feedUpdatedAt)}
          </Typography>
        </FeedContent>
        {feedCommentCount < 3 && comments.map(c => <ReplyCard key={c.id} profile_uri={ProfileImage} {...c} />)}
        <FeedCommand profile={sampleProfile} />
      </FeedContentWrapper>
    </Container>
  )
}

const Container = styled.div`
  ${({theme}) => css`
    width: 100%;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors['gray-200']};
    border-radius: 10px;
    overflow: hidden;
  `}
`

const FeedPhotoWrapper = styled.div`
  position: relative;
`

const FeedPhotoBox = styled.div`
  width: 100%;
`

const FeedPhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: absolute;
  top: 20px;
  left: 15px;
`

const MoreWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 15px;
`

const FeedContentWrapper = styled.div``

const FeedContent = styled.div`
  margin: 0 17px;
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`

export default forwardRef(FeedCard)
