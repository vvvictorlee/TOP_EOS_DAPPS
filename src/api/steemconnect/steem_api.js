import sc2 from 'sc2-sdk'
import { STEEM_CALLBACK } from '../API_URLS'

export const sc2api = sc2.Initialize({
  app: 'topeosdapps',
  callbackURL: STEEM_CALLBACK,
  accessToken: 'access_token',
  scope: ['comment', 'vote'],
})
