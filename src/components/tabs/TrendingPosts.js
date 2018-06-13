// Compt for copying as a template
// This compt is used for...

import Promise from 'bluebird'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  List, Avatar, Button, Spin, message, Tag
} from 'antd'
import { sendVotesToDB } from '../../api/votes/votes_api'
import { getPostsFromDB } from '../../api/posts/posts_api'
import { getVotesFromDB } from '../../api/votes/votes_api'
import { savePostsToRedux } from '../../actions/posts/posts_actions'
import { saveVotesToRedux } from '../../actions/votes/votes_actions'
import moment from 'moment'

class TrendingPosts extends Component {

  constructor() {
		super()
		this.state = {
      loadingMore: false,
      showLoadingMore: true,
      loading: true,
      count: 5,
      color: '',
		}
	}

  componentDidMount() {
    this.setState({
      loading: false,
    })
  }


  onLoadMore() {
    this.setState({
      count: this.state.count + 5,
    })
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

	render() {
    const loadMore = this.state.showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        { this.state.loadingMore && <Spin />}
        {!this.state.loadingMore && <Button onClick={() => this.onLoadMore()}>Load more</Button>}
      </div>
    ) : null;
    return (
      <div>
  			<h2 id='TrendingPostsTitle' style={comStyles().topicName}><br/>TRENDING POSTS</h2>
        <div id='TrendingPosts' style={comStyles().postsContainer}>
          <div style={comStyles().postsList}>
            <br />
            <List
              className="demo-loadmore-list"
              loading={this.state.loading}
              itemLayout="horizontal"
              loadMore={loadMore}
              dataSource={ [1] }
              renderItem={item => (
                <List.Item>
                  Coming soon...
                </List.Item>
              )}
            />
            <br />
          </div>
        </div>
			</div>
		)
	}
}

// defines the types of variables in this.props
TrendingPosts.propTypes = {
	history: PropTypes.object.isRequired,
  allPosts: PropTypes.array.isRequired,
  savePostsToRedux: PropTypes.func.isRequired,
  saveVotesToRedux: PropTypes.func.isRequired,
  allVotes: PropTypes.array.isRequired,
}

// for all optional props, define a default value
TrendingPosts.defaultProps = {
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(TrendingPosts)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
  return {
    allPosts: redux.posts.allPosts,
    login: redux.login.loggedIn,
    allVotes: redux.votes.allVotes,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
    savePostsToRedux,
    saveVotesToRedux,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		postsContainer: {
			borderRadius: '25px',
			backgroundColor: '#E0FFFF',
			boxShadow: '10px 10px 5px grey',
			marginTop: '3%',
			marginRight: '8%',
			marginLeft: '8%',
      marginBottom: '3%'
		},
		topicName: {
			textAlign: 'center',
      fontSize: 30,
		},
		postsList: {
			marginRight: '5%',
      marginLeft: '5%',
		},
	}
}
