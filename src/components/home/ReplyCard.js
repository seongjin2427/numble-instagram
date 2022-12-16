import React from 'react'
import styled from 'styled-components'

import Typography from '../common/Typography'
import {convertRelativeTimeFormat} from '../../utils/timeformat'

// eslint-disable-next-line react/prop-types
const ReplyCard = ({id, loginId, profile_uri, commentText, updatedAt}) => {
  const converted = convertRelativeTimeFormat(updatedAt)

  return (
    <Container>
      <ProfileImageWrapper>
        <ProfileImage src={profile_uri} alt='profile' />
      </ProfileImageWrapper>
      <ProfileWrapper>
        <ReplyContent>
          <Typography as='span' fontSize='14px' fontWeight={600} color='gray-900' margin='0 5px 0 0'>
            {loginId}
          </Typography>
          <Typography as='span' display='inline' fontSize='14px' fontWeight={500} color='gray-900' lineHeight='130%'>
            {commentText}
          </Typography>
        </ReplyContent>
        <Typography as='span' fontSize='12px' color='gray-500'>
          {converted}
        </Typography>
      </ProfileWrapper>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 15px 20px 15px;
`

const ProfileWrapper = styled.div`
  flex: 1;
  padding: ;
`

const ProfileImageWrapper = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  overflow: hidden;
`

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
`

const ReplyContent = styled.div`
  margin-bottom: 3px;
`

export default ReplyCard
