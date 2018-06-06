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
			<div id='HomePage' style={comStyles().container}>
				<br/>
				<h2 style={comStyles().eosStats}>
					<p>About</p>
				</h2>
				<div id='main' style={comStyles().titleContainer}>
					<div>
						This website is dope
					</div>
				</div>
				<center style={{marginBottom: '1%'}}>
					Donations <br/>
					BTC: skjdnflsmdf <br/>
					EOS: jaksdnasdna
				</center>
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
			background: '#ee0979',
			background: '-webkit-linear-gradient(to right, #ff6a00, #ee0979)',
			background: 'linear-gradient(to right, #ff6a00, #ee0979)',
			height: '100vh',
		},
		eosStats: {
			color: 'white',
			display: 'flex',
			justifyContent: 'space-around',
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
	}
}
