//초기 상태값 설정
const initialState = {
  user: {},
}

//리듀서 설정
const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        ...state,
        user: {
          ...state.user,
          loginId: action.data.loginId,
          realName: action.data.realName,
          feedCount: action.data.feedCount,
          followerCount: action.data.followerCount,
          followingCount: action.data.followingCount,
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

export default LoginReducer
