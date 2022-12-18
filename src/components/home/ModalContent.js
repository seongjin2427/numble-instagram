/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

import useToggle from '../../hooks/useToggle'
import ModifyStep from './ModifyStep'
import DetailModal from './DetailModal'

const ModalContent = props => {
  const {feedId, contentsList, feedLoginId, profileImage, feedText, feedCreatedAt, feedUpdatedAt, comments} = props
  const [toggleMore, onToggleMore] = useToggle()
  const [toggleModifyMode, onToggleModifyMode] = useToggle()

  return (
    <Container>
      {toggleModifyMode ? (
        <ModifyStep
          feedId={feedId}
          feedText={feedText}
          contentsList={contentsList}
          onToggleMore={onToggleMore}
          onToggleModifyMode={onToggleModifyMode}
        />
      ) : (
        <DetailModal
          feedId={feedId}
          feedLoginId={feedLoginId}
          contentsList={contentsList}
          feedText={feedText}
          feedCreatedAt={feedCreatedAt}
          feedUpdatedAt={feedUpdatedAt}
          comments={comments}
          profileImage={profileImage}
          toggleMore={toggleMore}
          onToggleMore={onToggleMore}
          onToggleModifyMode={onToggleModifyMode}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export default React.memo(ModalContent)
