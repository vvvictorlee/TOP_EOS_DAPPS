import {
  SAVE_EOS_PRICE,
  SAVE_EOS_CAP,
} from '../action_types'

export const saveEosPriceToRedux = (eosPrice) => {
  console.log(eosPrice)
  return (dispatch) => {
    dispatch({
      type: SAVE_EOS_PRICE,
      payload: eosPrice,
    })
  }
}

export const saveEosCapToRedux = (eosCap) => {
  console.log(eosCap)
  return (dispatch) => {
    dispatch({
      type: SAVE_EOS_CAP,
      payload: eosCap,
    })
  }
}
