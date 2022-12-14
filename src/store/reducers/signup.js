const initialState = {
  signUp: {},
}

const SignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_INFO': {
      console.log('action.data', action.data)
      return {
        signUp: {
          phoneNumber: action.data.phoneNumber,
          realName: action.data.realName,
          loginId: action.data.loginId,
          password: action.data.password,
          ...state.signUp,
        },
      }
    }
    case 'ADD_BIRTHDAY': {
      return {
        signUp: {
          ...state.signUp,
          year: action.data.year,
          month: action.data.month,
          date: action.data.date,
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

export default SignUpReducer
