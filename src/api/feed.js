import ApiConfig from '../dataManager/apiConfig'

const getFeedListApi = async ({pageIndex, size}) => {
  console.log('getFeedListApi', pageIndex, size)
  try {
    const result = await ApiConfig.request({
      method: 'get',
      url: `${process.env.REACT_APP_API}/app/feeds`,
      query: {
        pageIndex,
        size,
      },
    })
    console.log(result)
    return result.data
  } catch (err) {
    console.log(err)
  }
}

export {getFeedListApi}
