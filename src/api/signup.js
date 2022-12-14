import dayjs from 'dayjs'
import ApiConfig from '../dataManager/apiConfig'

const checkDuplicateLoginIdApi = async loginId => {
  try {
    const {data} = await ApiConfig.request({
      method: 'get',
      url: `${process.env.REACT_APP_API}/app/check-duplicate-login-id`,
      query: {loginId},
    })
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

const userSignupApi = async data => {
  const {phoneNumber, loginId, password, realName, year, month, date} = data
  const birthDate = dayjs(`${year}${month}${date}`).format('YYYY.MM.DD')

  try {
    const userInfo = {
      loginId,
      realName,
      password,
      birthDate,
      phoneNumber: phoneNumber.replaceAll('-', ''),
    }

    const {data} = await ApiConfig.request({
      url: `${process.env.REACT_APP_API}/app/sign-up`,
      data: userInfo,
      method: 'post',
    })

    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

export {checkDuplicateLoginIdApi, userSignupApi}
