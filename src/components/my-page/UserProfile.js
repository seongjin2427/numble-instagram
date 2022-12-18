/* eslint-disable react/prop-types */
import React from 'react'
import styled, {css} from 'styled-components'
import {useSelector} from 'react-redux'

import sampleProfile from '../../assets/images/sample_profile.svg'
import {MEDEA_QUERY} from '../../style/media-query'

const UserProfile = () => {
  const userInfo = useSelector(({LoginReducer}) => LoginReducer.user)
  const {loginId, realName, feedCount, followerCount, followingCount} = userInfo
  const formatter = Intl.NumberFormat('en-US', {notation: 'compact', maximumFractionDigits: 1}).format

  console.log(userInfo)

  return (
    <Container>
      <UserProfileWrapper>
        <ProfileWrapper>
          <ProfileImageWrapper>
            <ProfileImage src={sampleProfile} alt='profile_image' />
          </ProfileImageWrapper>
          <MobileLoginIdWrapper>
            <UserLoginId>{loginId}</UserLoginId>
            <ButtonWrapper>
              <ProfileButton>메세지 보내기</ProfileButton>
              <ProfileButton blue>팔로우</ProfileButton>
            </ButtonWrapper>
          </MobileLoginIdWrapper>
        </ProfileWrapper>
        <div>
          <UserLoginIdWrapper>
            <UserLoginId>
              {loginId}
              <ProfileModifyButton>프로필 편집</ProfileModifyButton>
            </UserLoginId>
          </UserLoginIdWrapper>
          <UserScoreList>
            <UserScoreItem>
              <UserScoreDescription>게시물</UserScoreDescription>
              <UserScore>{formatter(feedCount)}</UserScore>
            </UserScoreItem>
            <UserScoreItem>
              <UserScoreDescription>팔로워</UserScoreDescription>
              <UserScore>{formatter(followerCount)}</UserScore>
            </UserScoreItem>
            <UserScoreItem>
              <UserScoreDescription>팔로잉</UserScoreDescription>
              <UserScore>{formatter(followingCount)}</UserScore>
            </UserScoreItem>
          </UserScoreList>
          <UserInfoWrapper>
            <RealName>{realName}</RealName>
            <BasicParagraph>여행</BasicParagraph>
            <Introduction>여행 다니는거 좋아해요</Introduction>
            <Introduction>세계를 돌아다닙니다</Introduction>
          </UserInfoWrapper>
        </div>
      </UserProfileWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  position: relative;
`

const UserProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 375px;
  padding: 20px 20px 56px 20px;

  ${MEDEA_QUERY.MEDIUM} {
    flex-direction: row;
    width: 1000px;
    min-height: 263px;
    padding: 30px 0 0 0;
  }
`

const ProfileWrapper = styled.div`
  display: flex;
  margin-bottom: 18px;
`

const ProfileImageWrapper = styled.div`
  margin-right: 15px;

  ${MEDEA_QUERY.MEDIUM} {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    width: 352px;
    margin-top: 20px;
  }
`

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;

  ${MEDEA_QUERY.MEDIUM} {
    width: 150px;
    height: 150px;
  }
`

const UserLoginIdWrapper = styled.div`
  display: none;
  flex-direction: column;

  ${MEDEA_QUERY.MEDIUM} {
    display: flex;
    gap: 10px;
  }
`

const MobileLoginIdWrapper = styled(UserLoginIdWrapper)`
  display: flex;
  justify-content: center;
  gap: 10px;

  ${MEDEA_QUERY.MEDIUM} {
    display: none;
  }
`

const UserLoginId = styled.p`
  font-size: 20px;
  color: ${({theme}) => theme.colors['gray-900']};

  ${MEDEA_QUERY.MEDIUM} {
    font-size: 30px;
    margin-bottom: 20px;
  }
`

const ProfileModifyButton = styled.button`
  ${({theme}) => css`
    display: none;

    ${MEDEA_QUERY.MEDIUM} {
      display: inline-block;
      height: fit-content;
      background: none;
      padding: 2px 5px;
      margin-left: 10px;
      border: 0.5px solid ${theme.colors['gray-300']};
      border-radius: 3px;
    }
  `}
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const ProfileButton = styled.button`
  ${({theme, blue}) => css`
    padding: 5px 15px;
    background: ${blue ? theme.colors.blue : theme.colors['gray-50']};
    font-size: 14px;
    font-weight: 600;
    color: ${blue ? theme.colors.white : theme.colors['gray-500']};
    border: none;
    border-radius: 5px;
    outline: none;
    cursor: pointer;
  `}
`

const UserScoreList = styled.ul`
  display: flex;
  justify-content: space-evenly;
  gap: 30px;
  width: 100%;
  height: 56px;
  position: absolute;
  left: 0;
  bottom: 0;
  border-top: 0.5px solid ${({theme}) => theme.colors['gray-200']};
  border-bottom: 0.5px solid ${({theme}) => theme.colors['gray-200']};

  ${MEDEA_QUERY.MEDIUM} {
    justify-content: unset;
    height: auto;
    position: static;
    border: none;
    margin-bottom: 18px;
  }
`

const UserScoreItem = styled.li`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  justify-content: center;
  gap: 5px;

  ${MEDEA_QUERY.MEDIUM} {
    flex-direction: row;
  }
`

const UserScoreDescription = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${({theme}) => theme.colors['gray-900']};
  text-align: center;
`

const UserScore = styled(UserScoreDescription)`
  font-size: 14px;
  font-weight: 700;
`

const UserInfoWrapper = styled.div`
  margin-bottom: 20px;
`

const BasicParagraph = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: ${({theme}) => theme.colors['gray-500']};
  line-height: 20px;
`

const RealName = styled(BasicParagraph)`
  font-weight: 600;
  color: ${({theme}) => theme.colors['gray-900']};
  margin-bottom: 5px;
`

const Introduction = styled(BasicParagraph)`
  font-weight: 500;
  color: ${({theme}) => theme.colors['gray-900']};
`

export default UserProfile
