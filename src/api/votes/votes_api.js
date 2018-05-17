// This file sets our API URLS used throughout the app
// toggle these to access development versus production servers
import { POSTGRES_DB } from '../API_URLS'
const axios = require('axios')
const uuid = require('uuid')
// import { authHeaders } from './authHeaders'
const authHeaders = {
  header: {
    'Authorization': 'Bearer <AUTH_TOKEN_ID>'
  }
}


export const getVotesFromDB = () => { //get all post info for list
  const p = new Promise((res, rej) => {

    axios.post(
      `${POSTGRES_DB}/get_all_votes`,
      authHeaders
    ).then((data) => {
      console.log(data.data.votes)
      res(data.data.votes)
    }).catch((err) => {
      console.log(err.response.data)
    })

  })
  return p
}
