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

export const sendUserToDB = (userInfo) => { //get all post info for list
  const p = new Promise((res, rej) => {
    console.log(userInfo)
    userInfo.user_id = uuid()
    console.log(userInfo)
    axios.post(
      `${POSTGRES_DB}/add_new_user`,
      userInfo,
      authHeaders
    ).then((data) => {
      console.log('yayaaya')
      console.log(data)
      res(data.data.user_id)
    }).catch((err) => {
      console.log(err.response.data)
    })

  })
  return p
}

export const getUsersFromDB = () => { //get all post info for list
  const p = new Promise((res, rej) => {

    axios.post(
      `${POSTGRES_DB}/get_all_users`,
      authHeaders
    ).then((data) => {
      console.log(data.data.users)
      res(data.data.users)
    }).catch((err) => {
      console.log(err.response.data)
    })

  })
  return p
}
