/* eslint-disable react/prop-types */
import styled, {css} from 'styled-components'
import {useNavigate} from 'react-router-dom'
import React, {useCallback, useEffect, useRef, useState} from 'react'

import Icons from '../../../components/common/Icons'
import Profile from '../../../components/common/Profile'
import {RECOMMAND_FRIENDS} from '../../../constants/sample'
import {getChatsListApi, sendChatApi} from '../../../api/chat'

const ChatWindow = () => {
  const [chatting, setChatting] = useState([])
  const [target, setTarget] = useState(null)
  const {current: page} = useRef({pageIndex: 0, size: 30})
  const scrollRef = useRef()
  const navigate = useNavigate()

  const myId = localStorage.getItem('loginId')
  const isLogin = localStorage.getItem('jwt')
  const other = RECOMMAND_FRIENDS[0]

  const getChatList = useCallback(
    async init => {
      const {isSuccess, result} = await getChatsListApi(page)
      if (isSuccess) {
        init ? setChatting(result) : setChatting(prev => [...prev, ...result])
        page.pageIndex += 1
      }
    },
    [page],
  )

  const sendChat = async chat => {
    const {isSuccess} = await sendChatApi(chat)
    if (!isSuccess) {
      alert('채팅 전송에 실패했습니다.')
      return
    }

    page.pageIndex = 0
    getChatList(true)
  }

  const validateAndSendChat = chat => {
    const validated = chat.trim()
    sendChat(validated)
  }

  const intersect = useCallback(
    async ([entry], observer) => {
      if (entry.isIntersecting) {
        setTimeout(async () => {
          observer.unobserve(entry.target)
          const temp = scrollRef.current.scrollTop
          await getChatList()
          scrollRef.current.scrollTop = temp
        }, 400)
      }
    },
    [getChatList],
  )

  useEffect(() => {
    if (target) {
      const observer = new IntersectionObserver(intersect)
      observer.observe(target)
      setTarget(null)
      return () => observer && observer.disconnect()
    }
  }, [target, intersect])

  useEffect(() => {
    getChatList()
  }, [getChatList])

  useEffect(() => {
    if (!isLogin) {
      navigate('/login')
    }
  }, [isLogin, navigate])

  return (
    <Container>
      <ChatWindowHeader>
        <Profile loginId={other.loginId} src={other.src} size='40px' gap='10px' fontSize='20px' chip />
      </ChatWindowHeader>
      <ChatWindowBody ref={scrollRef}>
        {chatting.map(({chatId, loginId, content}, idx) =>
          myId === loginId ? (
            <MyChatWrapper key={chatId} ref={idx === chatting.length - 1 ? setTarget : null}>
              <MyChat>{content}</MyChat>
            </MyChatWrapper>
          ) : (
            <OtherChatWrapper key={chatId} ref={idx === chatting.length - 1 ? setTarget : null}>
              <Profile src={other.src} size='40px' chip />
              <OtherChat>{content}</OtherChat>
            </OtherChatWrapper>
          ),
        )}
      </ChatWindowBody>
      <ChattingInput validateAndSendChat={validateAndSendChat} />
    </Container>
  )
}

const ChattingInput = ({validateAndSendChat}) => {
  const textRef = useRef()
  const [chat, setChat] = useState('')

  const onChangeChat = e => {
    setChat(e.target.value)
    const height = textRef.current.scrollHeight
    if (height < 146) {
      textRef.current.style.height = '48px'
      textRef.current.style.height = textRef.current.scrollHeight + 'px'
    }
  }

  const clickHandler = () => {
    if (chat.trim().length > 0) {
      setChat('')
      textRef.current.style.height = '46px'
      validateAndSendChat(chat)
    }
  }

  return (
    <ChatWindowInputWrapper>
      <ChatInput ref={textRef} value={chat} maxLength={200} onChange={onChangeChat} />
      <SendButton onClick={clickHandler}>
        <Icons icon='SendIcon' size='20px' />
      </SendButton>
    </ChatWindowInputWrapper>
  )
}

const Container = styled.div`
  flex: 1;
  min-height: 752px;
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

const ChatWindowBody = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex: 1;
  gap: 25px;
  padding: 30px;
  overflow: scroll;
`

const OtherChatWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
`

const OtherChat = styled.div`
  ${({theme}) => css`
    padding: 10px 15px;
    max-width: 306px;
    max-height: 135px;
    background: ${theme.colors['gray-100']};
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 0px 8px 8px 8px;
    line-height: 24px;
    color: ${theme.colors['gray-900']};
    overflow: scroll;
  `}
`

const MyChatWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: -25px;
`

const MyChat = styled.div`
  ${({theme}) => css`
    padding: 10px 15px;
    max-width: 300px;
    max-height: 135px;
    background: ${theme.colors.blue};
    box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06);
    border-radius: 8px 0px 8px 8px;
    line-height: 24px;
    color: ${theme.colors.white};
    overflow: scroll;
  `}
`

const ChatWindowInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  height: 76px;
  padding: 15px 30px;
  border-top: 1px solid ${({theme}) => theme.colors['gray-200']};
`

const ChatInput = styled.textarea`
  ${({theme}) => css`
    width: 100%;
    height: 100%;
    padding: 10px 14px;
    background: #ffffff;
    border: 1px solid ${theme.colors['gray-300']};
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;
    outline: none;
    resize: none;
    font-size: 16px;
    line-height: 25px;

    -ms-overflow-style: none;
    scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none;
    }
  `}
`

const SendButton = styled.button`
  ${({theme}) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    aspect-ratio: 1 / 1;
    background: ${theme.colors.blue};
    border: none;
    border-radius: 5px;
    outline: none;

    svg {
      stroke: ${theme.colors.white};
    }
  `}
`

export default ChatWindow
