import styled, {css} from 'styled-components'
import {useFormContext} from 'react-hook-form'
import React, {useState, forwardRef} from 'react'

import Icons from './Icons'

// eslint-disable-next-line react/prop-types
const CommonInput = ({id, icon, placeholder, alert, type, nextFocus, showCheckCircle = true, ...args}, ref) => {
  const [toggle, setToggle] = useState(false)
  const {watch, setFocus} = useFormContext()
  const watchValue = watch(id)
  const isPassword = type === 'password' ? (toggle ? 'text' : 'password') : undefined

  const moveCursorNextFocus = e => {
    if (e.key === 'Enter') {
      setFocus(nextFocus)
    }
  }

  const onToggle = () => setToggle(!toggle)

  return (
    <InputWrapper>
      <Icon>
        <Icons size='20px' icon={icon} />
      </Icon>
      <Input
        placeholder={placeholder}
        defaultValue={watchValue}
        type={isPassword || type}
        onKeyUp={moveCursorNextFocus}
        ref={ref}
        {...args}
      />

      {type !== 'password' ? (
        showCheckCircle &&
        watchValue &&
        (alert ? (
          <Icon>
            <Icons size='20px' icon='XCircleIcon' />
          </Icon>
        ) : (
          <Icon>
            <Icons size='20px' icon='CheckCircleIcon' />
          </Icon>
        ))
      ) : (
        <Wrapper toggle={toggle} onClick={onToggle}>
          {showCheckCircle && (
            <Icon>
              <Icons size='20px' icon='CheckCircleIcon' />
            </Icon>
          )}
          {watchValue && (toggle ? <P>숨기기</P> : <P>비밀번호 표시</P>)}
        </Wrapper>
      )}
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

  svg {
    stroke: ${({theme}) => theme.colors['gray-500']};
  }
`

const Input = styled.input`
  width: 100%;
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
`

const Wrapper = styled.div`
  ${({toggle}) => css`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 3px;
    width: ${toggle ? '120px' : '320px'};
    cursor: pointer;
  `}
`

const P = styled.p`
  width: 100%;
  color: ${({theme}) => theme.colors['gray-900']};
  text-align: right;
  font-weight: 600;
`

export default forwardRef(CommonInput)
