import ApiConfig from '../dataManager/apiConfig'

const userLoginApi = async userInfo => {
  console.log(userInfo)
  try {
    const result = await ApiConfig.request({
      method: 'post',
      url: `${process.env.REACT_APP_API}/app/sign-in`,
      data: userInfo,
    })

    console.log(result)
    return result.data
  } catch (err) {
    console.log(err)
  }
}

export {userLoginApi}
