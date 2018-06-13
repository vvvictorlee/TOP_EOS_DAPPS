Login// Compt for copying as a template
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  Button,
	Input,
  Calendar,
  Form,
  Icon,
  DatePicker,
  Tooltip,
} from 'antd'
import moment from 'moment'
import {sendUserToDB, getUsersFromDB} from '../../api/users/users_api.js'
import { saveUsersToRedux } from '../../actions/users/users_actions'
import { saveLoginToRedux } from '../../actions/users/login_actions'
import { sc2api } from '../../api/steemconnect/steem_api'
const FormItem = Form.Item;

class Login extends Component {

  constructor() {
		super()
		this.state = {
				username: '',
        password: '',
        pressed: false,
        loading: false,
		}
	}


  getLoginURL(e) {
    this.setState({
      loading: true,
    })
    window.location.href = 'https://v2.steemconnect.com/oauth2/authorize?client_id=topeosdapps&redirect_uri=https://localhost:5000/Success/&scope=vote,comment'
  }



	render() {
		return (
      <div id='Login' style={comStyles().postsContainer}>
				<div style={{marginTop: '25%', marginBottom: '5%'}}>
					<Button type='primary' loading={this.state.loading} size='large' onClick={(e) => this.getLoginURL(e)}>LOGIN</Button>
				</div>
			</div>
		)
	}
}

// defines the types of variables in this.props
Login.propTypes = {
	history: PropTypes.object.isRequired,
  users: PropTypes.array,
  saveUsersToRedux: PropTypes.func.isRequired,
  saveLoginToRedux: PropTypes.func.isRequired,
}

// for all optional props, define a default value
Login.defaultProps = {
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(Login)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    users: redux.users.allUsers,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
    saveUsersToRedux,
    saveLoginToRedux,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		postsContainer: {
			borderRadius: '25px',
			backgroundColor: 'ADD8E6',
			marginBottom:'3%',
			marginRight: '40%',
			marginLeft: '40%',
      textAlign: 'center',
		},
	}
}
