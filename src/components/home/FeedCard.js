/* eslint-disable react/prop-types */
import styled, {css} from 'styled-components'
import React, {forwardRef, useCallback, useEffect, useState} from 'react'

import Icons from '../common/Icons'
import Profile from '../common/Profile'
import Typography from '../common/Typography'
import FeedIconSet from '../common/FeedIconSet'
import FeedCommand from '../common/FeedCommand'
import FeedText from './FeedText'
import Carousel from '../common/Carousel'
import CommandCard from './CommandCard'
import useToggle from '../../hooks/useToggle'
import {getCommentsApi} from '../../api/feed'
import {convertRelativeTimeFormat} from '../../utils/timeformat'

import sampleProfile from '../../assets/images/sample_profile.svg'
import Modal from '../common/Modal'
import ModalContent from './ModalContent'

const FeedCard = (props, ref) => {
  const {feedId, contentsList, feedLoginId, feedText, feedCommentCount, feedCreatedAt} = props
  const [modal, onToggleModal] = useToggle()
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
        <FeedContent onClick={onToggleModal}>
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
            {convertRelativeTimeFormat(feedCreatedAt)}
          </Typography>
        </FeedContent>
        {feedCommentCount < 3 &&
          comments.map(c => <CommandCard key={c.id} profile_uri={sampleProfile} toggleModal={onToggleModal} {...c} />)}
        <FeedCommand profile={sampleProfile} />
      </FeedContentWrapper>
      <Modal toggle={modal} onToggle={onToggleModal}>
        <ModalContent comments={comments} profileImage={sampleProfile} {...props} />
      </Modal>
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

export default React.memo(forwardRef(FeedCard))
