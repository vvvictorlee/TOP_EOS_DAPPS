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

export const sendPostToDB = (postInfo) => { //get all post info for list
  const p = new Promise((res, rej) => {
    console.log(postInfo)
    postInfo.post_id = uuid()
    console.log(postInfo)
    axios.post(
      `${POSTGRES_DB}/add_new_post`,
      postInfo,
      authHeaders
    ).then((data) => {
      console.log(data)
      res(data)
    }).catch((err) => {
      console.log(err.response.data)
    })

  })
  return p
}

export const getPostsFromDB = () => { //get all post info for list
  const p = new Promise((res, rej) => {

    axios.post(
      `${POSTGRES_DB}/get_all_posts`,
      authHeaders
    ).then((data) => {
      console.log(data)
      console.log(data.data.posts)
      res(data.data.posts)
    }).catch((err) => {
      console.log(err.response.data)
    })

  })
  return p
}
