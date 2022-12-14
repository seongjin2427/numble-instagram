import React from 'react'
import styled from 'styled-components'
import {Outlet} from 'react-router'

const AuthLayout = () => {
  return (
    <Root>
      <Outlet />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  justify-content: center;
`

export default AuthLayout
