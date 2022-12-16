/* eslint-disable react/prop-types */
import React from 'react'
import styled, {css} from 'styled-components'

const Modal = ({children, toggle, onToggle}) => {
  const closeModal = () => onToggle(false)

  return (
    <>
      <Backdrop onClick={closeModal} toggle={toggle} />
      <Container toggle={toggle}>{children}</Container>
    </>
  )
}

const Container = styled.div`
  ${({theme, toggle}) => css`
    display: ${toggle ? 'block' : 'none'};
    width: 90vw;
    max-width: 1072px;
    height: 90vh;
    max-height: 700px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
    background: ${theme.colors.white};
    border-radius: 10px;
    overflow: hidden;
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
  `}
`

export default Modal
