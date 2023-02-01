import styled from 'styled-components'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {yupResolver} from '@hookform/resolvers/yup'
import {FormProvider, useForm, useFormContext} from 'react-hook-form'
import React, {forwardRef, useCallback, useEffect, useState} from 'react'

import Icons from '../../../components/common/Icons'
import Button from '../../../components/common/Button'
import Typography from '../../../components/common/Typography'
import {userSignupApi} from '../../../api/signup'
import {MARKETING_AGREED_SCHEMA} from '../../../constants/schema'

const MarketingAgree = () => {
  const userInfo = useSelector(({SignUpReducer}) => SignUpReducer.signUp)
  const [agreed, setAgreed] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  const formMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver(MARKETING_AGREED_SCHEMA),
  })

  const {
    register,
    trigger,
    setValue,
    getValues,
    handleSubmit,
    formState: {isValid},
  } = formMethods

  const onSubmit = async () => {
    if (agreed) {
      const {isSuccess, message} = await userSignupApi(userInfo)

      if (isSuccess) {
        navigate('/login')
      } else {
        setErrorMessage(message)
      }
    }
  }

  // 불필요한 메모리 낭비를 줄일수록 좋음
  // -> 순수 함수이기 때문에 밖으로 빼내는 작업이 필요
  // 함수가 반환한 값들을 파라미터로 받는것이 좋음
  // **타입 공변성** 확인!! 함수를 넘길때와 <-> 값을 넘길때는 서로 컴파일러가 정반대로 동작
  // 일반적인 경유, 함수보다는 가급적 작은 단위인 값을 종속시키는게 더 결합도를 낮춘다.
  // 함수를 넘기는게 유리한 경우가 있음!! **인버전 오브 컨트롤 : 제어의 역전** 설계 패턴
  // ex) 컴포넌트 렌더 프롭스가 대표적인 예
  const getAllValues = useCallback(() => {
    const states = getValues()
    const keys = Object.keys(states)
    const values = Object.values(states)
    return {states, keys, values}
  }, [getValues])

  useEffect(() => {
    const {values} = getAllValues()

    setAgreed(!values.some(v => v === false))
  }, [isValid, getAllValues])

  const allCheck = () => {
    const {keys, values} = getAllValues()
    const isAllChecked = !values.every(v => v)

    for (const check of keys) setValue(check, isAllChecked)

    setAgreed(isAllChecked)
    trigger(keys[0])
  }

  const moveToBack = () => navigate('/signup/birthday')

  return (
    <Container>
      <Title>이용약관에 동의</Title>
      <P style={{marginBottom: '5px', fontWeight: 500, fontSize: '14px'}}>
        Tnovel은 회원님의 개인정보를 안전하게 보호합니다.
      </P>
      <P style={{marginBottom: '32px', fontWeight: 500, fontSize: '14px'}}>
        새 계정을 만드려면 모든 약관에 동의하세요.
      </P>
      <FormProvider {...formMethods}>
        <Wrapper>
          <Content>이용약관 3개에 모두 동의</Content>
          <Icons
            icon={agreed ? 'CheckboxCheckedIcon' : 'CheckboxIcon'}
            size='20px'
            style={{cursor: 'pointer'}}
            onClick={allCheck}
          />
        </Wrapper>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <CheckboxWrapper>
            <Divider />
            <Checkbox id='service' href='/' {...register('service')}>
              이용약관 (필수)
            </Checkbox>
            <Checkbox id='data' href='/' {...register('data')}>
              데이터 정책 (필수)
            </Checkbox>
            <Checkbox id='location' href='/' {...register('location')}>
              위치 기반 기능 (필수)
            </Checkbox>
          </CheckboxWrapper>
          <Button disabled={!isValid} style={{width: '320px', margin: '0 auto 15px auto'}}>
            다음
          </Button>
        </Form>
        <ALink onClick={moveToBack} style={{marginBottom: '20px', fontWeight: 600}}>
          돌아가기
        </ALink>
        {errorMessage && <AlertMessage>{errorMessage}</AlertMessage>}
      </FormProvider>
    </Container>
  )
}

// eslint-disable-next-line react/prop-types
const Checkbox = forwardRef(({children, id, href, ...props}, ref) => {
  const {trigger, setValue, watch} = useFormContext()
  const navigate = useNavigate()
  const watchedValue = watch(id)

  const toggleCheck = () => {
    setValue(id, !watchedValue)
    trigger(id)
  }

  const moveToHref = () => navigate(href)

  return (
    <Wrapper>
      <input type='checkbox' id={id} ref={ref} checked={watchedValue || false} {...props} hidden />
      <Content>
        {children}
        {href && (
          <Typography as='p' color='blue' cursor='pointer' onClick={moveToHref}>
            더 알아보기
          </Typography>
        )}
      </Content>
      <Icons
        icon={watchedValue ? 'CheckboxCheckedIcon' : 'CheckboxIcon'}
        size='20px'
        style={{cursor: 'pointer'}}
        onClick={toggleCheck}
      />
    </Wrapper>
  )
})

Checkbox.displayName = 'Checkbox'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Title = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: ${({theme}) => theme.colors['gray-900']};
  text-align: center;
  margin-bottom: 20px;
`

const P = styled.p`
  color: ${({theme}) => theme.colors['gray-500']};
  text-align: center;
`

const ALink = styled(P)`
  color: ${({theme}) => theme.colors.blue};
  cursor: pointer;
`

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: normal;
`

const CheckboxWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: normal;
  margin-bottom: 34px;
  gap: 20px;
`

const Divider = styled.hr`
  width: 100%;
  margin-bottom: -10px;
  border-bottom: 1px solid ${({theme}) => theme.colors['gray-10']};
`

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-weight: 500;
`

const AlertMessage = styled.p`
  color: ${({theme}) => theme.colors.red};
  font-weight: 600;
  line-height: 20px;
  text-align: center;
  word-break: keep-all;
`

export default MarketingAgree
