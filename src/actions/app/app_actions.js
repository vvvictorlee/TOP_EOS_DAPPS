import {
  CHANGE_LANGUAGE,
} from '../action_types'
import {getPostsFromDB, getVotesFromDB} from '../../api/API_URLS.js'
// change the language of the app
export const changeAppLanguage = (languageCode) => {
  // dispatch lets you send actions to Redux
  localStorage.setItem('rentburrow_lang', languageCode)
  return (dispatch) => {
    dispatch({
      type: CHANGE_LANGUAGE,
      payload: languageCode,
    })
  }
}
