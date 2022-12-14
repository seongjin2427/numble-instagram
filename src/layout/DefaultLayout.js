import React from 'react'
import AppHeader from '../components/AppHeader'
import AppFooter from '../components/AppFooter'
import styled from 'styled-components'
import {supportDeviceSize} from '../style/styled'
import {Outlet} from 'react-router'

const DefaultLayout = () => {
  /*const navigate = useNavigate()

  // Redux 값 불러오기
  const {user} = useSelector(state => state.LoginReducer)

  // 페이지 첫 로딩시 로직
  useEffect(() => {
    // 벨리데이션
    if (!user.name) {
      alert('로그인을 해주세요')
      navigate('/login')
    }
  }, [])*/

  return (
    <Root>
      <AppHeader />
      <Outlet />
      <AppFooter />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  max-width: 1440px;
  padding-bottom: 100px;
  background: ${({theme}) => theme.colors['gray-50']};

  @media all and (max-width: ${supportDeviceSize}px) {
    width: 100vw;
  }
`

export default DefaultLayout
