import {
  LOGGED_IN,
  LOGGED_USER
} from '../../actions/action_types'

const INITIAL_STATE = {
  loggedIn: '',
  loggedUser: '',
}

export default (state = INITIAL_STATE, action) => {
  console.log(action.payload)
	switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        loggedIn: action.payload,
      }
    case LOGGED_USER:
      return {
        ...state,
        loggedUser: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
