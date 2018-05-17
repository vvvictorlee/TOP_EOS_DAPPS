import {
  GET_USERS,
} from '../action_types'

export const saveUsersToRedux = (usersData) => {
  console.log(usersData)
  return (dispatch) => {
    dispatch({
      type: GET_USERS,
      payload: usersData,
    })
  }
}
