import {
  GET_POSTS,
  SAVE_TOP_POSTS,
  SAVE_NEW_POSTS,
  SAVE_TRENDING_POSTS,
  SAVE_SELECTED_POST,
} from '../../actions/action_types'

const INITIAL_STATE = {
  allPosts: [],
  topPosts: [],
  newPosts: [],
  trendingPosts: [],
  selectedPost: [],
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        allPosts: action.payload,
      }
    case SAVE_TOP_POSTS:
      return {
        ...state,
        topPosts: action.payload,
      }
    case SAVE_NEW_POSTS:
      return {
        ...state,
        newPosts: action.payload,
      }
    case SAVE_TRENDING_POSTS:
      return {
        ...state,
        promotedPosts: action.payload,
      }
    case SAVE_SELECTED_POST:
      return {
        ...state,
        selectedPost: action.payload,
      }
    default:
			return {
				...state
			}
	}
}
