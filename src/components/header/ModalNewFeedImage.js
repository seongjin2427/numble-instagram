import React, {useRef, useState} from 'react'
import styled, {css} from 'styled-components'
import Icons from '../common/Icons'
import Typography from '../common/Typography'

const ModalNewFeedImage = () => {
  const [imageList, setImageList] = useState([])
  const [thumbnail, setThumbnail] = useState()
  const imgRef = useRef(null)

  const onInputImage = () => {
    imgRef.current.click()
  }

  const onChangeImage = e => {
    const files = e.target.files

    if (files.length) {
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = function () {
        const result = reader.result
        setThumbnail(result)
        console.log(reader.result)
      }

      handleFiles(files)
    }
  }

  const onDropFiles = e => {
    e.preventDefault()

    handleFiles(e.dataTransfer.files)
  }

  const handleFiles = files => {
    console.log('files', files)
    let fileList = []

    if (files.length > 10) {
      alert(`10개 이상의 파일을 업로드 할 수 없습니다.\n업로드 된 이미지 개수 : ${files.length}개 (최대 10개)`)
      return
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const format = `${file.name.split('.').slice(-1)}`.toUpperCase()
      if (format === 'JPG' || format === 'JPEG' || format === 'PNG' || format === 'PDF') {
        fileList = [...fileList, file]
      } else {
        alert(`이미지 포맷을 확인해주세요.업로드 된 파일 이름 ${file.name} / 포맷 ${format}`)
        return
      }
    }

    if (fileList.length > 0) {
      setImageList(fileList)
    }
  }

  const onDragOver = e => {
    e.preventDefault()
  }

  return (
    <Container>
      <Header>
        <PrevButton>
          <Icons icon='ArrowLeftIcon' size='15px' />
        </PrevButton>
        <Typography fontSize='20px' fontWeight={600} color='gray-900'>
          새 게시물 만들기
        </Typography>
        <NextButton>다음</NextButton>
      </Header>
      <Body onDrop={onDropFiles} onDragOver={onDragOver} onClick={onInputImage}>
        <input type='file' onChange={onChangeImage} ref={imgRef} multiple hidden />
        {imageList.length ? (
          thumbnail && <Thumbnail src={thumbnail} alt='img' />
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
      </Body>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  cursor: default;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray-300']};
`

const Body = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const IconWrapper = styled.div`
  margin-bottom: 32px;
`

const PrevButton = styled.button`
  padding-top: 10px;
  background: none;
  border: none;
  outline: none;
`

const NextButton = styled.button`
  background: none;
  border: none;
  outline: none;
  font-size: 18px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.blue};
`

export default ModalNewFeedImage
