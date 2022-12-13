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

const marketingAgreeAction = data => {
  return {
    type: 'MARKETING_AGREE',
    data,
  }
}

export {firstUserInfoAction, addBirthdayAction, marketingAgreeAction}
