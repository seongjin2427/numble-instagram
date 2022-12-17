import ApiConfig from '../dataManager/apiConfig'

const getFeedListApi = async ({pageIndex, size}) => {
  try {
    const result = await ApiConfig.request({
      method: 'get',
      url: `${process.env.REACT_APP_API}/app/feeds`,
      query: {
        pageIndex,
        size,
      },
    })

    return result.data
  } catch (err) {
    console.log(err)
  }
}

const getCommentsApi = async ({feedId, pageIndex, size}) => {
  try {
    const result = await ApiConfig.request({
      method: 'get',
      url: `${process.env.REACT_APP_API}/app/feeds/${feedId}/comments`,
      query: {
        pageIndex,
        size,
      },
    })

    return result.data
  } catch (err) {
    console.log(err)
  }
}

const uploadFeedApi = async feed => {
  try {
    const result = await ApiConfig.request({
      method: 'post',
      url: `${process.env.REACT_APP_API}/app/feed`,
      data: feed,
    })
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}

const updateFeedApi = async (feedId, feedText) => {
  try {
    const result = await ApiConfig.request({
      method: 'patch',
      url: `${process.env.REACT_APP_API}/app/feeds/${feedId}`,
      data: {feedText},
    })
    console.log(result)
  } catch (err) {
    console.log(err)
  }
}

export {getFeedListApi, getCommentsApi, uploadFeedApi, updateFeedApi}
