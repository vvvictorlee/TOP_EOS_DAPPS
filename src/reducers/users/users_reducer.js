import {
  GET_USERS,
} from '../../actions/action_types'

const INITIAL_STATE = {
  allUsers: null,
}

export default (state = INITIAL_STATE, action) => {
  console.log(action.payload)
	switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        allUsers: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
