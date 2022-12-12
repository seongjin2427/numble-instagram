import React from 'react'
import {FormProvider, useForm} from 'react-hook-form'

import Button from '../../components/common/Button'
import CommonInput from '../../components/common/Input'
import {SIGN_UP_SCHEMA} from '../../constants/schema'

import Logo from '../../assets/images/logo.svg'
import KakaoButton from '../../assets/images/kakao-login-btn.svg'
import GoogleButton from '../../assets/images/google-play-btn.svg'
import AppStoreButton from '../../assets/images/app-store-btn.svg'
import * as S from './SignUp.styled'

const SignUp = () => {
  const formMethods = useForm(SIGN_UP_SCHEMA)
  const {handleSubmit, formState} = formMethods

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <S.Container>
      <S.SignUpArea>
        <S.ImageWrapper style={{marginBottom: '10px'}}>
          <S.Image src={Logo} alt='cake' />
        </S.ImageWrapper>
        <S.P style={{marginBottom: '30px', fontWeight: 600, fontSize: '14px'}}>
          친구들과 함께 여행 이야기를 공유하고 보세요.
        </S.P>
        <S.ImageWrapper>
          <S.Image src={KakaoButton} alt='kakao' />
        </S.ImageWrapper>
        <S.P style={{margin: '10px 0'}}>or</S.P>
        <FormProvider {...formMethods}>
          <S.Form onSubmit={handleSubmit(onSubmit)}>
            <S.InputWrapper>
              <CommonInput icon='MailIcon' placeholder='전화번호,사용자 이름 또는 이메일' />
              <CommonInput icon='UserIcon' placeholder='성명' />
              <CommonInput icon='SettingsIcon' placeholder='사용자 이름' />
              <CommonInput icon='LockIcon' placeholder='비밀번호' />
            </S.InputWrapper>
            <Button>가입</Button>
          </S.Form>
        </FormProvider>
      </S.SignUpArea>
      <S.LoginArea>
        <S.P style={{fontWeight: 600}}>
          계정이 있으신가요? <em>로그인</em>
        </S.P>
      </S.LoginArea>
      <S.DownloadApp>
        <S.P style={{marginBottom: '10px'}}>앱을 다운로드 하세요.</S.P>
        <S.ImageWrapper>
          <S.Image src={GoogleButton} alt='google_play' />
          <S.Image src={AppStoreButton} alt='app_store' />
        </S.ImageWrapper>
      </S.DownloadApp>
    </S.Container>
  )
}

export default SignUp
