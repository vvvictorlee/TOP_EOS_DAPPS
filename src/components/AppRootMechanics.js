// Higher Order Compt for initializing actions upon AppRoot load

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { saveVotesToRedux } from '../actions/votes/votes_actions'
import { savePostsToRedux, saveTopPostsToRedux, saveNewPostsToRedux } from '../actions/posts/posts_actions'
import { saveEosPriceToRedux, saveEosCapToRedux } from '../actions/eosStats/eos_actions'
import { saveUsersToRedux } from '../actions/users/users_actions'
import { saveLoginToRedux } from '../actions/users/login_actions'
import { saveCommentsToRedux } from '../actions/comments/comments_actions'
import { getUsersFromDB } from '../api/users/users_api'
import { getPostsFromDB } from '../api/posts/posts_api'
import { getVotesFromDB } from '../api/votes/votes_api'
import { getCommentsFromDB } from '../api/comments/comments_api'

import { getEosPrice, getEosCap } from '../api/coinmarket/eos_api.js'
import moment from 'moment'
// this 'higher order component'(HOC) creator takes a component (called ComposedComponent)
// and returns a new component with added functionality
export default (ComposedComponent) => {
	class AppRootMechanics extends Component {

		componentWillMount() {
			this.getAllPostsAndSaveToRedux()
			this.getAllUsersAndSaveToRedux()
			this.getEosPriceAndSaveToRedux()
			this.getAllVotesAndSaveToRedux()
			this.getAllCommentsAndSaveToRedux()
		}

		componentDidUpdate(prevProps, prevState) {
	    if (prevProps.allPosts !== this.props.allPosts ) {
	      this.getAllPostsAndSaveToRedux()
	    }
	  }

		getAllCommentsAndSaveToRedux() {
			getCommentsFromDB()
				.then((data) => {
					this.props.saveCommentsToRedux(data)
				})
		}

		getAllVotesAndSaveToRedux() {
			getVotesFromDB()
				.then((data) => {
					console.log(data)
					this.props.saveVotesToRedux(data)
				})
		}

		getEosPriceAndSaveToRedux(){
			getEosPrice()
				.then((data) => {
					console.log(data)
					this.props.saveEosPriceToRedux(Math.round(data * 100) / 100)
				}).catch((err) => {
					console.log(err)
				})
			getEosCap()
			.then((data) => {
				console.log(data)
				this.props.saveEosCapToRedux(data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
			}).catch((err) => {
				console.log(err)
			})
		}

		getAllUsersAndSaveToRedux() {
			getUsersFromDB()
				.then((data) => {
					console.log(data)
					this.props.saveUsersToRedux(data)
				})
				.catch((err) => {
					console.log(err)
				})
		}

		getAllPostsAndSaveToRedux() {
			getPostsFromDB()
				.then((data) => {
					console.log(data)
					this.props.savePostsToRedux(data)
				})
				.catch((err) => {
					console.log(err)
				})
		}



		render() {
			// the rendered composed component, with props passed through
			return <ComposedComponent id='AppRootKernal' {...this.props} />
		}
	}

  // defines the types of variables in this.props
  AppRootMechanics.propTypes = {
  	history: PropTypes.object.isRequired,
		savePostsToRedux: PropTypes.func.isRequired,
		saveUsersToRedux: PropTypes.func.isRequired,
		saveTopPostsToRedux: PropTypes.func.isRequired,
		saveNewPostsToRedux: PropTypes.func.isRequired,
		saveEosPriceToRedux: PropTypes.func.isRequired,
		saveVotesToRedux: PropTypes.func.isRequired,
  }

  // for all optional props, define a default value
  AppRootMechanics.defaultProps = {

  }

	const mapStateToProps = (redux) => {
		return {

		}
	}

	// we nest our custom HOC to connect(), which in itself is a HOC
	// we can actually nest HOC infinitely deep
	return withRouter(
		connect(mapStateToProps, {
			savePostsToRedux,
			saveUsersToRedux,
			saveNewPostsToRedux,
			saveTopPostsToRedux,
			saveEosPriceToRedux,
			saveEosCapToRedux,
			saveVotesToRedux,
			saveCommentsToRedux,
    })(AppRootMechanics)
	)
}

// Pseudo-code demonstrating how to use the higher order component (HOC)
/*
	// In some other location (not in this file), we want to use this HOC...
	import AppRootMechanics	// The HOC
	import Resources		// The component to be wrapped
	const ComposedComponent = AppRootMechanics(Resources);

	// In some render method...
	<ComposedComponent />

	// <ComposedComponent> actually renders the AppRootMechanics class, which renders the composed component
	// This 2 layer method is powerful because when we pass in props to <ComposedComponent> like below:
	<ComposedComponent propA={propA} />
	// we can pass those props into the 2nd layer (composed component) using a correct 'this' reference to the 1st layer
*/
