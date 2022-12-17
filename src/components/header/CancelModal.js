/* eslint-disable react/prop-types */
import React from 'react'
import styled, {css} from 'styled-components'

const CancelModal = ({removeToggle, cancelToggle, title, subtitle}) => {
  return (
    <NotificationContainer>
      <NotificationWrapper>
        <Notification title='true'>{title}</Notification>
        <Notification>{subtitle}</Notification>
      </NotificationWrapper>
      <CancelButton red onClick={() => removeToggle(false)}>
        삭제
      </CancelButton>
      <CancelButton onClick={cancelToggle}>취소</CancelButton>
    </NotificationContainer>
  )
}

const NotificationContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

const NotificationWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray-300']};
`

const Notification = styled.p`
  ${({theme, title}) => css`
    color: ${title ? theme.colors['gray-900'] : theme.colors['gray-500']};
    font-weight: ${title ? 600 : 500};
    margin-bottom: ${title ? '10px' : 0};
  `}
`

const CancelButton = styled.button`
  ${({theme, red}) => css`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    outline: none;
    border-bottom: 1px solid ${theme.colors['gray-300']};
    color: ${red ? theme.colors.red : theme.colors.black};
    font-size: 14px;
    font-weight: ${red ? 600 : 500};
    cursor: pointer;
  `}
`

export default CancelModal
