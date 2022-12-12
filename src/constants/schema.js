import * as yup from 'yup'

const EMAIL_SCHEMA = yup.string().matches().required()

const NAME_SCHEMA = yup.string().required()

const USER_ID_SCHEMA = yup.string().required()

const PASSWORD_SCHEMA = yup.string().required()

const SIGN_UP_SCHEMA = yup.object({
  email: EMAIL_SCHEMA,
  name: NAME_SCHEMA,
  userId: USER_ID_SCHEMA,
  password: PASSWORD_SCHEMA,
})

export {SIGN_UP_SCHEMA}
