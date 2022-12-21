import {Link} from 'react-router-dom'
import styled, {css} from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import React, {useCallback, useEffect} from 'react'

import Icons from './common/Icons'
import {MEDEA_QUERY} from '../style/mediaQuery'

import Modal from './common/Modal'
import useToggle from '../hooks/useToggle'
import ModalNewFeedImage from './header/ModalNewFeedImage'
import {loginAction} from '../store/actions/login'
import {toggleAction} from '../store/actions/home'
import {getMyPageInfoApi} from '../api/myPage'
import {HEADER_MENU_LIST, HEADER_MODAL_LIST} from '../constants/header'

import Logo from '../assets/images/logo.svg'
import Profile from '../assets/images/sample_profile.svg'
import {autoLoginApi} from '../api/login'

const AppHeader = () => {
  const {loginId} = useSelector(({LoginReducer}) => LoginReducer.user)
  const {toggle} = useSelector(({HomeReducer}) => HomeReducer.global)
  const [menuToggle, onMenuToggle] = useToggle()
  const dispatch = useDispatch()

  const userLogout = useCallback(() => {
    dispatch(loginAction({}))
  }, [dispatch])

  const getUserInfo = useCallback(async () => {
    const loginId = localStorage.getItem('loginId')
    const {isSuccess, result, code} = await getMyPageInfoApi(loginId)

    if (isSuccess) {
      dispatch(loginAction(result))
    }

    if (code === 3001) {
      const {isSuccess: success, result} = await autoLoginApi()
      if (success) {
        // dispatch(loginAction(result))
      }
    }
  }, [dispatch])

  useEffect(() => {
    if (!loginId) {
      getUserInfo()
    }
  }, [loginId, getUserInfo])

  const toggleMenu = () => onMenuToggle(!menuToggle)
  const toggleNewFeedModal = b => dispatch(toggleAction({toggle: b}))

  return (
    <Header>
      <HeaderWrapper>
        <ImageWrapper>
          <Link to='/'>
            <Image src={Logo} alt='logo' />
          </Link>
        </ImageWrapper>
        <InputWrapper>
          <Icons icon='SearchIcon' size='16px' />
          <Input />
        </InputWrapper>
        <MenuList>
          {HEADER_MENU_LIST.map(({icon, black, url, clickHandler}, idx) => (
            <MenuItem key={idx} black={black} onClick={() => clickHandler(toggleNewFeedModal)}>
              <Link to={url}>
                <Icons icon={icon} size='20px' />
              </Link>
            </MenuItem>
          ))}
          <MenuItem>
            <Icons icon='UserIcon' size='20px' />
          </MenuItem>
          <MenuItem>
            <ProfileWrapper onClick={toggleMenu}>
              <Image src={Profile} alt='profile' />
            </ProfileWrapper>
            <ModalWrapper toggle={menuToggle}>
              {HEADER_MODAL_LIST.map(({icon, title, url, clickHandler}, idx) => (
                <ModalItem key={idx} onClick={() => clickHandler(userLogout)}>
                  <Link to={url}>
                    <Icons icon={icon} size='20px' />
                    {title}
                  </Link>
                </ModalItem>
              ))}
            </ModalWrapper>
          </MenuItem>
        </MenuList>
      </HeaderWrapper>
      {toggle && (
        <Modal width='auto' height='auto' toggle={toggle} onToggle={toggleNewFeedModal}>
          <ModalNewFeedImage onToggle={toggleNewFeedModal} />
        </Modal>
      )}
    </Header>
  )
}

const Header = styled.div`
  ${({theme}) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100vw;
    height: 80px;
    background: ${theme.colors.white};
    border-bottom: 1px solid ${theme.colors['gray-200']};
    z-index: 10;
  `}
`

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1076px;
  padding: 0 30px;
`

const ImageWrapper = styled.div`
  width: 140px;
  height: 50px;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const InputWrapper = styled.div`
  ${({theme}) => css`
    display: flex;
    align-items: center;
    gap: 10px;
    width: 312px;
    height: 44px;
    padding: 10px 14px;
    border: 1px solid ${theme.colors['gray-300']};
    box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
    border-radius: 8px;

    svg {
      stroke: ${theme.colors['gray-500']};
      margin-bottom: 2px;
    }
  `}
`

const Input = styled.input`
  height: 24px;
  flex: 1;
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
`

const MenuList = styled.ul`
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;
  gap: 25px;
  width: 100%;
  height: 60px;
  padding-top: 15px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: ${({theme}) => theme.colors.white};
  box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.05);
  z-index: 10;

  ${MEDEA_QUERY.WIDE_DESKTOP} {
    width: auto;
    align-items: center;
    justify-content: normal;
    padding: 0;
    position: unset;
    border: none;
    background: none;
    box-shadow: none;
  }
`

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;

  a {
    display: flex;
    align-items: center;
    gap: 10px;
    color: ${({theme}) => theme.colors['gray-900']};
    text-decoration: none;
  }

  svg {
    stroke: ${({theme, black}) => theme.colors[black ? 'gray-900' : 'gray-500']};
    margin-bottom: 2px;
  }

  :nth-last-of-type(2) {
    display: flex;
  }

  :last-of-type {
    display: none;
  }

  ${MEDEA_QUERY.WIDE_DESKTOP} {
    :last-of-type {
      display: flex;
    }

    :nth-last-of-type(2) {
      display: none;
    }
  }
`

const ProfileWrapper = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  overflow: hidden;
`

const ModalWrapper = styled.ul`
  ${({theme, toggle}) => css`
    display: ${toggle ? 'flex' : 'none'};
    flex-direction: column;
    align-items: flex-start;
    width: 280px;
    height: 312px;
    padding: 15px 35px;

    position: absolute;
    top: 57px;
    right: -10px;

    background: ${theme.colors.white};
    border: 1px solid ${theme.colors['gray-200']};
    border-radius: 8px;
    box-shadow: 0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03);
    cursor: default;
  `}
`

const ModalItem = styled.li`
  ${({theme}) => css`
    display: flex;
    align-items: center;
    gap: 17px;
    padding: 17px 0;

    font-weight: 600;
    font-size: 16px;
    cursor: pointer;

    svg {
      stroke: ${theme.colors['gray-900']};
    }
  `}
`

export default AppHeader
