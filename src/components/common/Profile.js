/* eslint-disable react/prop-types */
import React from 'react'
import styled, {css} from 'styled-components'

import Typography from './Typography'

const Profile = ({
  size = '80px',
  gap = '20px',
  src,
  loginId,
  color = 'gray-900',
  realName,
  fontSize = '14px',
  chip,
  style,
}) => {
  return (
    <ProfileWrapper gap={gap} style={style}>
      <ProfileImageWrapper size={size}>
        <ProfileImage src={src} alt='profile' />
        {chip && <ChatChip />}
      </ProfileImageWrapper>
      {loginId && (
        <TextWrapper>
          <LoginId color={color} style={realName ? null : {fontSize}}>
            {loginId}
          </LoginId>
          {realName && (
            <Typography as='p' fontSize='16px' fontWeight={500} color='gray-500' margin='10px 0 0 0'>
              {realName}
            </Typography>
          )}
        </TextWrapper>
      )}
    </ProfileWrapper>
  )
}

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({gap}) => gap};
`

const ProfileImageWrapper = styled.div`
  ${({size}) => css`
    width: ${size};
    height: ${size};
    position: relative;
  `}
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: contain;
`

const ChatChip = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  right: 0;
  bottom: 0;
  background: #12b76a;
  border: 2px solid #ffffff;
  border-radius: 50%;
`

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const LoginId = styled.p`
  ${({color}) => css`
    display: flex;
    align-items: center;
    font-size: 18px;
    font-weight: 600;
    color: ${color};
  `}
`

export default Profile
