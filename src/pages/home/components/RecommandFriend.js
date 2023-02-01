/* eslint-disable react/prop-types */
import React from 'react'
import {useSelector} from 'react-redux'

import styled from 'styled-components'
import Profile from '../../../components/common/Profile'
import Typography from '../../../components/common/Typography'

import sample from '../../../assets/images/sample_profile.svg'

const RecommandFriend = ({friends}) => {
  const {loginId, realName} = useSelector(({LoginReducer}) => LoginReducer.user)

  return (
    <Container>
      <Profile src={sample} loginId={loginId} realName={realName} style={{marginBottom: '30px'}} />
      <RecommandList>
        <RecommandItem style={{marginBottom: '20px'}}>
          <Typography as='p' fontSize='15px' color='gray-500' fontWeight={600}>
            회원님을 위한 추천
          </Typography>
          <Typography as='p' fontSize='14px' color='gray-900' fontWeight={700}>
            모두 보기
          </Typography>
        </RecommandItem>
        {friends.map(({loginId: fId, src}) => (
          <RecommandItem key={fId} style={{marginBottom: '7px'}}>
            <Profile src={src} size='30px' loginId={fId} />
            <Typography as='p' fontSize='14px' color='blue' fontWeight={700} cursor='pointer'>
              팔로우
            </Typography>
          </RecommandItem>
        ))}
      </RecommandList>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  margin-top: 25px;
`

const RecommandList = styled.ul``

const RecommandItem = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export default RecommandFriend
