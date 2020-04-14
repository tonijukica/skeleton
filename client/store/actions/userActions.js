import axios from 'axios';

const actionTypes = {
  SET_USER: 'SET_USER',
  REMOVE_USER: 'REMOVE_USER',
  LOADING_USER: 'LOADING_USER',
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
}

function setUser(user) {
  return dispatch => dispatch({ type: actionTypes.SET_USER, payload: user});
}

const removeUser = () => {
  return dispatch => dispatch({ type: actionTypes.REMOVE_USER });
}

const setLoading = () => {
  return dispatch => dispatch({ type: actionTypes.LOADING_USER });
}

const clearError = () => {
  return dispatch => dispatch({ type: actionTypes.CLEAR_ERROR });
}

const registerUser = (user) => {

  return dispatch => {
    axios.post('api/register', {
      username: user.username,
      email: user.email,
      password: user.password
    })
    .then((response) => {
    })
    .catch((err) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: err.response.data});
    })
  }
}

const loginUser = (user) => {
  return dispatch => {
    dispatch(setLoading());
    axios.post('/api/login', {
      username: user.username,
      password: user.password
    })
    .then((response) => {
      dispatch(setUser({
        id: response.data.userId,
        username: user.username,
      }))
    })
    .catch((err) => {
      dispatch({ type: actionTypes.SET_ERROR, payload: err.response.data});
    })
  }
}
const logoutUser = () => {
  return dispatch => dispatch({ type: actionTypes.REMOVE_USER });
}

export {
  actionTypes,
  setUser,
  removeUser,
  registerUser,
  loginUser,
  logoutUser,
  clearError
}