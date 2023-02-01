/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'
import {useSelector} from 'react-redux'

import useToggle from '../../../hooks/useToggle'
import ModifyStep from './ModifyStep'
import DetailModal from './DetailCard'

const FeedDetail = () => {
  const {feedId} = useSelector(({FeedReducer}) => FeedReducer.feed)
  const [toggleMore, onToggleMore] = useToggle()
  const [toggleModifyMode, onToggleModifyMode] = useToggle()

  return (
    <Container>
      {feedId &&
        (toggleModifyMode ? (
          <ModifyStep onToggleMore={onToggleMore} onToggleModifyMode={onToggleModifyMode} />
        ) : (
          <DetailModal toggleMore={toggleMore} onToggleMore={onToggleMore} onToggleModifyMode={onToggleModifyMode} />
        ))}
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

export default React.memo(FeedDetail)
