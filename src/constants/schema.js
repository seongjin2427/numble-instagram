import * as yup from 'yup'
import {REG_EXP} from './regexp'
import {SCHEMA_MESSAGE} from './message'

const isPhoneNumberDuplicate = value => {
  const isDuplicate = value !== '010-1234-5678' ? true : false
  return isDuplicate
}

const PHONE_SCHEMA = yup
  .string()
  .test({name: 'duplicate', test: isPhoneNumberDuplicate})
  .matches(REG_EXP.PHONE, SCHEMA_MESSAGE.WRONG_FORMAT_PHONE)
  .required('\n')
const NAME_SCHEMA = yup.string().matches(REG_EXP.NAME, '\n').required()
const USER_ID_SCHEMA = yup.string().matches(REG_EXP.USER_ID, SCHEMA_MESSAGE.WRONG_USER_ID_FORMAT).required('\n')
const PASSWORD_SCHEMA = yup.string().min(6).required()

const SIGN_UP_SCHEMA = yup.object({
  phoneNumber: PHONE_SCHEMA,
  realName: NAME_SCHEMA,
  loginId: USER_ID_SCHEMA,
  password: PASSWORD_SCHEMA,
})

const DATE_SCHEMA = yup.number()
const DATE_YEAR_SCHEMA = yup.number().max(2015)

const BIRTHDATE_SCHEMA = yup.object({date: DATE_SCHEMA, month: DATE_SCHEMA, year: DATE_YEAR_SCHEMA})

const MARKETING_SCHEMA = yup.boolean().oneOf([true])

const MARKETING_AGREED_SCHEMA = yup.object({
  service: MARKETING_SCHEMA,
  data: MARKETING_SCHEMA,
  location: MARKETING_SCHEMA,
})

const LOGIN_ID_SCHEMA = yup.string().min(1).max(20).required()

const LOGIN_PASSWORD_SCHEMA = yup.string().min(6).max(20).required()

const LOGIN_SCHEMA = yup.object({
  loginId: LOGIN_ID_SCHEMA,
  password: LOGIN_PASSWORD_SCHEMA,
})

export {SIGN_UP_SCHEMA, BIRTHDATE_SCHEMA, MARKETING_AGREED_SCHEMA, LOGIN_SCHEMA}
