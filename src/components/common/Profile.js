/* eslint-disable react/prop-types */
import React from 'react'
import styled, {css} from 'styled-components'

import Typography from './Typography'

const Profile = ({size = '80px', gap = '20px', src, loginId, color = 'gray-900', realName, style}) => {
  return (
    <ProfileWrapper gap={gap} style={style}>
      <ProfileImageWrapper size={size}>
        <ProfileImage src={src} alt='profile' />
      </ProfileImageWrapper>
      <TextWrapper>
        <LoginId color={color} style={realName ? null : {fontSize: '14px'}}>
          {loginId}
        </LoginId>
        {realName && (
          <Typography as='p' fontSize='16px' fontWeight={500} color='gray-500' margin='10px 0 0 0'>
            {realName}
          </Typography>
        )}
      </TextWrapper>
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
    border-radius: 50%;
    overflow: hidden;
  `}
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
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
