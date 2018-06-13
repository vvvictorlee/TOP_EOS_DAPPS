// Compt for copying as a About
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
	Button,
	Icon,

} from 'antd'

import image from '../../../back.jpg'


class About extends Component {

	render() {
		return (
			<div id='HomePage' style={comStyles().container}>
				<div style={comStyles().topPart}>
					<p id='titleName' style={comStyles().titleName}><br/>ABOUT</p>
				</div>
				<br/>
				<h2 style={comStyles().eosStats}>
					<p>EOS PRICE:  {this.props.eosPrice}</p>
					<p>EOS MARKETCAP:  {this.props.eosCap}</p>
				</h2>
				<div id='main' style={comStyles().titleContainer}>
					<div style={comStyles().postsContainer}>
						<div style={{marginTop: '3%', marginBottom: '3%'}}>
							List of top rated decentralised applications on the <a href='https://eos.io'>EOS</a> blockchain. <br/>
							Log in with <a href='https://steemit.com'>Steemit</a> account to Vote for applications.
						</div>
					</div>
				</div>
				<center style={{marginBottom: '1%'}}>
					- Donations -<br/>
					BTC: 35DErwGr4FxTox6LHArDefgz9XLFy8Hsx4 <br/>
				</center>
			</div>
		)
	}
}

// defines the types of variables in this.props
About.propTypes = {
	history: PropTypes.object.isRequired,
	eosPrice: PropTypes.number.isRequired,
	eosCap: PropTypes.string.isRequired,
}

// for all optional props, define a default value
About.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(About)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
		eosPrice: redux.eos.eosPrice,
		eosCap: redux.eos.eosCap,
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
			backgroundColor: '#FFFAFA',
			height: '100vh',
		},
		eosStats: {
			color: 'black',
			display: 'flex',
			justifyContent: 'space-around',
			marginTop: '1%'
		},
		titleContainer: {
			display: 'flex',
			boxShadow: '10px 10px 5px grey',
			justifyContent: 'space-around',
			flexDirection: 'column',
			background: '#7F7FD5',
      background: '-webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)',
      background: 'linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)',
			color: 'black',
			marginRight: '3%',
			marginLeft: '3%',
			marginBottom: '1%',
			textAlign: 'center',
		},
		postsContainer: {
			borderRadius: '25px',
			backgroundColor: 'white',
			marginTop: '3%',
			marginRight: '3%',
			marginLeft: '3%',
      marginBottom: '3%'
		},
		topPart: {
			background: '#7F7FD5',
      background: '-webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)',
      background: 'linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)',
			height: '200px',
		},
		titleName: {
			color: 'white',
			textAlign: 'center',
			fontSize: '350%',
		},
	}
}
