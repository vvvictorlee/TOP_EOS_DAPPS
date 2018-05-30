import {
  SAVE_EOS_PRICE,
  SAVE_EOS_CAP,
} from '../../actions/action_types'

const INITIAL_STATE = {
  eosPrice: 0,
  eosCap: 0,
}

export default (state = INITIAL_STATE, action) => {
  console.log(action.payload)
	switch (action.type) {
    case SAVE_EOS_PRICE:
      return {
        ...state,
        eosPrice: action.payload,
      }
    case SAVE_EOS_CAP:
      return {
        ...state,
        eosCap: action.payload,
      }
		default:
			return {
				...state
			}
	}
}
