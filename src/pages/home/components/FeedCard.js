/* eslint-disable react/prop-types */
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import styled, {css} from 'styled-components'
import React, {forwardRef, useCallback, useEffect, useState} from 'react'

import Icons from '../../../components/common/Icons'
import Profile from '../../../components/common/Profile'
import Typography from '../../../components/common/Typography'
import FeedIconSet from '../../../components/common/FeedIconSet'
import FeedCommand from '../../../components/common/FeedCommand'
import FeedText from './FeedText'
import Carousel from '../../../components/common/Carousel'
import CommandCard from './CommandCard'
import {detailAction} from '../../../store/actions/feed'
import {fixScrollAction} from '../../../store/actions/home'
import {getCommentsApi} from '../../../api/feed'
import {convertRelativeTimeFormat} from '../../../utils/timeformat'

import sampleProfile from '../../../assets/images/sample_profile.svg'

const FeedCard = (props, ref) => {
  const {feedId, contentsList, feedLoginId, feedText, feedCommentCount, feedCreatedAt, feedUpdatedAt} = props
  const [comments, setComments] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getComments = useCallback(async () => {
    const {isSuccess, result} = await getCommentsApi({feedId, pageIndex: 0, size: 10})
    if (isSuccess) {
      setComments(result)
    }
  }, [feedId])

  useEffect(() => {
    getComments()
  }, [getComments])

  const moveToFeed = () => {
    const feedData = {
      feedId,
      feedLoginId,
      contentsList,
      feedText,
      feedCreatedAt,
      comments,
      feedUpdatedAt,
      profileImage: sampleProfile,
    }
    const scrollY = window.scrollY
    dispatch(detailAction(feedData))
    dispatch(fixScrollAction({scrollY}))
    navigate(`/board?boardId=${feedId}`, {preventScrollReset: true})
  }

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
          {feedCommentCount > 2 && <CommentText onClick={moveToFeed}>댓글 {comments.length}개 모두 보기</CommentText>}
          <Typography as='p' fontSize='12px' margin='0 0 20px 0' color='gray-400'>
            {convertRelativeTimeFormat(feedCreatedAt)}
          </Typography>
        </FeedContent>
        {feedCommentCount < 3 &&
          comments.map(c => <CommandCard key={c.id} profile_uri={sampleProfile} moveToFeed={moveToFeed} {...c} />)}
        <FeedCommand feedId={feedId} profile={sampleProfile} />
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
  height: 100%;
`

const FeedPhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
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

const CommentText = styled.p`
  font-size: 14px;
  margin-bottom: 15px;
  color: ${({theme}) => theme.colors['gray-400']};
  cursor: pointer;
`

export default React.memo(forwardRef(FeedCard))
