const axios = require('axios')
const uuid = require('uuid')
// import { authHeaders } from './authHeaders'
const authHeaders = {
  header: {
    'Authorization': 'Bearer <AUTH_TOKEN_ID>'
  }
}

const sendUserToDB = (userInfo) => { //get all post info for list
  const p = new Promise((res, rej) => {
    console.log(userInfo)
    userInfo.user_id = uuid()
    console.log(userInfo)
    axios.post(
      `https://a9ff2e73.ngrok.io/add_new_user`,
      userInfo,
      authHeaders
    ).then((data) => {
      console.log('yayaaya')
      console.log(data)
      res(data)
    }).catch((err) => {
      console.log(err.response.data)
    })

  })
  return p
}



sendUserToDB({username: 'asdasdasd'})
