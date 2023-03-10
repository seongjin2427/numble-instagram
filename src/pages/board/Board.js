import React from 'react'
import styled from 'styled-components'
import ModalContent from '../../pages/home/components/FeedDetail'

const Board = () => {
  return (
    <Container>
      <DetailCard>
        <ModalContent />
      </DetailCard>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
`

const DetailCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1072px;
  height: 698px;
  background: ${({theme}) => theme.colors.white};
  border-radius: 10px;
  overflow: hidden;
`

export default Board
