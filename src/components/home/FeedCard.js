import React from 'react'

import styled, {css} from 'styled-components'

const FeedCard = () => {
  return <Container>FeedCard</Container>
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
