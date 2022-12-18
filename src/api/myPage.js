import ApiConfig from '../dataManager/apiConfig'

const getMyPageInfoApi = async loginId => {
  try {
    const result = await ApiConfig.request({
      method: 'get',
      url: `${process.env.REACT_APP_API}/app/users/${loginId}/my-page`,
    })

    return result.data
  } catch (err) {
    console.log(err)
  }
}

export {getMyPageInfoApi}
