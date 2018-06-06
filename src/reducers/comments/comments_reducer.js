import {
  GET_COMMENTS,
} from '../../actions/action_types'

const INITIAL_STATE = {
  allComments: [],
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case GET_COMMENTS:
      return {
        ...state,
        allComments: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
