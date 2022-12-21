import axios from 'axios'
import ApiConfig from '../dataManager/apiConfig'

const userLoginApi = async userInfo => {
  try {
    const result = await ApiConfig.request({
      method: 'post',
      url: `${process.env.REACT_APP_API}/app/sign-in`,
      data: userInfo,
    })

    return result.data
  } catch (err) {
    console.log(err)
  }
}

const KAKAO_URL = `${process.env.REACT_APP_KAKAO_REQUEST_URI}/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}`

const kakaoLoginApi = async code => {
  try {
    const {data} = await axios.post(
      `${process.env.REACT_APP_KAKAO_REQUEST_URI}/oauth/token?grant_type=authorization_code&client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&code=${code}`,
    )
    const {access_token} = data

    const result = await ApiConfig.request({
      method: 'post',
      url: `${process.env.REACT_APP_API}/app/kakao-sign-in`,
      data: {accessToken: access_token},
    })

    return result.data
  } catch (err) {
    console.log(err)
  }
}

const autoLoginApi = async () => {
  try {
    const result = await ApiConfig.request({
      method: 'get',
      url: `${process.env.REACT_APP_API}/app/auto-sign-in`,
    })

    return result.data
  } catch (err) {
    console.log(err)
  }
}

export {userLoginApi, KAKAO_URL, kakaoLoginApi, autoLoginApi}
