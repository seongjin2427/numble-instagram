import React from 'react'
import theme from '../../style/theme'

// eslint-disable-next-line react/prop-types
const Typography = ({as: Component, children, fontWeight, fontSize, color, textAlign}) => {
  return <Component style={{fontSize, fontWeight, textAlign, color: theme.colors[color]}}>{children}</Component>
}

export default Typography
