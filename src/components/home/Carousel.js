import React from 'react'
import Slick from 'react-slick'
import styled, {css} from 'styled-components'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Icons from '../common/Icons'

// eslint-disable-next-line react/prop-types
const ArrowButton = ({direction, onClick, className}) => {
  const arrow = {
    left: 'ChevronLeftIcon',
    right: 'ChevronRightIcon',
  }

  return (
    <ButtonWrapper direction={direction} onClick={onClick}>
      <Icons icon={arrow[direction]} size='25px' className={className} />
    </ButtonWrapper>
  )
}

const DEFAULT_SETTINGS = {
  dots: true,
  arrows: true,
  infinite: false,
  prevArrow: <ArrowButton direction='left' />,
  nextArrow: <ArrowButton direction='right' />,
}

// eslint-disable-next-line react/prop-types
const Carousel = ({settings = DEFAULT_SETTINGS, children}) => {
  return (
    <SlickWrapper>
      <Slick {...settings}>{children}</Slick>
    </SlickWrapper>
  )
}

const SlickWrapper = styled.div`
  ${({theme}) => css`
    .slick-dots li {
      margin: 0;
    }

    .slick-dots li:not(:nth-of-type(-n + 10)) {
      display: none;
    }

    .slick-dots .slick-active button::before {
      color: ${theme.colors.blue};
    }

    .slick-dots button::before {
      color: ${theme.colors['gray-5']};
      opacity: 1;
    }
  `}
`

const ButtonWrapper = styled.button`
  ${({theme, direction}) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    background: ${theme.colors.black}77;
    position: absolute;
    top: 50%;
    ${direction === 'left' ? 'left' : 'right'}: 20px;
    transform: translateY(-50%);
    border: none;
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;

    svg {
      stroke: ${theme.colors.white};
    }

    .slick-arrow {
      position: absolute;
      ${direction === 'left' ? 'left' : 'right'}: 4px;
    }

    .slick-disabled {
      stroke: ${theme.colors['gray-300']};
      cursor: default;
    }
  `}
`

export default Carousel
