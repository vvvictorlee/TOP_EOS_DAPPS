// Compt for copying as a HomePage
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import axios from 'axios'
import image from '../../../back.jpg'
import { withRouter } from 'react-router-dom'
import TopPosts from '../tabs/TopPosts.js'
import CreatePost from '../post/CreatePost.js'
import Login from '../login/Login.js'
import {
	Tabs,
	WhiteSpace,
} from 'antd-mobile'
import { StickyContainer, Sticky } from 'react-sticky'

// import TopPosts from '../tabs/TopPosts.js'
// import NewPosts from '../tabs/NewPosts.js'

const tabs = [
  { title: 'Top Posts' },
  { title: 'New Posts' },
  { title: 'Promoted Posts' },
];

class HomePage extends Component {


	 componentDidMount() {
	// 	const header = {
	// 		headers: {
	// 			Authorization: `Bearer ya29.Glu7Bdud3VohT5haADb3XVTpdz6UdzlxnI1tJk7WVGjnK2xm116uSgCOzyd0vGhHcWbh9d2fYzSSwRxL4mqOhuZ1ousx_RYJgX4-KAt6AYXMi4mFnz7alr-etlPh`
	// 		}
	// 	}
	// 	axios.get('https://www.googleapis.com/gmail/v1/users/me/messages/163606c31190cbaa?format=minimal', header)
	// 		.then((data) => {
	// 			console.log(data.data)
	// 		})
	// 		.catch((err) => {
	// 			console.log(err)
	// 		})
	}

	renderCreatePost(){
		return (
			<CreatePost/>
		)
	}

	renderTopPosts(){
		return (
			<TopPosts />
		)
	}

	renderLogin(){
		return (
			<Login />
		)
	}

	render() {
		console.log('harro')
		console.log(this.props.login)
		return (
			<div id='HomePage' style={comStyles().container}>
				<h1 id='titleName' style={comStyles().titleName}><br/>TOP EOS DAPPS</h1>
				<h2 style={comStyles().eosStats}>
					<p>EOS PRICE:</p>
					<p>EOS MARKETCAP:</p>
				</h2>
				<div id='main' style={comStyles().titleContainer}>
					{this.props.login ? this.renderCreatePost() : this.renderLogin()}
					<div id='tabs' style={comStyles().tabsContainer}>
						<WhiteSpace />
				    <StickyContainer>
				      <Tabs tabs={tabs}
				        initalPage={'t2'}
								onChange={(e) => console.log(e)}>
				        <div style={{  backgroundColor: '#ADD8E6' }}>
									{this.renderTopPosts()}
				        </div>
				        <div style={{  backgroundColor: '#ADD8E6' }}>

				        </div>
				        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '250px', backgroundColor: '#ADD8E6' }}>
				          Content of third tab
				        </div>
				      </Tabs>
				    </StickyContainer>
				    <WhiteSpace />
					</div>
				</div>
			</div>
		)
	}
}

// defines the types of variables in this.props
HomePage.propTypes = {
	history: PropTypes.object.isRequired,
	
}

// for all optional props, define a default value
HomePage.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(HomePage)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
		login: redux.login.loggedIn,
		// posts: redux.posts.allPosts,
		// votes: redux.votes.allVotes,
		// users: redux.users.allUsers,
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
		titleName: {
			color: 'white',
			textAlign: 'center',
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
			marginBottom:'4%',
			borderRadius: '25px',
		},
		tabsContainer: {
			display: 'flex',
			justifyContent: 'space-around',
			flexDirection: 'column',
			backgroundColor: '#ADD8E6',
			fontFamily: 'serif',
			color: 'black',
			marginBottom:'4%',
			borderRadius: '25px',
		},
	}
}
