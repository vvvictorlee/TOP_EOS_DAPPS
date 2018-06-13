import {
  GET_COMVOTES,
} from '../action_types'

export const saveComvotesToRedux = (comvotesData) => {

  return (dispatch) => {
    dispatch({
      type: GET_COMVOTES,
      payload: comvotesData,
    })
  }
}
