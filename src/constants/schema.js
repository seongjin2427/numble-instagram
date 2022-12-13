import * as yup from 'yup'
import {SCHEMA_MESSAGE} from './message'
import {REG_EXP} from './regexp'

const PHONE_SCHEMA = yup.string().matches(REG_EXP.PHONE, SCHEMA_MESSAGE.WRONG_FORMAT_PHONE).required('\n')
const NAME_SCHEMA = yup.string().matches(REG_EXP.NAME, '\n').required()
const USER_ID_SCHEMA = yup.string().matches(REG_EXP.USER_ID, SCHEMA_MESSAGE.WRONG_USER_ID_FORMAT).required('\n')
const PASSWORD_SCHEMA = yup.string().min(6).required()

const SIGN_UP_SCHEMA = yup.object({
  phone: PHONE_SCHEMA,
  name: NAME_SCHEMA,
  userId: USER_ID_SCHEMA,
  password: PASSWORD_SCHEMA,
})

const DATE_SCHEMA = yup.number()

const BIRTHDAY_SCHEMA = yup.object({date: DATE_SCHEMA, month: DATE_SCHEMA, year: DATE_SCHEMA})

export {SIGN_UP_SCHEMA, BIRTHDAY_SCHEMA}
