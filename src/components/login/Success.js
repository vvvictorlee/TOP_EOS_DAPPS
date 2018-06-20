// Compt for copying as a Success
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  message
} from 'antd'
import { saveLoginToRedux, saveLogUserToRedux } from '../../actions/users/login_actions'
import {sendUserToDB, getUsersFromDB, checkUserInDB} from '../../api/users/users_api.js'
import { saveUsersToRedux } from '../../actions/users/users_actions'
import { sc2api } from '../../api/steemconnect/steem_api'

class Success extends Component {

  componentDidMount() {
    console.log(this.props.location)
    const ACCESS_TOKEN = this.props.location.search.slice(
      this.props.location.search.indexOf('access_token=') + 'access_token='.length,
      this.props.location.search.indexOf('&expires_in=')
    )
    const USERNAME = this.props.location.search.slice(
      this.props.location.search.indexOf('username=') + 'username='.length
    )
		localStorage.setItem('access_token', ACCESS_TOKEN)
    sc2api.setAccessToken(ACCESS_TOKEN)
    localStorage.setItem('username', USERNAME)
    this.props.saveLogUserToRedux(USERNAME)
    checkUserInDB({username: USERNAME})
      .then((data) => {
        if ( data.length === 0 ) {
          console.log('yay')
          sendUserToDB({username: USERNAME})
            .then((data) => {
              console.log(data)
              this.props.saveLoginToRedux(data)
              return getUsersFromDB()
            })
            .then((data) => {
              console.log(data)
              this.props.saveUsersToRedux(data)
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          message.success('Welcome back!')
          this.props.saveLoginToRedux(data[0].user_id)
        }
      })
      .then(() => {
        this.props.history.push('/')
      })
  }

  newUser(theUsername) {
    // const thisUser = this.props.users.filter((user) => user.username == theUsername)

  }

	render() {
		return (
			<div id='Success' style={comStyles().container}>
				Success
			</div>
		)
	}

}

// defines the types of variables in this.props
Success.propTypes = {
	history: PropTypes.object.isRequired,
  saveUsersToRedux: PropTypes.func.isRequired,
  saveLoginToRedux: PropTypes.func.isRequired,
  saveLogUserToRedux: PropTypes.func.isRequired,
}

// for all optional props, define a default value
Success.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(Success)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
    saveLoginToRedux,
    saveUsersToRedux,
    saveLogUserToRedux,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
    container: {
			background: '#ee0979',
			background: '-webkit-linear-gradient(to right, #ff6a00, #ee0979)',
			background: 'linear-gradient(to right, #ff6a00, #ee0979)',
      height: '100%',
		},
	}
}
