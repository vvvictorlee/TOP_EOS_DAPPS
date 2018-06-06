// Compt for copying as a Success
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd-mobile'
import { saveLoginToRedux } from '../../actions/users/login_actions'
import {sendUserToDB, getUsersFromDB, checkUserInDB} from '../../api/users/users_api.js'
import { saveUsersToRedux } from '../../actions/users/users_actions'

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
    localStorage.setItem('username', USERNAME)
    checkUserInDB({username: USERNAME})
      .then((data) => {
        if (data === []) {
          console.log('yay')
          sendUserToDB({username: USERNAME})
          .then((data) => {
            console.log(data)
            this.props.saveLoginToRedux(data)
            return getUsersFromDB()})
            .then((data) => {
              console.log(data)
              this.props.saveUsersToRedux(data)
            })
            .catch((err) => {
              console.log(err)
            })
        }
        else {
          alert('user exists')
          this.props.saveLoginToRedux(data[0].user_id)
        }
      }).then(() => {
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
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		container: {
      display: 'flex',
      flexDirection: 'column',
		}
	}
}
