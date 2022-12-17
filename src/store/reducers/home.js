//초기 상태값 설정
const initialState = {
  global: {
    toggle: false,
  },
}

//리듀서 설정
const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REFETCH': {
      return {
        ...state,
        global: {
          ...state.global,
          toggle: action.data.toggle,
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

export default HomeReducer
