/* eslint-disable react/prop-types */
import React from 'react'
import styled from 'styled-components'

import Icons from '../common/Icons'
import Typography from '../common/Typography'

const AddNewImageStep = ({thumbnails, onInputImage}) => {
  return (
    <NewImageContainer onClick={onInputImage}>
      {thumbnails.length ? (
        <Thumbnail src={thumbnails[0]} alt='img' />
      ) : (
        <>
          <IconWrapper>
            <Icons icon='ImageIcon' size='72px' />
          </IconWrapper>
          <Typography fontSize='24px' fontWeight={500} color='gray-500'>
            사진과 동영상을 여기에 끌어다 놓으세요
          </Typography>
        </>
      )}
    </NewImageContainer>
  )
}

const NewImageContainer = styled.div`
  width: 650px;
  height: 590px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const IconWrapper = styled.div`
  margin-bottom: 32px;
`

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export default AddNewImageStep
