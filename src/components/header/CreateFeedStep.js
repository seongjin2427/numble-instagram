/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'

import Icons from '../common/Icons'
import Profile from '../common/Profile'
import Carousel from '../common/Carousel'
import Typography from '../common/Typography'

import sampleProfile from '../../assets/images/sample_1.svg'

const CreateFeedStep = ({feedText, setFeedText, thumbnails}) => {
  const {loginId} = useSelector(({LoginReducer}) => LoginReducer.user)

  const onChangeTextArea = e => {
    setFeedText(e.target.value)
  }

  return (
    <CreateFeedContainer>
      <CarouselWrapper>
        <Carousel settings={{dots: false}}>
          {thumbnails.map((t, idx) => (
            <ThumbnailWrapper key={idx}>
              <Thumbnail src={t} alt='img' />
            </ThumbnailWrapper>
          ))}
        </Carousel>
      </CarouselWrapper>
      <ContentWrapper>
        <FeedTextWrapper>
          <Profile src={sampleProfile} loginId={loginId} size='35px' gap='10px' style={{marginBottom: '15px'}} />
          <FeedText value={feedText} maxLength={2200} onChange={onChangeTextArea} />
          <Typography as='p' color='gray-300' fontSize='14px' textAlign='right'>
            {feedText.length}/2,200
          </Typography>
        </FeedTextWrapper>
        <MenuWrapper>
          <Typography color='gray-500'>위치 추가</Typography>
          <Icons icon='MapPinIcon' size='20px' />
        </MenuWrapper>
        <MenuWrapper>
          <Typography color='gray-900'>접근성</Typography>
          <Icons icon='ChevronDownIcon' size='15px' />
        </MenuWrapper>
        <MenuWrapper>
          <Typography color='gray-900'>고급 설정</Typography>
          <Icons icon='ChevronDownIcon' size='15px' />
        </MenuWrapper>
      </ContentWrapper>
    </CreateFeedContainer>
  )
}

const CreateFeedContainer = styled.div`
  display: flex;
  width: 1000px;
  height: 660px;
`
const CarouselWrapper = styled.div`
  width: 650px;
  height: 650px;
`

const ThumbnailWrapper = styled.div`
  width: 650px;
  height: 650px;
`

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ContentWrapper = styled.div`
  width: 350px;
  height: 100%;
`

const FeedTextWrapper = styled.div`
  width: 350px;
  padding: 20px;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray-300']};
`

const FeedText = styled.textarea`
  display: inline-block;
  width: 100%;
  height: 180px;
  border: none;
  outline: none;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  color: ${({theme}) => theme.colors['gray-900']};
  resize: none;
`

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray-300']};

  svg {
    stroke: ${({theme}) => theme.colors['gray-300']};
  }
`

export default CreateFeedStep
