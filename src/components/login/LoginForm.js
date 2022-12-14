import React from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router'
import {yupResolver} from '@hookform/resolvers/yup'
import {useForm, FormProvider} from 'react-hook-form'

import Button from '../../components/common/Button'
import CommonInput from '../../components/common/Input'
import {LOGIN_SCHEMA} from '../../constants/schema'
import {LOGIN_INPUTS} from '../../constants/login'

import Logo from '../../assets/images/logo.svg'
import KakaoButton from '../../assets/images/kakao-login-btn.svg'

const LoginForm = () => {
  const navigate = useNavigate()

  const formMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver(LOGIN_SCHEMA),
  })

  const {
    register,
    handleSubmit,
    formState: {isValid, errors},
  } = formMethods

  const onSubmit = data => {
    console.log(data)
  }

  return (
    <Container>
      <ImageWrapper style={{marginBottom: '57px'}}>
        <Image src={Logo} alt='logo' />
      </ImageWrapper>
      <FormProvider {...formMethods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            {LOGIN_INPUTS.map(({id, type, icon, placeholder, nextFocus}) => (
              <CommonInput
                key={id}
                id={id}
                type={type}
                icon={icon}
                maxLength={20}
                placeholder={placeholder}
                alert={errors?.[id]?.message}
                showCheckCircle={false}
                nextFocus={nextFocus}
                {...register(id)}
              />
            ))}
          </InputWrapper>
          <Button disabled={!isValid} style={{marginBottom: '10px'}}>
            로그인
          </Button>
          <P style={{marginBottom: '10px'}}>or</P>
          <ImageWrapper style={{marginBottom: '30px', cursor: 'pointer'}}>
            <Image src={KakaoButton} alt='kakao' />
          </ImageWrapper>
          <P style={{marginBottom: '10px'}}>비밀번호를 잊으셨나요?</P>
          <AlertMessage>
            {errors && (errors?.phone?.message || errors?.name?.message || errors?.userId?.message)}
          </AlertMessage>
        </Form>
      </FormProvider>
    </Container>
  )
}

const Container = styled.div`
  padding: 0 16px;
`

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const Image = styled.img``

const P = styled.p`
  color: ${({theme}) => theme.colors['gray-500']};
  text-align: center;
`

const AlertMessage = styled.p`
  color: ${({theme}) => theme.colors.red};
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  word-break: keep-all;
`

const Form = styled.form``

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
`

export default LoginForm
