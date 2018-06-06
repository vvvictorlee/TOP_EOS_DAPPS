import {
  GET_POSTS,
  SAVE_TOP_POSTS,
  SAVE_NEW_POSTS,
  SAVE_TRENDING_POSTS,
  SAVE_SELECTED_POST,
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

export const saveTopPostsToRedux = (topPosts) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_TOP_POSTS,
      payload: topPosts,
    })
  }
}

export const saveNewPostsToRedux = (newPosts) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_NEW_POSTS,
      payload: newPosts,
    })
  }
}

export const saveTrendingPostsToRedux = (trendingPosts) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_TRENDING_POSTS,
      payload: trendingPosts,
    })
  }
}

export const saveSelectedPostToRedux = (selectedPost) => {
  return (dispatch) => {
    dispatch({
      type: SAVE_SELECTED_POST,
      payload: selectedPost,
    })
  }
}
