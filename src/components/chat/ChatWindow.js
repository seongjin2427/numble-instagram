import React from 'react'
import styled, {css} from 'styled-components'
import Profile from '../common/Profile'
import {RECOMMAND_FRIENDS} from '../../constants/sample'

const ChatWindow = () => {
  const loginId = localStorage.getItem('loginId')

  return (
    <Container>
      <ChatWindowHeader>
        <Profile
          loginId={RECOMMAND_FRIENDS[0].loginId}
          src={RECOMMAND_FRIENDS[0].src}
          size='40px'
          gap='10px'
          fontSize='20px'
        />
        <ChatChip />
      </ChatWindowHeader>
    </Container>
  )
}

const Container = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const ChatWindowHeader = styled.div`
  ${({theme}) => css`
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: 64px;
    position: relative;
    padding: 0 24px 10px 24px;
    border-bottom: 0.5px solid ${theme.colors['gray-200']};
    font-size: 20px;
    font-weight: 500;
    color: ${theme.colors['gray-900']};

    & > div {
      align-items: flex-end;
    }

    & p {
      padding-bottom: 5px;
    }
  `}
`

const ChatChip = styled.div`
  width: 12px;
  height: 12px;
  position: absolute;
  left: 52px;
  top: 42px;
  background: #12b76a;
  border: 2px solid #ffffff;
  border-radius: 50%;
`

const ChatWindowBody = styled.div``

const ChatWindowInputWrapper = styled.div``

export default ChatWindow
