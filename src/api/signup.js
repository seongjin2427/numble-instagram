import dayjs from 'dayjs'
import instance from './instance'

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

    const {data} = await instance.post('https://api.gridge-test.com/app/sign-up', userInfo)
    console.log(data)
    return data
  } catch (err) {
    console.log(err)
  }
}

export {userSignupApi}
