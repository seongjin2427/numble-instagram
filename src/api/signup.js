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

//
const userSignupApi = async data => {
  const {phoneNumber, loginId, password, realName, year, month, date} = data
  const birthDate = dayjs(`${year}${month}${date}`).format('YYYY.MM.DD')

  //  함수 내의 정보가 많아지게 되면 try catch 내의
  // userInfo는 런타임 에러가 발생할 만한 구문인지에 대한 의도를 명확하게 하는것이 좋음
  const userInfo = {
    loginId,
    realName,
    password,
    birthDate,
    phoneNumber: phoneNumber.replaceAll('-', ''),
  }

  try {
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
