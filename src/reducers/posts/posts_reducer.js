import {
  GET_POSTS,
} from '../../actions/action_types'

const INITIAL_STATE = {
  allPosts: null,
}

export default (state = INITIAL_STATE, action) => {
  console.log(action.payload)
	switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        allPosts: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
