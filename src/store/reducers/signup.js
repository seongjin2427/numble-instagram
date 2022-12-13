const initialState = {
  signUp: {},
}

const SignUpReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_INFO': {
      return {
        signUp: {
          phone: action.data.phone,
          name: action.data.name,
          userId: action.data.userId,
          password: action.data.password,
          ...state.signUp,
        },
      }
    }
    case 'ADD_BIRTHDAY': {
      return {
        signUp: {
          ...state.signUp,
          birthday: action.data.birthday,
        },
      }
    }
    case 'MARKETING_AGREE': {
      return {
        signUp: {
          marketingAgreed: action.data.marketingAgreed,
          ...state.signUp,
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
