/* eslint-disable react/prop-types */
import styled from 'styled-components'
import React, {useRef, useState} from 'react'
import {useSelector} from 'react-redux'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'

import Icons from '../common/Icons'
import useImageList from '../../hooks/useImageList'

import Modal from '../common/Modal'
import useToggle from '../../hooks/useToggle'
import {storage} from '../../utils/firebase'
import {uploadFeedApi} from '../../api/feed'
import AddNewImageStep from './AddNewImageStep'
import CreateFeedStep from './CreateFeedStep'
import CancelModal from './CancelModal'

const ModalNewFeedImage = ({onToggle}) => {
  const {loginId, realName} = useSelector(({LoginReducer}) => LoginReducer.user)

  const [imageList, handleFiles] = useImageList()
  const [thumbnails, setThumbnails] = useState([])
  const [feedText, setFeedText] = useState('')
  const [cancelToggle, onCancelToggle] = useToggle()
  const [isNext, setIsNext] = useState(false)
  const imgRef = useRef(null)

  const convertImageToUrl = files => {
    return files.map(file => URL.createObjectURL(file))
  }

  const onChangeImage = e => {
    const files = Array.from(e.target.files)
    const converted = convertImageToUrl(files)

    const result = handleFiles(files)
    if (result) {
      setThumbnails(converted)
    }
  }

  const onDropFiles = e => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    const converted = convertImageToUrl(files)
    setThumbnails(converted)

    handleFiles(files)
  }

  const onInputImage = () => imgRef.current.click()
  const onDragOver = e => e.preventDefault()
  const closeModal = () => onToggle(false)
  const toggleCancelModal = () => onCancelToggle(!cancelToggle)

  const uploadFeed = async () => {
    try {
      const contentsUrls = await Promise.all(
        imageList.map(async img => {
          const format = img.type.split('/')[1]
          const imageRef = ref(storage, `/${realName}/${loginId}/${realName}_${+new Date()}.${format}`)
          const snapshot = await uploadBytes(imageRef, img)
          return await getDownloadURL(snapshot.ref)
        }),
      )

      const feedData = {feedText, contentsUrls}
      const result = await uploadFeedApi(feedData)

      if (result) {
        alert('정상적으로 공유되었습니다.')
      } else {
        alert('에러가 발생했습니다. 다시 시도해주세요.')
      }
    } catch (err) {
      console.log(err)
      alert('에러가 발생했습니다! 다시 시도해주세요!')
    }
  }

  return (
    <Container>
      <Header>
        {isNext ? (
          <>
            <PrevButton onClick={toggleCancelModal}>
              <Icons icon='ArrowLeftIcon' size='15px' />
            </PrevButton>
            <Title>새 게시물 만들기</Title>
            <NextButton onClick={uploadFeed}>공유</NextButton>
          </>
        ) : (
          <>
            <PrevButton onClick={closeModal}>
              <Icons icon='ArrowLeftIcon' size='15px' />
            </PrevButton>
            <Title>새 게시물 만들기</Title>
            {thumbnails.length > 0 && <NextButton onClick={() => setIsNext(true)}>다음</NextButton>}
          </>
        )}
      </Header>
      <Body onDrop={onDropFiles} onDragOver={onDragOver}>
        <input type='file' onChange={onChangeImage} ref={imgRef} accept='.jpg, .png, jpeg' multiple hidden />
        {isNext ? (
          <CreateFeedStep feedText={feedText} setFeedText={setFeedText} thumbnails={thumbnails} />
        ) : (
          <AddNewImageStep thumbnails={thumbnails} onInputImage={onInputImage} />
        )}
      </Body>
      <Modal width='450px' height='220px' toggle={cancelToggle} onToggle={toggleCancelModal}>
        <CancelModal
          title='게시물을 삭제하시겠어요?'
          subtitle='지금 나가면 수정 내용이 저장되지 않습니다.'
          removeToggle={onToggle}
          cancelToggle={toggleCancelModal}
        />
      </Modal>
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
  padding: 0 20px;
  height: 60px;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray-300']};
  position: relative;
`

const Title = styled.h2`
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  color: ${({theme}) => theme.colors['gray-900']};
`

const Body = styled.div``

const PrevButton = styled.button`
  position: absolute;
  top: 50%;
  left: 15px;
  transform: translateY(-50%);
  padding-top: 10px;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
`

const NextButton = styled.button`
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  background: none;
  border: none;
  outline: none;
  font-size: 18px;
  font-weight: 600;
  color: ${({theme}) => theme.colors.blue};
  cursor: pointer;
`
export default ModalNewFeedImage
