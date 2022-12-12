import React from 'react'
import styled from 'styled-components'

// eslint-disable-next-line react/prop-types
const Container = ({css, children}) => {
  return <RawContainer css={css}>{children}</RawContainer>
}

const RawContainer = styled.div`
  ${({css}) => css}
`

export default Container
