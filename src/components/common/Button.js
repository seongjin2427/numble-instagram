import React from 'react'
import styled, {css} from 'styled-components'

// eslint-disable-next-line react/prop-types
const Button = ({children, fontColor = 'white', buttonColor = 'blue', disabledColor = 'lightblue', ...args}) => {
  return (
    <RawButton fontColor={fontColor} buttonColor={buttonColor} disabledColor={disabledColor} {...args}>
      {children}
    </RawButton>
  )
}

const RawButton = styled.button`
  ${({theme, fontColor, buttonColor, disabledColor}) => css`
    width: 100%;
    padding: 10px 0;
    border: none;
    border-radius: 9999px;
    background: ${theme.colors[buttonColor]};
    color: ${theme.colors[fontColor]};
    font-weight: 600;
    font-size: 16px;
    cursor: pointer;

    :disabled {
      background: ${theme.colors[disabledColor]};
    }
  `};
`

export default Button
