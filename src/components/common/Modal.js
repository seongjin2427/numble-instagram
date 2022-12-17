/* eslint-disable react/prop-types */
import React from 'react'
import styled, {css} from 'styled-components'

const Modal = ({children, width = '90vw', height = '90vh', toggle, onToggle}) => {
  const closeModal = () => onToggle(false)

  return (
    <>
      <Backdrop onClick={closeModal} toggle={toggle} />
      <Container width={width} height={height} toggle={toggle}>
        {children}
      </Container>
    </>
  )
}

const Container = styled.div`
  ${({theme, toggle, width, height}) => css`
    display: ${toggle ? 'block' : 'none'};
    width: ${width};
    max-width: 1072px;
    height: ${height};
    max-height: 700px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    background: ${theme.colors.white};
    border-radius: 10px;
    overflow: hidden;
    cursor: default;
  `}
`

const Backdrop = styled.div`
  ${({toggle}) => css`
    display: ${toggle ? 'block' : 'none'};
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 10;
    cursor: default;
  `}
`

export default Modal
