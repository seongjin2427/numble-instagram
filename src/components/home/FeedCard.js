import React from 'react'
import styled, {css} from 'styled-components'

import Carousel from './Carousel'
import Icons from '../common/Icons'
import useToggle from '../../hooks/useToggle'
import Typography from '../common/Typography'

import NewYork from '../../assets/images/newyork.svg'
import ProfileImage from '../../assets/images/sample_profile.svg'
import ReplyCard from './ReplyCard'

const imgArr = new Array(2).fill(NewYork)

const sample = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
industry s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
like Aldus PageMaker including versions of Lorem Ipsum.`

const FeedCard = () => {
  const [toggle, onToggle] = useToggle()

  return (
    <Container>
      <FeedPhotoWrapper>
        <Carousel>
          {imgArr.map((img, idx) => (
            <div key={idx}>
              <img src={img} alt={'img'} />
            </div>
          ))}
        </Carousel>
        <ProfileWrapper>
          <ProfileImageWrapper size='30px'>
            <Profile src={ProfileImage} alt='profile' />
          </ProfileImageWrapper>
          <Typography as='p' fontWeight={600} color='white'>
            happypuppy
          </Typography>
        </ProfileWrapper>
        <MoreWrapper>
          <Icons icon='MoreCircleIcon' size='30px' />
        </MoreWrapper>
      </FeedPhotoWrapper>
      <FeedContentWrapper>
        <IconWrapper>
          <IconBox>
            <Icons icon='HeartIcon' size='20px' />
            <Icons icon='MessageIcon' size='20px' />
          </IconBox>
          <Icons icon='BookmarkIcon' size='20px' />
        </IconWrapper>
        <FeedContent>
          <Typography as='p' margin='0 0 10px 0' fontWeight={700}>
            좋아요 271개
          </Typography>
          <Content toggle={toggle}>
            <Typography as='span' display='inline-block' margin='0 5px 7px 0' fontWeight={700}>
              happypuppy
            </Typography>
            <Typography as='span' wordBreak='break-word' lineHeight='180%' margin='0 0 10px 0'>
              {!toggle && sample.length >= 100 && sample.split(' ').slice(0, 3).join(' ') + '...'}
              {toggle && sample + '  '}
            </Typography>
            <More onClick={() => onToggle(!toggle)}>{toggle ? '접기' : '더보기'}</More>
          </Content>
          <Typography as='p' fontSize='14px' margin='0 0 15px 0' color='gray-400'>
            댓글 32개 모두 보기
          </Typography>
          <Typography as='p' fontSize='12px' margin='0 0 20px 0' color='gray-400'>
            2시간 전
          </Typography>
        </FeedContent>
        <ReplyCard
          author='happypuppy'
          content='뉴욕 정말 멋있죠 ㅠㅠ'
          created_at={new Date('2022-11-15 17:42:16')}
          profile_uri={ProfileImage}
        />
        <ReplyWrapper>
          <ReaplyProfileWrapper size='30px'>
            <Profile src={ProfileImage} alt='profile' />
          </ReaplyProfileWrapper>
          <Input type='text' placeholder='댓글 달기...' />
          <ReplyButton>게시</ReplyButton>
        </ReplyWrapper>
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
  `}
`

const FeedPhotoWrapper = styled.div`
  position: relative;
`

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  position: absolute;
  top: 20px;
  left: 15px;
`

const ProfileImageWrapper = styled.div`
  ${({size}) => css`
    width: ${size};
    height: ${size};
    border-radius: 50%;
    overflow: hidden;
  `}
`

const MoreWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 15px;
`

const FeedContentWrapper = styled.div``

const IconWrapper = styled.div`
  ${({theme}) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 23px 17px;

    svg {
      stroke: ${theme.colors['gray-900']};
      cursor: pointer;
    }
  `}
`

const IconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const FeedContent = styled.div`
  margin: 0 17px;
`

const Content = styled.div`
  width: 100%;
  margin-bottom: 5px;
  font-size: 14px;

  ${({toggle}) =>
    toggle
      ? null
      : css`
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        `}
`

const More = styled.span`
  ${({theme, toggle}) => css`
    display: ${toggle ? 'none' : 'inline'};
    font-weight: 500;
    font-size: 14px;
    color: ${theme.colors['gray-400']};
    cursor: pointer;
  `}
`

const ReplyWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 60px;
  padding: 0 0 0 17px;
  border-top: 0.5px solid ${({theme}) => theme.colors['gray-300']};
`

const ReaplyProfileWrapper = styled(ProfileImageWrapper)`
  position: unset;
`

const Profile = styled.img`
  width: 100%;
  height: 100%;
`

const Input = styled.input`
  height: 20px;
  font-size: 14px;
  flex: 1;
  border: none;
  outline: none;

  ::placeholder {
    color: ${({theme}) => theme.colors['gray-300']};
  }
`

const ReplyButton = styled.button`
  height: 100%;
  background: none;
  border: none;
  outline: none;
  color: #b2ddff;
  font-weight: 700;
  font-size: 14px;
  padding: 0 15px;
`

export default FeedCard
