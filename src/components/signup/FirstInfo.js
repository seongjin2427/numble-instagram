import React from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {yupResolver} from '@hookform/resolvers/yup'
import {useNavigate} from 'react-router-dom'
import {FormProvider, useForm} from 'react-hook-form'

import Button from '../../components/common/Button'
import CommonInput from '../../components/common/Input'
import {SIGN_UP_INPUTS} from '../../constants/signup'
import {SIGN_UP_SCHEMA} from '../../constants/schema'
import {firstUserInfoAction} from '../../store/actions/signup'

import Logo from '../../assets/images/logo.svg'
import KakaoButton from '../../assets/images/kakao-login-btn.svg'

const FirstInfo = () => {
  const signup = useSelector(({SignUpReducer}) => SignUpReducer.signUp)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver(SIGN_UP_SCHEMA),
    defaultValues: signup,
  })

  const {
    register,
    handleSubmit,
    formState: {isValid, errors},
  } = formMethods

  const onSubmit = data => {
    dispatch(firstUserInfoAction(data))
    navigate('/signup/birthday')
  }

  return (
    <Container>
      <ImageWrapper style={{marginBottom: '10px'}}>
        <Image src={Logo} alt='logo' />
      </ImageWrapper>
      <P style={{marginBottom: '30px', fontWeight: 600, fontSize: '14px'}}>
        친구들과 함께 여행 이야기를 공유하고 보세요.
      </P>
      <ImageWrapper style={{cursor: 'pointer'}}>
        <Image src={KakaoButton} alt='kakao' />
      </ImageWrapper>
      <P style={{margin: '10px 0'}}>or</P>
      <FormProvider {...formMethods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <InputWrapper>
            {SIGN_UP_INPUTS.map(({id, type, icon, placeholder}) => (
              <CommonInput
                key={id}
                id={id}
                type={type}
                icon={icon}
                maxLength={20}
                placeholder={placeholder}
                alert={errors?.[id]?.message}
                {...register(id)}
              />
            ))}
          </InputWrapper>
          <Button disabled={!isValid} style={{marginBottom: '15px'}}>
            가입
          </Button>
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

export default FirstInfo
