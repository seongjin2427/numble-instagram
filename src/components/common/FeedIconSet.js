/* eslint-disable react/prop-types */
import React from 'react'
import styled, {css} from 'styled-components'

import Icons from './Icons'

const FeedIconSet = ({feedId}) => {
  return (
    <IconWrapper>
      <IconBox>
        <Icons icon='HeartIcon' size='20px' />
        <Icons icon='MessageIcon' size='20px' />
      </IconBox>
      <Icons icon='BookmarkIcon' size='20px' />
    </IconWrapper>
  )
}

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

export default FeedIconSet
