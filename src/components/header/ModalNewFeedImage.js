/* eslint-disable react/prop-types */
import styled, {css} from 'styled-components'
import {useSelector} from 'react-redux'
import React, {useRef, useState} from 'react'

import Icons from '../common/Icons'
import Typography from '../common/Typography'
import Carousel from '../common/Carousel'
import useImageList from '../../hooks/useImageList'
import Profile from '../common/Profile'

import sampleProfile from '../../assets/images/sample_1.svg'
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import {storage} from '../../utils/firebase'
import {uploadFeedApi} from '../../api/feed'
import Modal from '../common/Modal'
import useToggle from '../../hooks/useToggle'

const ModalNewFeedImage = ({onToggle}) => {
  const user = useSelector(({LoginReducer}) => LoginReducer.user)
  const {loginId, realName} = user

  const [cancelToggle, onCancelToggle] = useToggle()
  const [imageList, handleFiles] = useImageList()
  const [thumbnails, setThumbnails] = useState([])
  const [isNext, setIsNext] = useState(false)
  const [feedText, setFeedText] = useState('')
  const imgRef = useRef(null)

  const convertImageToUrl = files => {
    return files.map(file => URL.createObjectURL(file))
  }

  const onChangeImage = e => {
    const files = Array.from(e.target.files)
    const converted = convertImageToUrl(files)
    setThumbnails(converted)

    handleFiles(files)
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

      console.log(contentsUrls)
      const feedData = {feedText, contentsUrls}
      await uploadFeedApi(feedData)
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
        <input type='file' onChange={onChangeImage} ref={imgRef} multiple hidden />
        {isNext ? (
          <CreateFeedStep feedText={feedText} setFeedText={setFeedText} thumbnails={thumbnails} />
        ) : (
          <AddNewImageStep thumbnails={thumbnails} onInputImage={onInputImage} />
        )}
      </Body>
      <Modal width='450px' height='220px' toggle={cancelToggle} onToggle={toggleCancelModal}>
        <CancleModal removeToggle={onToggle} cancelToggle={toggleCancelModal} />
      </Modal>
    </Container>
  )
}

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

const CreateFeedStep = ({feedText, setFeedText, thumbnails}) => {
  const user = useSelector(({LoginReducer}) => LoginReducer.user)
  const {loginId} = user

  const onChangeTextArea = e => {
    setFeedText(e.target.value)
  }

  return (
    <CreateFeedContainer>
      <CarouselWrapper>
        <Carousel>
          {thumbnails.map((t, idx) => (
            <ThumbnailWrapper key={idx}>
              <Thumbnail src={t} alt='img' />
            </ThumbnailWrapper>
          ))}
        </Carousel>
      </CarouselWrapper>
      <ContentWrapper>
        <FeedTextWrapper>
          <Profile src={sampleProfile} loginId={loginId} size='35px' gap='10px' style={{marginBottom: '15px'}} />
          <FeedText value={feedText} maxLength={2200} onChange={onChangeTextArea} />
          <Typography as='p' color='gray-300' fontSize='14px' textAlign='right'>
            {feedText.length}/2,200
          </Typography>
        </FeedTextWrapper>
        <MenuWrapper>
          <Typography color='gray-500'>위치 추가</Typography>
          <Icons icon='MapPinIcon' size='20px' />
        </MenuWrapper>
        <MenuWrapper>
          <Typography color='gray-900'>접근성</Typography>
          <Icons icon='ChevronDownIcon' size='15px' />
        </MenuWrapper>
        <MenuWrapper>
          <Typography color='gray-900'>고급 설정</Typography>
          <Icons icon='ChevronDownIcon' size='15px' />
        </MenuWrapper>
      </ContentWrapper>
    </CreateFeedContainer>
  )
}

const CancleModal = ({removeToggle, cancelToggle}) => {
  return (
    <NotificationContainer>
      <NotificationWrapper>
        <Notification title='true'>게시물을 삭제하시겠어요?</Notification>
        <Notification>지금 나가면 수정 내용이 저장되지 않습니다.</Notification>
      </NotificationWrapper>
      <CancelButton red onClick={() => removeToggle(false)}>
        삭제
      </CancelButton>
      <CancelButton onClick={cancelToggle}>취소</CancelButton>
    </NotificationContainer>
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

const NewImageContainer = styled.div`
  width: 650px;
  height: 590px;
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

const CreateFeedContainer = styled.div`
  display: flex;
  width: 1000px;
  height: 660px;
`
const CarouselWrapper = styled.div`
  width: 650px;
  height: 650px;
`

const ThumbnailWrapper = styled.div`
  width: 650px;
  height: 650px;
`

const ContentWrapper = styled.div`
  width: 350px;
  height: 100%;
`

const FeedTextWrapper = styled.div`
  width: 350px;
  padding: 20px;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray-300']};
`

const FeedText = styled.textarea`
  display: inline-block;
  width: 100%;
  height: 180px;
  border: none;
  outline: none;
  font-size: 18px;
  line-height: 28px;
  font-weight: 500;
  color: ${({theme}) => theme.colors['gray-900']};
  resize: none;
`

const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 0 20px;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray-300']};

  svg {
    stroke: ${({theme}) => theme.colors['gray-300']};
  }
`

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

export default ModalNewFeedImage
