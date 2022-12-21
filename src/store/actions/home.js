//action 설정
export const toggleAction = data => {
  return {
    type: 'ADD_FEED_MODAL_TOGGLE',
    data,
  }
}

export const fixScrollAction = data => {
  return {
    type: 'FIX_SCROLL',
    data,
  }
}

export const refetchAction = data => {
  return {
    type: 'REFETCH',
    data,
  }
}
