import React from 'react'

import * as IconSet from '../../assets/icons'

// eslint-disable-next-line react/prop-types
const Icons = ({icon, size, ...args}) => {
  const Component = IconSet[icon]
  return (
    <Component width={size} height={size} {...args}>
      Icons
    </Component>
  )
}

export default Icons
