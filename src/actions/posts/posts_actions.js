import {
  GET_POSTS,
} from '../action_types'

export const savePostsToRedux = (postsData) => {
  console.log(postsData)
  return (dispatch) => {
    dispatch({
      type: GET_POSTS,
      payload: postsData,
    })
  }
}
