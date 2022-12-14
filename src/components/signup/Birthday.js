import React from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {yupResolver} from '@hookform/resolvers/yup'
import {useNavigate} from 'react-router-dom'
import {FormProvider, useForm} from 'react-hook-form'

import Select from '../common/Select'
import Button from '../common/Button'
import {BIRTHDAY_SCHEMA} from '../../constants/schema'
import {addBirthdayAction} from '../../store/actions/signup'
import {makeDate, makeYearMonth} from '../../utils/signup'

import Cake from '../../assets/images/cake.svg'

const Birthday = () => {
  const {birthday} = useSelector(({SignUpReducer}) => SignUpReducer.signUp)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [year, month, date] = birthday && birthday.split('-')

  const formMethods = useForm({
    mode: 'onChange',
    resolver: yupResolver(BIRTHDAY_SCHEMA),
  })

  const {
    register,
    watch,
    handleSubmit,
    formState: {isValid},
  } = formMethods

  const onSubmit = data => {
    console.log(data)
    const birthday = {birthday: `${data.year}-${data.month}-${data.date}`}
    dispatch(addBirthdayAction(birthday))
    // navigate('/signup/birthday')
  }

  const watchedMonth = watch('month')
  const watchedYear = watch('year')

  const moveToBack = () => navigate('/signup')

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
          <SelectWrapper>
            <Select id='month' initial={month || '월'} {...register('month')}>
              {makeYearMonth(1, 12)}
            </Select>
            <Select id='date' initial={date || '일'} {...register('date')}>
              {makeDate(year || watchedYear || 2022, month || watchedMonth || 12)}
            </Select>
            <Select id='year' initial={year || '년'} {...register('year')}>
              {makeYearMonth(1960, 2021, true)}
            </Select>
          </SelectWrapper>
          <P style={{marginBottom: '30px', fontWeight: 500, fontSize: '14px'}}>태어난 날짜를 입력해야합니다.</P>
          <Button disabled={!isValid} style={{marginBottom: '15px'}}>
            가입
          </Button>
          <ALink onClick={moveToBack} style={{marginBottom: '20px', fontWeight: 600}}>
            돌아가기
          </ALink>
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

const SelectWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`

export default Birthday
