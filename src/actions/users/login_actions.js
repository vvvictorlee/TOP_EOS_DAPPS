import {
  LOGGED_IN,
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
