/* eslint-disable react/prop-types */
import React from 'react'
import theme from '../../style/theme'

const Typography = ({
  as: Component = 'span',
  children,
  display,
  fontWeight,
  fontSize,
  lineHeight,
  color,
  textAlign,
  margin,
  wordBreak,
  cursor,
}) => {
  return (
    <Component
      style={{
        display,
        lineHeight,
        fontSize,
        fontWeight,
        textAlign,
        cursor,
        margin,
        wordBreak,
        color: theme.colors[color],
      }}
    >
      {children}
    </Component>
  )
}

export default Typography
