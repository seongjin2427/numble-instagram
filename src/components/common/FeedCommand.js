/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import styled, {css} from 'styled-components'

import Profile from './Profile'

const FeedCommand = ({profile}) => {
  const [command, setCommand] = useState('')

  const onChangeCommand = e => setCommand(e.target.value)

  const clickHandler = e => {
    e.preventDefault()
  }

  return (
    <CommandWrapper>
      {profile && <Profile size='30px' src={profile} color='gray-900' />}
      <Input type='text' placeholder='댓글 달기...' onChange={onChangeCommand} value={command} />
      <CommandButton onClick={clickHandler} disabled={!command.length}>
        게시
      </CommandButton>
    </CommandWrapper>
  )
}

const CommandWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  height: 60px;
  padding: 0 0 0 17px;
  border-top: 0.5px solid ${({theme}) => theme.colors['gray-300']};
`

const Input = styled.input`
  width: 100%;
  height: 20px;
  font-size: 14px;
  flex: 1;
  border: none;
  outline: none;

  ::placeholder {
    color: ${({theme}) => theme.colors['gray-300']};
  }
`

const CommandButton = styled.button`
  ${({theme}) => css`
    height: 100%;
    background: none;
    border: none;
    outline: none;
    color: ${theme.colors.blue};
    font-weight: 700;
    font-size: 14px;
    padding: 0 15px;

    :disabled {
      color: #b2ddff;
    }
  `}
`
export default FeedCommand
