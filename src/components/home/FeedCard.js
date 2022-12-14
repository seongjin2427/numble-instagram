import React from 'react'

import styled, {css} from 'styled-components'
import Carousel from './Carousel'

import NewYork from '../../assets/images/newyork.svg'

const imgArr = new Array(30).fill(NewYork)

const FeedCard = () => {
  return (
    <Container>
      <Carousel>
        {imgArr.map((img, idx) => (
          <div key={idx}>
            <img src={img} alt={'img'} />
          </div>
        ))}
      </Carousel>
    </Container>
  )
}

const Container = styled.div`
  ${({theme}) => css`
    width: 100%;
    height: 757px;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors['gray-200']};
    border-radius: 10px;
  `}
`

const FeedImageWrapper = styled.div``

export default FeedCard
