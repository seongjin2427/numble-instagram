//초기 상태값 설정
const initialState = {
  feed: {},
}

//리듀서 설정
const FeedReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DETAIL_FEED': {
      return {
        ...state,
        feed: {
          feedId: action.data.feedId,
          contentsList: action.data.contentsList,
          feedLoginId: action.data.feedLoginId,
          profileImage: action.data.profileImage,
          feedText: action.data.feedText,
          feedCreatedAt: action.data.feedCreatedAt,
          feedUpdatedAt: action.data.feedUpdatedAt,
          comments: action.data.comments,
        },
      }
    }
    default: {
      return {
        ...state,
      }
    }
  }
}

export default FeedReducer
