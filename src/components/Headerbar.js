// Compt for copying as a Headerbar
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  Menu, Icon
} from 'antd'


class Headerbar extends Component {

  handleClick = (e) => {
    console.log('click ', e)
    if (e == '.$Home') {
      this.props.history.push('/')
    }
    else if (e == '.$About') {
      this.props.history.push('/About')
    }

  }

	render() {
		return (
			<div id='Headerbar' style={comStyles().container}>
        <Menu
          theme='dark'
          mode="horizontal"
        >
          <Menu.Item key='1' onClick={() => this.props.history.push('/')}><Icon type="home" />HOME</Menu.Item>
				  <Menu.Item key='2' onClick={() => this.props.history.push('/About')}><Icon type="info-circle-o" />ABOUT</Menu.Item>
        </Menu>
			</div>
		)
	}
}

// defines the types of variables in this.props
Headerbar.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
Headerbar.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(Headerbar)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {

	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {

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
