import React from 'react'
import styled from 'styled-components'

import ChatList from '../../components/chat/ChatList'
import ChatWindow from '../../components/chat/ChatWindow'

const Chat = () => {
  return (
    <Container>
      <ChatCard>
        <ChatList />
        <ChatWindow />
      </ChatCard>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: calc(100vh - 80px);
  padding-bottom: 60px;
`

const ChatCard = styled.div`
  display: flex;
  width: 1007px;
  height: 854px;
  border-radius: 10px;
  background: ${({theme}) => theme.colors.white};
`

export default Chat
