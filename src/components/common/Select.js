/* eslint-disable react/prop-types */
import styled, {css} from 'styled-components'
import {useFormContext} from 'react-hook-form'
import React, {forwardRef, useState} from 'react'

import Icons from './Icons'

const Select = ({children, id, initial, width = '100px', ...args}, ref) => {
  const {setValue, trigger, watch} = useFormContext()
  const watchedValue = watch(id)

  const [toggle, setToggle] = useState(false)
  const [option, setOption] = useState(watchedValue)

  const onToggle = () => setToggle(!toggle)
  const changeValue = v => {
    setOption(v)
    setValue(id, v)
    trigger(id)
    onToggle()
  }

  return (
    <>
      <Backdrop toggle={toggle} onClick={onToggle} />
      <Container width={width}>
        <input id={id} value={watchedValue || option || initial} ref={ref} {...args} hidden />
        <Button type='button' onClick={onToggle}>
          <P>{option || initial}</P>
          <Icons icon='ChevronDownIcon' size='12px' />
        </Button>
        <SelectList toggle={toggle}>
          {children.map(v => (
            <SelectItem key={v} onClick={() => changeValue(v)}>
              {v}
              {(v === initial || v === option) && <Icons icon='CheckIcon' size='14px' />}
            </SelectItem>
          ))}
        </SelectList>
      </Container>
    </>
  )
}

const Container = styled.div`
  width: ${({width}) => width};
  position: relative;
`
const Button = styled.button`
  ${({theme}) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 44px;
    padding: 10px 14px;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors['gray-300']};
    border-radius: 8px;
    cursor: pointer;
  `}
`

const Backdrop = styled.div`
  display: ${({toggle}) => (toggle ? 'block' : 'none')};
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: transparent;
  z-index: 10;
`

const P = styled.p`
  font-size: 16px;
  color: ${({theme}) => theme.colors['gray-500']};
`

const SelectList = styled.ul`
  ${({theme, toggle}) => css`
    display: ${toggle ? 'block' : 'none'};
    width: 100%;
    max-height: 533px;
    position: absolute;
    top: -250px;
    left: -2px;
    background: ${theme.colors.white};
    border: 1px solid ${theme.colors['gray-100']};
    border-radius: 8px;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    overflow: scroll;
    z-index: 11;

    -ms-overflow-style: none;
    scrollbar-width: none;

    ::-webkit-scrollbar {
      display: none; /* Chrome, Safari, Opera*/
    }
  `}
`

const SelectItem = styled.li`
  ${({theme, active}) => css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px 14px;
    background: ${theme.colors[active ? 'gray-50' : 'white']};
    color: ${theme.colors['gray-900']};
    font-weight: 500;

    :hover {
      background: ${theme.colors['gray-50']};
      cursor: pointer;
    }
  `}
`

export default forwardRef(Select)
