import React, {useCallback, useEffect} from 'react'
import styled, {css} from 'styled-components'
import {getChatsListApi} from '../../api/chat'
import Profile from '../common/Profile'
import {RECOMMAND_FRIENDS} from '../../constants/sample'

const ChatList = () => {
  const loginId = localStorage.getItem('loginId')

  const getChattings = useCallback(async () => {
    const result = await getChatsListApi({pageIndex: 0, size: 10})
    console.log(result)
  }, [])

  useEffect(() => {
    getChattings()
  }, [getChattings])

  return (
    <Container>
      <ChatHeader>{loginId}</ChatHeader>
      <ChattingList>
        {RECOMMAND_FRIENDS.map(({loginId, src}) => (
          <ChattingItem key={loginId}>
            <Profile loginId={loginId} src={src} realName={'그랭 · 56초'} size='70px' gap='15px' />
          </ChattingItem>
        ))}
      </ChattingList>
    </Container>
  )
}

const Container = styled.div`
  ${({theme}) => css`
    width: 384px;
    border-right: 0.5px solid ${theme.colors['gray-200']};
  `}
`

const ChatHeader = styled.div`
  ${({theme}) => css`
    width: 100%;
    height: 64px;
    padding: 24px 24px 10px 24px;
    border-bottom: 0.5px solid ${theme.colors['gray-200']};
    font-size: 20px;
    font-weight: 500;
    color: ${theme.colors['gray-900']};
  `}
`

const ChattingList = styled.ul``

const ChattingItem = styled.li`
  padding: 15px 20px;
  cursor: pointer;
`

export default ChatList
