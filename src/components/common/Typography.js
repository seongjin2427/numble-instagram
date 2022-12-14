import React from 'react'
import theme from '../../style/theme'

// eslint-disable-next-line react/prop-types
const Typography = ({as: Component = 'span', children, fontWeight, fontSize, color, textAlign, cursor}) => {
  return <Component style={{fontSize, fontWeight, textAlign, cursor, color: theme.colors[color]}}>{children}</Component>
}

export default Typography
