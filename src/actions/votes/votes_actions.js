import {
  GET_VOTES,
} from '../action_types'

export const saveVotesToRedux = (votesData) => {

  return (dispatch) => {
    dispatch({
      type: GET_VOTES,
      payload: votesData,
    })
  }
}
