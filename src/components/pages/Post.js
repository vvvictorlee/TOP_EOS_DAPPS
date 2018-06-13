// Compt for copying as a Post
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  Button, Icon, Input, List, Avatar, Spin, message, Tag
} from 'antd'
import Login from '../login/Login.js'
import moment from 'moment'
import { sendCommentsToDB, getCommentsFromDB } from '../../api/comments/comments_api'
import { sendVotesToDB } from '../../api/votes/votes_api'
import { getPostsFromDB } from '../../api/posts/posts_api'
import { getVotesFromDB } from '../../api/votes/votes_api'
import { savePostsToRedux, saveSelectedPostToRedux } from '../../actions/posts/posts_actions'
import { saveCommentsToRedux } from '../../actions/comments/comments_actions'
import { saveVotesToRedux } from '../../actions/votes/votes_actions'

const { TextArea } = Input

class Post extends Component {

  constructor(){
    super()
    this.state = {
      comment: '',
    }
  }

  selectColor(item) {
    if (item.state === 'LIVE') {
      return 'green'
    }
    else if (item.state === 'BETA') {
      return 'yellow'
    }
    else if (item.state === 'PROTOTYPE') {
      return 'red'
    }
    else if (item.state === 'CONCEPT') {
      return 'blue'
    }
  }

  submitVote(v){
    this.setState({
      pressed: !this.state.pressed,
    })
    if (this.props.login) {
      if (this.props.allVotes.filter((vote) => vote.post_id == v && vote.user_id == this.props.login).length > 0) {
        message.warning('Cannot double vote!')
      }
      else {
        console.log('votesubmitted')

        sendVotesToDB({
          user_id: this.props.login,
          post_id: v
        })
          .then(() => Promise.join(
            getPostsFromDB().then(posts => this.props.savePostsToRedux(posts)),
            getVotesFromDB().then(votes => this.props.saveVotesToRedux(votes))
          ))

      }
    }
    else {
      message.warning('You are not signed in!')
    }
  }

  submitComvote(cv){
    
  }

  postComment() {
    console.log('post comment')
    console.log(this.state.comment)
    sendCommentsToDB({
      user_id: '495dccd2-283a-41a4-a81b-ec19e5f075a3', //change to this.props.login when steemconnect works
      post_id: this.props.selectedPost.post_id,
      comment: this.state.comment,
    })
    .then(() => {
      return getCommentsFromDB()
      .then((data) => {
        this.props.saveCommentsToRedux(data)
      })
    })
  }

	render() {

		return (
      <div id='HomePage' style={comStyles().container}>
        <br/>
				<h2 style={comStyles().eosStats}>
					<p>EOS PRICE:  {this.props.eosPrice}</p>
					<p>EOS MARKETCAP:  {this.props.eosCap}</p>
				</h2>
				<div id='main' style={comStyles().titleContainer}>
          <div style={comStyles().postsList}>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={ [this.props.selectedPost] }
              renderItem={item => (
                <List.Item
                  actions={[
                    <a href={item.url} >Site</a>,
                    <Button icon={this.state.pressed ? 'like-o' : 'like'} type={this.state.pressed ? 'default' : 'primary'} onClick={() => this.submitVote(item.post_id)}>
                      &nbsp;{item.num_votes}
                    </Button>
                  ]}>
                  <List.Item.Meta
                    avatar={<Avatar src={`https://img.busy.org/@${item.username}`} />}
                    title={<a> <b>{item.title}</b> - <Tag color={this.selectColor(item)}>{item.state}</Tag><br/>{moment(item.project_release).format("MMM Do YY")} <br/> {item.summary} </a>}
                    description={item.description}
                  />
                  <div><center> By: {item.username} <br/> Posted: {moment(item.created_at).format("MMM Do YY")}</center></div>
                </List.Item>
              )}
            />
          </div>

          <div style={comStyles().commentBox}>
            <TextArea rows={3} placeholder='COMMENT: ' onChange={(e) => this.setState({ comment: e.target.value })}></TextArea>
            <Button style={{ marginLeft: '3%', marginTop: '1.5%'}} icon='form' size='large' shape='circle' type='default' onClick={() => this.postComment()}></Button>
          </div>

          <h3><center>Comments</center></h3>
          <div style={comStyles().commentsList}>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              dataSource={ this.props.comments.filter((comment) => comment.post_id === this.props.selectedPost.post_id ) }
              renderItem={item => (
                <List.Item
                  actions={[
                    <Button icon={this.state.pressed ? 'like-o' : 'like'} type={this.state.pressed ? 'default' : 'primary'} onClick={() => this.submitComvote(item.comment_id)}>
                      &nbsp;{item.num_comvotes}
                    </Button>
                  ]}>
                  <List.Item.Meta
                    avatar={<Avatar src={`https://img.busy.org/@${item.username}`} />}
                    title={<a> </a>}
                    description={item.comment}
                  />
                  <div><center> By: {item.username} <br/> Posted: {moment(item.created_at).format("MMM Do YY")}</center></div>
                </List.Item>
              )}
            />
          </div>


  				{
  					this.props.login
  					?
  					null
  					:
  					<Login />
  				}

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
Post.propTypes = {
	history: PropTypes.object.isRequired,
  eosPrice: PropTypes.number.isRequired,
	eosCap: PropTypes.string.isRequired,
  selectedPost: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
}

// for all optional props, define a default value
Post.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(Post)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    login: redux.login.loggedIn,
    eosPrice: redux.eos.eosPrice,
    eosCap: redux.eos.eosCap,
    selectedPost: redux.posts.selectedPost,
    comments: redux.comments.allComments,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
    savePostsToRedux,
    saveVotesToRedux,
    saveSelectedPostToRedux,
    saveCommentsToRedux,
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
      background: '#7F7FD5',
      background: '-webkit-linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)',
      background: 'linear-gradient(to right, #91EAE4, #86A8E7, #7F7FD5)',
			fontFamily: 'serif',
			color: 'black',
			marginRight: '8%',
			marginLeft: '8%',
			marginBottom: '1%',
			borderRadius: '25px',
		},
    postsList: {
      backgroundColor: '#E0FFFF',
			marginRight: '2%',
      marginLeft: '2%',
      marginTop: '2%',
			borderRadius: '25px',
		},
    commentsList: {
      backgroundColor: '#E0FFFF',
			marginRight: '5%',
      marginLeft: '5%',
			borderRadius: '25px',
		},
    commentBox: {
      width: '80%',
      marginLeft: '10%',
      marginTop: '3%',
      display: 'flex',
      justifyContent: 'space-around',
      flexDirection: 'row',
      marginBottom: '2%',
    }
	}
}
