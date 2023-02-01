import React from 'react'
import AppHeader from './AppHeader'
import styled from 'styled-components'
import {Outlet} from 'react-router'
import {MEDEA_QUERY} from '../style/mediaQuery'

const DefaultLayout = () => {
  return (
    <Root>
      <AppHeader />
      <Outlet />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100%;
  background: ${({theme}) => theme.colors.white};

  ${MEDEA_QUERY.MEDIUM} {
    background: ${({theme}) => theme.colors['gray-50']};
  }
`

export default DefaultLayout
