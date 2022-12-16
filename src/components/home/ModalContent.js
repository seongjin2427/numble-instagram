/* eslint-disable react/prop-types */
import React from 'react'
import styled, {css} from 'styled-components'

import Icons from '../common/Icons'
import Profile from '../common/Profile'
import Carousel from './Carousel'
import Typography from '../common/Typography'
import FeedIconSet from '../common/FeedIconSet'
import {convertRelativeTimeFormat} from '../../utils/timeformat'
import FeedCommand from '../common/FeedCommand'
import CommandCard from './CommandCard'

const ModalContent = props => {
  const {feedId, contentsList, feedLoginId, profileImage, feedText, feedCreatedAt, feedUpdatedAt, comments} = props

  return (
    <Container>
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
          <Icons icon='MoreHorizontalIcon' size='20px' />
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
          {comments.length && comments.map(c => <CommandCard key={c.id} profile_uri={profileImage} {...c} />)}
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
      </ContentWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const SliderWrapper = styled.div`
  width: 60%;
`

const FeedPhotoBox = styled.div`
  width: 60%;
  height: 720px;
`

const FeedPhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

export default ModalContent
