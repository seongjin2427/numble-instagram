import React from 'react'
import styled, {css} from 'styled-components'

import Sample1 from '../../assets/images/sample_1.svg'
import Sample2 from '../../assets/images/sample_2.svg'
import Sample3 from '../../assets/images/sample_3.svg'
import Sample4 from '../../assets/images/sample_4.svg'

const FeedTop = () => {
  const profileImage = [Sample1, Sample2, Sample3, Sample4]
  return (
    <Container>
      {profileImage.map((p, idx) => (
        <ProfileWrapper key={idx}>
          <Profile src={p} alt={'profile'} />
        </ProfileWrapper>
      ))}
    </Container>
  )
}

const Container = styled.div`
  ${({theme}) => css`
    display: flex;
    align-items: center;
    gap: 8px;
    width: 100%;
    height: 130px;
    margin-bottom: 15px;
    padding: 20px;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors['gray-200']};
    border-radius: 10px;
  `}
`

const ProfileWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background: linear-gradient(209.83deg, #1570ef 7.74%, #9eeff4 94.51%);
`

const Profile = styled.img`
  width: 80px;
  height: 80px;
  border: 4px solid ${({theme}) => theme.colors.white};
  border-radius: 50%;
`

export default FeedTop
