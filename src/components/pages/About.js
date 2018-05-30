// Compt for copying as a About
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {

} from 'antd'

import image from '../../../back.jpg'


class About extends Component {

	render() {
		return (
			<div id='About' style={comStyles().container}>
        <div style={comStyles().titleName}>
          TOP EOS DAPPS
        </div>
				<div id='main' style={comStyles().titleContainer}>
          <center>About</center>
          This website is a community driven bulletin board for keeping up with new decentralized applications.
          Users must be signed in via the steem blockchain in order to create posts and upvote.
        </div>
			</div>
		)
	}
}

// defines the types of variables in this.props
About.propTypes = {
	history: PropTypes.object.isRequired,
}

// for all optional props, define a default value
About.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(About)

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
			backgroundImage: 'url('+image+')',
			height: '100%',
		},
    titleContainer: {
			display: 'flex',
			justifyContent: 'space-around',
			flexDirection: 'column',
			backgroundColor: '#ADD8E6',
			fontFamily: 'serif',
			color: 'black',
			marginRight: '8%',
			marginLeft: '8%',
			marginBottom: '1%',
			borderRadius: '25px',
		},
    titleName: {
			color: 'white',
			textAlign: 'center',
		},
	}
}
