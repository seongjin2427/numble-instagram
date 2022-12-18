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

const getMyFeedApi = async ({loginId, pageIndex, size}) => {
  try {
    const {data} = await ApiConfig.request({
      method: 'get',
      url: `${process.env.REACT_APP_API}/app/feeds/user`,
      query: {
        loginId,
        pageIndex,
        size,
      },
    })

    return data
  } catch (err) {
    console.log(err)
    return []
  }
}

export {getMyPageInfoApi, getMyFeedApi}
