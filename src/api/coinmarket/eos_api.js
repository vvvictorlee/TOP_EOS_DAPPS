
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


export const getEosPrice = () => { //get all post info for list
  const p = new Promise((res, rej) => {
    axios.get(
      `https://api.coinmarketcap.com/v2/ticker/1765/`,
      authHeaders
    ).then((data) => {
      res(data.data.data.quotes.USD.price)
    }).catch((err) => {
      console.log(err)
      rej(err)
    })

  })
  return p
}

export const getEosCap = () => { //get all post info for list
  const p = new Promise((res, rej) => {
    axios.get(
      `https://api.coinmarketcap.com/v2/ticker/1765/`,
      authHeaders
    ).then((data) => {
      console.log(data.data.data.quotes.USD.market_cap)
      res(data.data.data.quotes.USD.market_cap)
    }).catch((err) => {
      console.log(err)
      rej(err)
    })

  })
  return p
}
