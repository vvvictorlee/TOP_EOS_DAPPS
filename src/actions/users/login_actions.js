import {
  LOGGED_IN,
  LOGGED_USER,
} from '../action_types'

export const saveLoginToRedux = (loginData) => {
  console.log(loginData)
  return (dispatch) => {
    dispatch({
      type: LOGGED_IN,
      payload: loginData,
    })
  }
}

export const saveLogUserToRedux = (userData) => {
  return (dispatch) => {
    dispatch({
      type: LOGGED_USER,
      payload: userData,
    })
  }
}
