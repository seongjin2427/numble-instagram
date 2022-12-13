import React from 'react'
import styled from 'styled-components'
import {useDispatch} from 'react-redux'
import {yupResolver} from '@hookform/resolvers/yup'
import {useNavigate} from 'react-router-dom'
import {FormProvider, useForm} from 'react-hook-form'

import Button from '../../components/common/Button'
import {SIGN_UP_SCHEMA} from '../../constants/schema'
import {addBirthdayAction} from '../../store/actions/signup'

import Cake from '../../assets/images/cake.svg'

const FirstInfo = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const formMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver(SIGN_UP_SCHEMA),
  })

  const {
    register,
    handleSubmit,
    formState: {isValid, errors},
  } = formMethods

  const onSubmit = data => {
    console.log(data)
    dispatch(addBirthdayAction(data))
    navigate('/signup/birthday')
  }

  return (
    <>
      <ImageWrapper style={{marginBottom: '20px'}}>
        <Image src={Cake} alt='cake' />
      </ImageWrapper>
      <Title>생일추가</Title>
      <P style={{marginBottom: '10px', fontWeight: 500, fontSize: '14px'}}>공개 프로필에 포함되지 않습니다.</P>
      <ALink style={{marginBottom: '30px', fontWeight: 500, fontSize: '14px'}}>왜 생일 정보를 입력해야 하나요?</ALink>
      <FormProvider {...formMethods}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <P style={{marginBottom: '30px', fontWeight: 500, fontSize: '14px'}}>태어난 날짜를 입력해야합니다.</P>
          <Button disabled={!isValid} style={{marginBottom: '15px'}}>
            가입
          </Button>
          <ALink style={{marginBottom: '20px', fontWeight: 600}}>돌아가기</ALink>
          <AlertMessage>
            {errors && (errors?.phone?.message || errors?.name?.message || errors?.userId?.message)}
          </AlertMessage>
        </Form>
      </FormProvider>
    </>
  )
}

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`

const Image = styled.img``

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: ${({theme}) => theme.colors['gray-900']};
  text-align: center;
  margin-bottom: 15px;
`

const P = styled.p`
  color: ${({theme}) => theme.colors['gray-500']};
  text-align: center;
`

const ALink = styled(P)`
  color: ${({theme}) => theme.colors.blue};
  cursor: pointer;
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
