import React from 'react'
import {Outlet} from 'react-router-dom'

import GoogleButton from '../../assets/images/google-play-btn.svg'
import AppStoreButton from '../../assets/images/app-store-btn.svg'
import * as S from './SignUp.styled'

const SignUp = () => {
  return (
    <S.Container>
      <S.SignUpArea>
        <Outlet />
      </S.SignUpArea>
      <S.LoginArea>
        <S.P style={{fontWeight: 600}}>
          계정이 있으신가요? <em>로그인</em>
        </S.P>
      </S.LoginArea>
      <S.DownloadApp>
        <S.P style={{marginBottom: '10px'}}>앱을 다운로드 하세요.</S.P>
        <S.ImageWrapper>
          <S.Image style={{cursor: 'pointer'}} src={GoogleButton} alt='google_play' />
          <S.Image style={{cursor: 'pointer'}} src={AppStoreButton} alt='app_store' />
        </S.ImageWrapper>
      </S.DownloadApp>
    </S.Container>
  )
}

export default SignUp
