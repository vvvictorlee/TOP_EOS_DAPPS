// Compt for copying as a HomePage
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import axios from 'axios'
import image from '../../../back.jpg'
import eosimg from '../../../topeos.jpg'
import { withRouter } from 'react-router-dom'
import TopPosts from '../tabs/TopPosts.js'
import NewPosts from '../tabs/NewPosts.js'
import TrendingPosts from '../tabs/TrendingPosts.js'
import CreatePost from '../post/CreatePost.js'
import Login from '../login/Login.js'
import Particles from 'particlesjs'
import {
	Tabs,
	WhiteSpace,
} from 'antd-mobile'
import {
	Button, Icon
} from 'antd'
import { StickyContainer, Sticky } from 'react-sticky'


// import TopPosts from '../tabs/TopPosts.js'
// import NewPosts from '../tabs/NewPosts.js'

const tabs = [
  { title: 'TOP ƉAPPS' },
  { title: 'NEW ƉAPPS' },
  { title: 'TRENDING ƉAPPS' },
]

class HomePage extends Component {

	constructor(){
		super()
		this.state = {
			pressed: false,
		}
	}

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
		console.log(localStorage.getItem('username'))
		console.log(localStorage.getItem('access_token'))
	}



	scrollWin() {
		console.log('scroll')
		window.scrollTo({
		    top: 670,
		    behavior: "smooth"
		})
	}

	isPressed(){
		if (this.state.pressed == true){
			return (<CreatePost />)
		}
		else {
			return (<div id='Login' style={comStyles().postButton}>
								<div style={{marginTop: '25%', marginBottom: '5%'}}>
									<Button type='primary' size='large' onClick={() => this.setState({pressed: !this.state.pressed })} >POST</Button>
								</div>
							</div>)
		}
	}

	render() {
		console.log('harro')
		console.log(this.props.login)
		return (
			<div id='HomePage' style={comStyles().container}>
				<div style={comStyles().topPart}>
					<p id='titleName' style={comStyles().titleName}><br/><br/>TOP EOS ƉAPPS</p>
					<center><Button size="large" icon='caret-down' type='default' ghost='true' shape="circle" onClick={() => this.scrollWin()}></Button></center>
				</div>
				<h2 style={comStyles().eosStats}>
					<p>EOS PRICE:  {this.props.eosPrice}</p>
					<p>EOS MARKETCAP:  {this.props.eosCap}</p>
				</h2>
				<div id='main' style={comStyles().titleContainer}>
					{
						this.props.login
						?
						<div>
				      {
								this.isPressed()
							}
				    </div>
						:
						<Login />
					}
			    <StickyContainer>
			      <Tabs
							tabs={tabs}
			        initalPage={'t2'}
							onChange={(e) => console.log(e)}>
			        <div style={comStyles().insideTabs}>
								<TopPosts />
			        </div>
			        <div style={comStyles().insideTabs}>
								<NewPosts />
			        </div>
			        <div style={comStyles().insideTabs}>
			          <TrendingPosts />
			        </div>
			      </Tabs>
			    </StickyContainer>
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
HomePage.propTypes = {
	history: PropTypes.object.isRequired,
  eosPrice: PropTypes.number.isRequired,
	eosCap: PropTypes.string.isRequired,
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
			// background: '#ee0979',
			// background: '-webkit-linear-gradient(to right, #ff6a00, #ee0979)',
			// background: 'linear-gradient(to right, #ff6a00, #ee0979)',
			backgroundColor: '#FFFAFA',
			height: '100%',
		},
		titleName: {
			color: 'white',
			textAlign: 'center',
			fontSize: '450%',
		},
		eosStats: {
			color: 'black',
			display: 'flex',
			justifyContent: 'space-around',
			marginTop: '2%'
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
		},
		insideTabs: {
			height: '100%',
		},
		topPart: {
			background: '#7F7FD5',
      background: '-webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)',
      background: 'linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)',
			height: '500px',
		},
		postButton: {
			borderRadius: '25px',
			backgroundColor: 'ADD8E6',
			marginBottom:'3%',
			marginRight: '40%',
			marginLeft: '40%',
      textAlign: 'center',
		},
	}
}
