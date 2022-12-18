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
    const {data} = await ApiConfig.request({
      method: 'post',
      url: `${process.env.REACT_APP_API}/app/feed`,
      data: feed,
    })

    return data.isSuccess
  } catch (err) {
    console.log(err)
    return false
  }
}

const updateFeedApi = async (feedId, feedText) => {
  try {
    const {data} = await ApiConfig.request({
      method: 'patch',
      url: `${process.env.REACT_APP_API}/app/feeds/${feedId}`,
      data: {feedText},
    })

    return data.isSuccess
  } catch (err) {
    console.log(err)
    return false
  }
}

const removeFeedApi = async feedId => {
  console.log('removeFeedApi', feedId)
  try {
    const {data} = await ApiConfig.request({
      method: 'patch',
      url: `${process.env.REACT_APP_API}/app/feeds/${feedId}/delete-status`,
    })

    return data.isSuccess
  } catch (err) {
    console.log(err)
    return false
  }
}

export {getFeedListApi, getCommentsApi, uploadFeedApi, updateFeedApi, removeFeedApi}
