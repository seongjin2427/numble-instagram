/* eslint-disable react/prop-types */
import React from 'react'
import styled, {css} from 'styled-components'

const Button = ({
  children,
  fontColor = 'white',
  buttonColor = 'blue',
  disabledColor = 'lightblue',
  fontSize = '16px',
  style,
  ...args
}) => {
  return (
    <RawButton
      fontColor={fontColor}
      buttonColor={buttonColor}
      fontSize={fontSize}
      disabledColor={disabledColor}
      style={{...style}}
      {...args}
    >
      {children}
    </RawButton>
  )
}

const RawButton = styled.button`
  ${({theme, fontColor, buttonColor, fontSize, disabledColor}) => css`
    width: 100%;
    padding: 10px 0;
    border: none;
    border-radius: 9999px;
    background: ${theme.colors[buttonColor]};
    color: ${theme.colors[fontColor]};
    font-weight: 600;
    font-size: ${fontSize};
    cursor: pointer;

    :disabled {
      cursor: default;
      background: ${theme.colors[disabledColor]};
    }
  `};
`

export default Button
