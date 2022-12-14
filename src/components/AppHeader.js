import React from 'react'
import styled, {css} from 'styled-components'

import Icons from './common/Icons'
import {MEDEA_QUERY} from '../style/media-query'

import Profile from '../assets/images/sample_profile.svg'
import Logo from '../assets/images/logo.svg'

const AppHeader = () => {
  // const dispatch = useDispatch()
  // const sidebarShow = useSelector((state) => state.sidebarShow)
  // const [visible, setVisible] = useState(false)

  return (
    <Header>
      <HeaderWrapper>
        <ImageWrapper>
          <Image src={Logo} alt='logo' />
        </ImageWrapper>
        <InputWrapper>
          <Icons icon='SearchIcon' size='16px' />
          <Input />
        </InputWrapper>
        <MenuList>
          <MenuItem black>
            <Icons icon='HomeIcon' size='20px' />
          </MenuItem>
          <MenuItem>
            <Icons icon='SendIcon' size='20px' />
          </MenuItem>
          <MenuItem>
            <Icons icon='AddIcon' size='20px' />
          </MenuItem>
          <MenuItem>
            <Icons icon='HeartIcon' size='20px' />
          </MenuItem>
          <MenuItem>
            <Icons icon='UserIcon' size='20px' />
          </MenuItem>
          <MenuItem>
            <ProfileWrapper>
              <Image src={Profile} alt='profile' />
            </ProfileWrapper>
          </MenuItem>
        </MenuList>
      </HeaderWrapper>
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
  box-shadow: 0px -1px 0px rgba(0, 0, 0, 0.05);

  ${MEDEA_QUERY.WIDE_DESKTOP} {
    width: auto;
    align-items: center;
    justify-content: normal;
    padding: 0;
    position: unset;
    border: none;
    box-shadow: none;
  }
`

const MenuItem = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;

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

export default AppHeader
