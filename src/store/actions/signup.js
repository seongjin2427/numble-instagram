const firstUserInfoAction = data => {
  return {
    type: 'USER_INFO',
    data,
  }
}

const addBirthdayAction = data => {
  return {
    type: 'ADD_BIRTHDAY',
    data,
  }
}

export {firstUserInfoAction, addBirthdayAction}
