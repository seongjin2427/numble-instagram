import React from 'react'

import * as IconSet from '../../assets/icons'

// 타입은 그래도 값에서 타입을 뽑거나 하는
// 순서는 최후의 방법으로 사용하는것이 좋다!!
// 이것은 많이 헷갈릴 수 있다!!

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
