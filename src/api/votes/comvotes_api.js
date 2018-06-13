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

export const sendComvoteToDB = (comvoteInfo) => {
  comvoteInfo.comvote_id = uuid()
  return axios.post(
    `${POSTGRES_DB}/add_new_comvote`,
    comvoteInfo,
    authHeaders
  )
}


export const getComvotesFromDB = () => { //get all post info for list
  return axios.post(
    `${POSTGRES_DB}/get_all_comvotes`,
    authHeaders
  ).then((data) => {
    console.log(data)
    return data.data.comvotes
  })
}
