import sc2 from 'sc2-sdk'

export const sc2api = sc2.Initialize({
  app: 'topeosdapps',
  callbackURL: 'https://localhost:5000/Success',
  scope: ['vote','comment'],
})
