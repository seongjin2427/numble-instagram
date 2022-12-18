//action 설정
export const toggleAction = data => {
  return {
    type: 'REFETCH',
    data,
  }
}

export const fixScrollAction = data => {
  return {
    type: 'FIX_SCROLL',
    data,
  }
}
