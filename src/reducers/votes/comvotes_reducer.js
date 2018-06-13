import {
  GET_COMVOTES,
} from '../../actions/action_types'

const INITIAL_STATE = {
  allComvotes: [],
}

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
    case GET_COMVOTES:
      return {
        ...state,
        allComvotes: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
