/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'

import Modal from '../common/Modal'
import Icons from '../common/Icons'
import Profile from '../common/Profile'
import Carousel from '../common/Carousel'
import Typography from '../common/Typography'
import FeedIconSet from '../common/FeedIconSet'
import FeedCommand from '../common/FeedCommand'

import CancelModal from '../header/CancelModal'
import CommandCard from './CommandCard'
import MoreModal from './MoreModal'
import useToggle from '../../hooks/useToggle'
import {removeFeedApi} from '../../api/feed'
import {convertRelativeTimeFormat} from '../../utils/timeformat'

const DetailCard = ({toggleMore, onToggleMore, onToggleModifyMode}) => {
  const feedData = useSelector(({FeedReducer}) => FeedReducer.feed)
  const {loginId} = useSelector(({LoginReducer}) => LoginReducer.user)
  const {feedId, feedLoginId, contentsList, feedText, feedCreatedAt, feedUpdatedAt, comments, profileImage} = feedData

  const [removeToggle, onRemoveToggle] = useToggle()

  const isAuthor = loginId === feedLoginId

  const toggleMoreModal = () => {
    onToggleMore(!toggleMore)
  }

  const toggleRemoveModal = () => onRemoveToggle(!removeToggle)

  const checkRemoveFeed = () => {
    if (isAuthor) {
      onToggleMore(false)
      onRemoveToggle(true)
    }
  }

  const removeFeed = async () => {
    if (isAuthor) {
      const result = await removeFeedApi(feedId)

      if (result) {
        alert('삭제되었습니다.')
      } else {
        alert('에러가 발생하였습니다. 다시 시도해주세요.')
      }
    }
  }

  return (
    <>
      <SliderWrapper>
        <Carousel settings={{dots: false}}>
          {contentsList.map(({contentsUrl}, idx) => (
            <FeedPhotoBox key={idx}>
              <FeedPhotoImage src={contentsUrl} alt={'img'} />
            </FeedPhotoBox>
          ))}
        </Carousel>
      </SliderWrapper>

      <ContentWrapper>
        <ContentHeader>
          <Profile loginId={feedLoginId} src={profileImage} gap='10px' size='35px' />
          <Icons onClick={toggleMoreModal} icon='MoreHorizontalIcon' size='20px' style={{cursor: 'pointer'}} />
        </ContentHeader>
        <ContentBody>
          <UserContentWrapper>
            <Profile loginId={feedLoginId} src={profileImage} gap='10px' size='35px' />
            <Content>
              <FeedText>{feedText}</FeedText>
              <Typography as='p' color='gray-300' fontSize='12px' fontWeight={500}>
                {convertRelativeTimeFormat(feedUpdatedAt)}
              </Typography>
            </Content>
          </UserContentWrapper>
          {!!comments.length &&
            comments.map(c => <CommandCard key={c.id} profile_uri={profileImage} cursor='default' {...c} />)}
        </ContentBody>
        <ContentFooter>
          <FeedIconSet feedId={feedId} />
          <Typography as='p' color='gray-900' fontSize='14px' fontWeight={700} margin='10px 15px'>
            좋아요 4,119개
          </Typography>
          <Typography as='p' color='gray-300' fontSize='12px' fontWeight={500} margin='0 15px 25px 15px'>
            {convertRelativeTimeFormat(feedCreatedAt)}
          </Typography>

          <FeedCommand />
        </ContentFooter>
        <Modal width='448px' height='auto' toggle={toggleMore} onToggle={onToggleMore}>
          <MoreModal
            isAuthor={isAuthor}
            onToggle={onToggleMore}
            onToggleModifyMode={onToggleModifyMode}
            checkRemoveFeed={checkRemoveFeed}
          />
        </Modal>
        <Modal width='448px' height='223px' toggle={removeToggle} onToggle={onRemoveToggle}>
          <CancelModal
            title='게시물을 삭제하시겠어요?'
            subtitle='이 게시물을 삭제하시겠어요?'
            removeToggle={removeFeed}
            cancelToggle={toggleRemoveModal}
          />
        </Modal>
      </ContentWrapper>
    </>
  )
}

const SliderWrapper = styled.div`
  width: 698px;
  height: 698px;
`

const FeedPhotoBox = styled.div`
  width: 698px;
  height: 698px;
`

const FeedPhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray-300']};
`

const ContentBody = styled.div`
  padding-bottom: 25px;
  flex: 1;
  overflow: scroll;
`

const UserContentWrapper = styled.div`
  padding: 15px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 45px;
`

const FeedText = styled.p`
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const ContentFooter = styled.div`
  width: 100%;
  border-top: 1px solid ${({theme}) => theme.colors['gray-300']};
`

export default DetailCard
