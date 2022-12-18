/* eslint-disable react/prop-types */
import React, {useState} from 'react'
import styled, {css} from 'styled-components'

import Icons from '../common/Icons'
import Profile from '../common/Profile'
import Carousel from '../common/Carousel'
import Typography from '../common/Typography'
import FeedIconSet from '../common/FeedIconSet'
import FeedCommand from '../common/FeedCommand'
import CommandCard from './CommandCard'
import useToggle from '../../hooks/useToggle'
import {convertRelativeTimeFormat} from '../../utils/timeformat'
import Modal from '../common/Modal'
import CreateFeedStep from '../header/CreateFeedStep'
import {useDispatch, useSelector} from 'react-redux'
import {removeFeedApi, updateFeedApi} from '../../api/feed'
import {toggleAction} from '../../store/actions/home'
import CancelModal from '../header/CancelModal'

const ModalContent = props => {
  const dispatch = useDispatch()
  const {toggle} = useSelector(({HomeReducer}) => HomeReducer.global)
  const {loginId} = useSelector(({LoginReducer}) => LoginReducer.user)

  const {feedId, contentsList, feedLoginId, profileImage, feedText, feedCreatedAt, feedUpdatedAt, comments} = props
  const [toggleMore, onToggleMore] = useToggle()
  const [modifyMode, onModifyMode] = useToggle()
  const [toggleCancelModal, onToggleCancelModal] = useToggle()
  const [removeToggle, onRemoveToggle] = useToggle()

  const [modifiedText, setModifiedText] = useState(feedText)

  const thumbnails = contentsList.map(({contentsUrl}) => contentsUrl)
  const isAuthor = loginId === feedLoginId

  const toggleMoreModal = () => {
    onToggleMore(!toggleMore)
  }

  const cancelModifyMode = () => {
    onToggleCancelModal(!toggleCancelModal)
  }

  const cancelModify = () => {
    setModifiedText(feedText)
    onToggleCancelModal(!toggleCancelModal)
    onToggleMore(false)
    onModifyMode(false)
  }

  const updateFeed = async () => {
    const result = await updateFeedApi(feedId, modifiedText)
    if (result) {
      alert('수정되었습니다.')
    } else {
      alert('에러가 발생하였습니다. 다시 시도해주세요.')
    }
    dispatch(toggleAction({toggle: !toggle}))
  }

  const toggleRemoveModal = () => onRemoveToggle(!removeToggle)

  const checkRemoveFeed = () => {
    if (isAuthor) {
      onToggleMore(false)
      onRemoveToggle(true)
    }
  }

  const removeFeed = async () => {
    if (isAuthor) {
      const result = await removeFeedApi(feedId)
      if (result) {
        alert('삭제되었습니다.')
      } else {
        alert('에러가 발생하였습니다. 다시 시도해주세요.')
      }
    }
    dispatch(toggleAction({toggle: !toggle}))
  }

  return (
    <Container>
      {modifyMode ? (
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
          <Modal width='448px' height='223px' toggle={toggleCancelModal} onToggle={onToggleCancelModal}>
            <CancelModal
              title='게시물을 삭제하시겠어요?'
              subtitle='지금 나가면 수정 내용이 저장되지 않습니다'
              removeToggle={cancelModify}
              cancelToggle={cancelModifyMode}
            />
          </Modal>
        </ModifyWrapper>
      ) : (
        <>
          <SliderWrapper>
            <Carousel settings={{dots: false}}>
              {contentsList.map(({contentsUrl}, idx) => (
                <FeedPhotoBox key={idx}>
                  <FeedPhotoImage src={contentsUrl} alt={'img'} />
                </FeedPhotoBox>
              ))}
            </Carousel>
          </SliderWrapper>

          <ContentWrapper>
            <ContentHeader>
              <Profile loginId={feedLoginId} src={profileImage} gap='10px' size='35px' />
              <Icons onClick={toggleMoreModal} icon='MoreHorizontalIcon' size='20px' style={{cursor: 'pointer'}} />
            </ContentHeader>

            <ContentBody>
              <UserContentWrapper>
                <Profile loginId={feedLoginId} src={profileImage} gap='10px' size='35px' />
                <Content>
                  <FeedText>{feedText}</FeedText>
                  <Typography as='p' color='gray-300' fontSize='12px' fontWeight={500}>
                    {convertRelativeTimeFormat(feedUpdatedAt)}
                  </Typography>
                </Content>
              </UserContentWrapper>
              {!!comments.length &&
                comments.map(c => <CommandCard key={c.id} profile_uri={profileImage} cursor='default' {...c} />)}
            </ContentBody>

            <ContentFooter>
              <FeedIconSet feedId={feedId} />
              <Typography as='p' color='gray-900' fontSize='14px' fontWeight={700} margin='10px 15px'>
                좋아요 4,119개
              </Typography>
              <Typography as='p' color='gray-300' fontSize='12px' fontWeight={500} margin='0 15px 25px 15px'>
                {convertRelativeTimeFormat(feedCreatedAt)}
              </Typography>

              <FeedCommand />
            </ContentFooter>
          </ContentWrapper>
          <Modal width='448px' height='auto' toggle={toggleMore} onToggle={onToggleMore}>
            <MoreModal
              isAuthor={isAuthor}
              onToggle={onToggleMore}
              onModifyMode={onModifyMode}
              checkRemoveFeed={checkRemoveFeed}
            />
          </Modal>
          <Modal width='448px' height='223px' toggle={removeToggle} onToggle={onRemoveToggle}>
            <CancelModal
              title='게시물을 삭제하시겠어요?'
              subtitle='이 게시물을 삭제하시겠어요?'
              removeToggle={removeFeed}
              cancelToggle={toggleRemoveModal}
            />
          </Modal>
        </>
      )}
    </Container>
  )
}

const MoreModal = ({isAuthor, onToggle, onModifyMode, checkRemoveFeed}) => {
  const moveToModifyModal = () => {
    if (isAuthor) {
      onModifyMode(true)
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

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

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

const SliderWrapper = styled.div`
  width: 60%;
`

const FeedPhotoBox = styled.div`
  width: 60%;
  height: 720px;
`

const FeedPhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray-300']};
`

const ContentBody = styled.div`
  padding-bottom: 25px;
  flex: 1;
  overflow: scroll;
`

const UserContentWrapper = styled.div`
  padding: 15px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 45px;
`

const FeedText = styled.p`
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 10px;
`

const ContentFooter = styled.div`
  width: 100%;
  border-top: 1px solid ${({theme}) => theme.colors['gray-300']};
`

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

export default React.memo(ModalContent)
