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

const FormItem = Form.Item;

class Login extends Component {

  constructor() {
		super()
		this.state = {
				username: '',
        password: '',
        pressed: false,
		};
	}

  submitPost(){
    this.setState({pressed: true})
    const thisUser = this.props.users.filter((user) => user.username == this.state.username)
    if (!thisUser.length > 0){
      console.log('yay')
      sendUserToDB({username: this.state.username})
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
      console.log(thisUser)
      this.props.saveLoginToRedux(thisUser[0].user_id)
    }
    console.log(this.props.login)
    setTimeout(() => { this.setState({pressed: false}) }, 1000)
  }

	render() {
		return (
      <div id='Login' style={comStyles().postsContainer}>
  			<h2 id='LoginTitle'><br/>Log In</h2>
        <Form onSubmit={() => this.submitPost()} >

					<div>
						<FormItem>
								<Input
								prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Username"
								value={this.state.username}
								onChange={(e) => this.setState({ username: e.target.value })}
								/>
						</FormItem>
						<FormItem>
							<Input
								prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Password"
								value={this.state.password}
								onChange={(e) => this.setState({ password: e.target.value })}
							/>
						</FormItem>
						<Button icon={this.state.pressed ? 'caret-down' : 'down'} type={this.state.pressed ? 'default' : 'primary'} onClick={() => this.submitPost()}>Login</Button>
					</div>

				</Form>
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
