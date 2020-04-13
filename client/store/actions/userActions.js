const actionTypes = {
  SET_USER: 'SET_USER',
  REMOVE_USER: 'REMOVE_USER',
  LOADING_USER: 'LOADING_USER'
}

function setUser(user) {
  return dispatch => dispatch({ type: actionTypes.SET_USER, payload: user});
}

const removeUser = () => {
  return dispatch => dispatch({ type: actionTypes.REMOVE_USER });
}

export {
  actionTypes,
  setUser,
  removeUser
}