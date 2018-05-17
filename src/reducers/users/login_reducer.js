import {
  LOGGED_IN,
} from '../../actions/action_types'

const INITIAL_STATE = {
  loggedIn: null,
}

export default (state = INITIAL_STATE, action) => {
  console.log(action.payload)
	switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
