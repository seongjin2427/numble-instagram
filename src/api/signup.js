import dayjs from 'dayjs'
import ApiConfig from '../dataManager/apiConfig'

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
      url: 'https://api.gridge-test.com/app/sign-up',
      data: userInfo,
      method: 'post',
    })

    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

export {userSignupApi}
