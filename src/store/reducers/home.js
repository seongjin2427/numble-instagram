//초기 상태값 설정
const initialState = {
  global: {
    toggle: false,
    scrollY: 0,
    refetch: false,
  },
}

//리듀서 설정
const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_FEED_MODAL_TOGGLE': {
      return {
        ...state,
        global: {
          ...state.global,
          toggle: action.data.toggle,
        },
      }
    }
    case 'REFETCH': {
      return {
        ...state,
        global: {
          ...state.global,
          refetch: action.data.refetch,
        },
      }
    }
    case 'FIX_SCROLL': {
      return {
        ...state,
        global: {
          ...state.global,
          scrollY: action.data.scrollY,
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
