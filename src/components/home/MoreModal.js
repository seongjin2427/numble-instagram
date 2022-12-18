/* eslint-disable react/prop-types */
import React from 'react'
import styled, {css} from 'styled-components'

const MoreModal = ({isAuthor, onToggle, onToggleModifyMode, checkRemoveFeed}) => {
  const moveToModifyModal = () => {
    if (isAuthor) {
      onToggleModifyMode(true)
    }
  }

  return (
    <MoreList>
      <MoreItem remove onClick={checkRemoveFeed}>
        삭제
      </MoreItem>
      <MoreItem onClick={moveToModifyModal}>수정</MoreItem>
      <MoreItem>좋아요 수 숨기기</MoreItem>
      <MoreItem>댓글 기능 해제</MoreItem>
      <MoreItem>게시물로 이동</MoreItem>
      <MoreItem>공유 대상...</MoreItem>
      <MoreItem>링크복사</MoreItem>
      <MoreItem>퍼가기</MoreItem>
      <MoreItem onClick={() => onToggle(false)}>취소</MoreItem>
    </MoreList>
  )
}

const MoreList = styled.ul`
  width: 100%;
`

const MoreItem = styled.li`
  ${({theme, remove}) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    border-bottom: 1px solid ${theme.colors['gray-300']};
    font-size: 14px;
    color: ${remove ? theme.colors.red : theme.colors['gray-900']};
    font-weight: ${remove ? 600 : 500};
    cursor: pointer;
  `}
`

export default MoreModal
