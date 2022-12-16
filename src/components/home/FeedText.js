/* eslint-disable react/prop-types */
import React from 'react'
import styled, {css} from 'styled-components'

import useToggle from '../../hooks/useToggle'
import Typography from '../common/Typography'

const FeedText = ({feedLoginId, feedText}) => {
  const [toggle, onToggle] = useToggle()
  const overLength = feedText.length >= 100

  return (
    <Content toggle={toggle} overLength={overLength}>
      <Typography as='span' display='inline-block' margin='0 5px 7px 0' fontWeight={700}>
        {feedLoginId}
      </Typography>
      <Typography as='span' wordBreak='break-word' lineHeight='150%'>
        {overLength ? toggle && feedText.split(' ').slice(0, 4).join(' ') + '... ' : toggle && feedText + ' '}
        {!overLength && feedText + ' '}
      </Typography>
      {overLength && <More onClick={() => onToggle(!toggle)}>{toggle ? '접기' : null}</More>}
    </Content>
  )
}

const Content = styled.div`
  width: 100%;
  margin-bottom: 10px;
  font-size: 14px;

  ${({toggle, overLength}) =>
    overLength && !toggle
      ? css`
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        `
      : null}
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

export default FeedText
