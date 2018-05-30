import {
  GET_VOTES,
} from '../../actions/action_types'

const INITIAL_STATE = {
  allVotes: [],
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case GET_VOTES:
      return {
        ...state,
        allVotes: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
