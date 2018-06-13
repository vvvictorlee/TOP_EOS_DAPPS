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
import { sendComvoteToDB } from '../../api/votes/comvotes_api'

import { getPostsFromDB } from '../../api/posts/posts_api'
import { getVotesFromDB } from '../../api/votes/votes_api'


import { savePostsToRedux, saveSelectedPostToRedux } from '../../actions/posts/posts_actions'
import { saveCommentsToRedux } from '../../actions/comments/comments_actions'
import { saveVotesToRedux } from '../../actions/votes/votes_actions'
import { saveComvotesToRedux } from '../../actions/votes/comvotes_actions'

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


  submitComvote(cv){
    console.log(cv)
    if (this.props.login) {
      if (this.props.allComvotes.filter((comvote) => comvote.comment_id == cv && comvote.user_id == this.props.login).length > 0) {
        message.warning('Cannot double vote!')
      }
      else {
        console.log('votesubmitted')

        sendComvoteToDB({
          user_id: this.props.login,
          comment_id: cv
        })
          .then(() => Promise.join(
            getCommentsFromDB().then(comments => this.props.saveCommentsToRedux(comments)),
            getComvotesFromDB().then(comvotes => this.props.saveComvotesToRedux(comvotes))
          ))

      }
    }
    else {
      message.warning('You are not signed in!')
    }
  }

  submitVote(v){
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

  postComment() {
    console.log('post comment')
    console.log(this.state.comment)
    sendCommentsToDB({
      user_id: this.props.login, //change to this.props.login when steemconnect works
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
        <div style={comStyles().topPart}>
          <p id='titleName' style={comStyles().titleName}><br/>COMMENTS</p>
        </div>
				<h2 style={comStyles().eosStats}>
					<p>EOS PRICE:  {this.props.eosPrice}</p>
					<p>EOS MARKETCAP:  {this.props.eosCap}</p>
				</h2>
				<div id='main' style={comStyles().titleContainer}>
          <div style={comStyles().postsList}>
            <div style={{marginTop: '1%', marginBottom: '1%', marginLeft: '1%', marginRight: '1%'}}>
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
          </div>

          {
  					this.props.login
  					?
            <div style={comStyles().commentBox}>
              <TextArea rows={3} placeholder='COMMENT: ' onChange={(e) => this.setState({ comment: e.target.value })}></TextArea>
              <Button style={{ marginLeft: '3%', marginTop: '1.5%'}} icon='form' size='large' shape='circle' type='default' onClick={() => this.postComment()}></Button>
            </div>
  					:
  					<Login />
  				}

          <h3><center>Comments</center></h3>
          <div style={comStyles().commentsList}>
            <div style={{marginTop: '1%', marginBottom: '1%', marginLeft: '1%', marginRight: '1%'}}>
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={ this.props.comments.filter((comment) => comment.post_id === this.props.selectedPost.post_id ) }
                renderItem={item => (
                  <List.Item
                    actions={[
                      <Button icon={this.state.pressed ? 'like-o' : 'like'} type={this.state.pressed ? 'default' : 'primary'} onClick={ () => this.submitComvote(item.comment_id) }>
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
Post.propTypes = {
	history: PropTypes.object.isRequired,
  eosPrice: PropTypes.number.isRequired,
	eosCap: PropTypes.string.isRequired,
  selectedPost: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired,
  allComvotes: PropTypes.array.isRequired,
  allVotes: PropTypes.array.isRequired,
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
    allComvotes: redux.comvotes.allComvotes,
    allVotes: redux.votes.allVotes,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
    savePostsToRedux,
    saveVotesToRedux,
    saveSelectedPostToRedux,
    saveCommentsToRedux,
    saveComvotesToRedux,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
    container: {
			backgroundColor: 'white',
			height: '100vh',
		},
		eosStats: {
			color: 'black',
			display: 'flex',
			justifyContent: 'space-around',
      marginTop: '2%',
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
    postsList: {
      backgroundColor: 'white',
			marginRight: '2%',
      marginLeft: '2%',
      marginTop: '2%',
		},
    commentsList: {
      backgroundColor: 'white',
			marginRight: '5%',
      marginLeft: '5%',
      marginBottom: '3%',
      borderRadius: '25px',
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
