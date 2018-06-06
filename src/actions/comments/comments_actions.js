import {
  GET_COMMENTS,
} from '../action_types'

export const saveCommentsToRedux = (commentsData) => {
  console.log(commentsData)
  return (dispatch) => {
    dispatch({
      type: GET_COMMENTS,
      payload: commentsData,
    })
  }
}
