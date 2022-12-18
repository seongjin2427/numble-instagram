import ApiConfig from '../dataManager/apiConfig'

const getChatsListApi = async ({pageIndex, size}) => {
  try {
    const result = await ApiConfig.request({
      method: 'get',
      url: `${process.env.REACT_APP_API}/app/chats`,
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

export {getChatsListApi}
