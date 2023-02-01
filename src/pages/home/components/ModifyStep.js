/* eslint-disable react/prop-types */
import styled, {css} from 'styled-components'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import React, {useState} from 'react'

import Modal from '../../../components/common/Modal'
import useToggle from '../../../hooks/useToggle'
import Typography from '../../../components/common/Typography'
import CancelModal from '../../../components/header/CancelModal'
import CreateFeedStep from '../../../components/header/CreateFeedStep'
import {updateFeedApi} from '../../../api/feed'

const ModifyStep = ({onToggleMore, onToggleModifyMode}) => {
  const {feedId, contentsList, feedText} = useSelector(({FeedReducer}) => FeedReducer.feed)
  const navigate = useNavigate()

  const [toggleCancelModal, onToggleCancelModal] = useToggle()
  const [modifiedText, setModifiedText] = useState(feedText)

  const thumbnails = contentsList.map(({contentsUrl}) => contentsUrl)

  const cancelModifyMode = () => {
    onToggleCancelModal(!toggleCancelModal)
  }

  const cancelModify = () => {
    setModifiedText(feedText)
    onToggleCancelModal(!toggleCancelModal)
    onToggleMore(false)
    onToggleModifyMode(false)
  }

  const updateFeed = async () => {
    const result = await updateFeedApi(feedId, modifiedText)
    if (result) {
      alert('수정되었습니다.')
    } else {
      alert('에러가 발생하였습니다. 다시 시도해주세요.')
    }
    navigate('/')
  }
  return (
    <ModifyWrapper>
      <Header>
        <HeaderButton onClick={cancelModifyMode}>취소</HeaderButton>
        <Typography color='gray-900' fontSize='20px' fontWeight={600}>
          정보수정
        </Typography>
        <HeaderButton blue onClick={updateFeed}>
          완료
        </HeaderButton>
      </Header>
      <CreateFeedStep thumbnails={thumbnails} feedText={modifiedText} setFeedText={setModifiedText} />
      {toggleCancelModal && (
        <Modal width='448px' height='223px' toggle={toggleCancelModal} onToggle={onToggleCancelModal}>
          <CancelModal
            title='게시물을 삭제하시겠어요?'
            subtitle='지금 나가면 수정 내용이 저장되지 않습니다'
            removeToggle={cancelModify}
            cancelToggle={cancelModifyMode}
          />
        </Modal>
      )}
    </ModifyWrapper>
  )
}

const ModifyWrapper = styled.div`
  width: 100%;
`

const Header = styled.div`
  display: flex;
  height: 60px;
  padding: 0 15px;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray-300']};
`

const HeaderButton = styled.button`
  ${({theme, blue}) => css`
    font-size: 18px;
    font-weight: ${blue ? 600 : 500};
    color: ${blue ? theme.colors.blue : theme.colors['gray-500']};
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
  `}
`

export default ModifyStep
