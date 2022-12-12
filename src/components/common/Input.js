import React from 'react'
import styled from 'styled-components'
import Icons from './Icons'

// eslint-disable-next-line react/prop-types
const CommonInput = ({icon, placeholder, isDirty, alert}) => {
  return (
    <InputWrapper>
      <Icon>
        <Icons size='20px' icon={icon} />
      </Icon>
      <Input placeholder={placeholder} maxLength={20} />
      {isDirty && (alert ? <Icons size='20px' icon='XCircleIcon' /> : <Icons size='20px' icon='CheckCircleIcon' />)}
    </InputWrapper>
  )
}

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 8px;

  width: 320px;
  height: 50px;
  line-height: 20px;
  background: #ffffff;

  border: 1px solid #b2b2b2;
  border-radius: 9999px;
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
`

const Input = styled.input`
  width: 258px;
  height: 20px;

  font-weight: 500;
  font-size: 16px;
  border: none;
  outline: none;

  ::placeholder {
    color: ${({theme}) => theme.colors['gray-500']};
  }
`

const Icon = styled.i`
  display: flex;
  align-items: center;

  svg {
    stroke: ${({theme}) => theme.colors['gray-500']};
  }
`

export default CommonInput
