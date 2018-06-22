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
import { savePostsToRedux, saveSelectedPostToRedux } from '../../actions/posts/posts_actions'
import { saveVotesToRedux } from '../../actions/votes/votes_actions'
import { sc2api } from '../../api/steemconnect/steem_api'
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

  submitVote(v, auth, steemlink, plink){
    if (this.props.login) {
      if (this.props.allVotes.filter((vote) => vote.post_id == v && vote.user_id == this.props.login).length > 0) {
        message.warning('Cannot double vote!')
      }
      else {
        console.log('votesubmitted')
        if (steemlink) {
          console.log(plink)
          sc2api.vote(this.props.loggedUser, auth, plink, 10000, function (err, res) {
            if (err){
              console.log(err.error_description)
            }
            else {
              console.log(res)
            }
          })
        }
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

  changeSelected(post) {
    this.props.saveSelectedPostToRedux(post)
    this.props.history.push('/Post')
  }

  getSite(url) {
    console.log(url)
    const newurl = new URL(url)
    window.open(newurl)
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
  			<h2 id='TrendingPostsTitle' style={comStyles().topicName}><br/>TRENDING ƉAPPS</h2>
        <div id='TrendingPosts' style={comStyles().postsContainer}>
          <div style={comStyles().postsList}>
            <br />
            <List
              className="demo-loadmore-list"
              loading={this.state.loading}
              itemLayout="horizontal"
              loadMore={loadMore}
              dataSource={ this.props.allPosts.sort((a, b) => moment(b.created_at).isAfter(moment(a.created_at))).slice(0,this.state.count)}
              renderItem={item => (
                <List.Item
                  actions={[
                    <a onClick={() => this.getSite(item.url)} >Site</a>,
                    <Button icon={this.state.pressed ? 'like-o' : 'like'} type={this.state.pressed ? 'default' : 'primary'} onClick={() => this.submitVote(item.post_id, item.username, item.steemlink, item.permlink)}>
                      &nbsp;{item.num_votes}
                    </Button>
                  ]}>
                  <List.Item.Meta
                    avatar={<Avatar src={`https://img.busy.org/@${item.username}`} />}
                    title={<a onClick={(e) => this.changeSelected(item)}> <b>{item.title}</b> - <Tag color={this.selectColor(item)}>{item.state}</Tag><br/> {item.summary} </a>}
                    description={item.description}
                  />
                  <div><center> By: {item.username} <br/> Posted: {moment(item.created_at).format("MMM Do YY")} <br/>Release date: {item.project_release ? moment(item.project_release).format("MMM Do YY") : 'TBA'}</center></div>
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
  saveSelectedPostToRedux: PropTypes.func.isRequired,
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
    loggedUser: redux.login.loggedUser,
    allVotes: redux.votes.allVotes,
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
    savePostsToRedux,
    saveVotesToRedux,
    saveSelectedPostToRedux,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		postsContainer: {
			borderRadius: '25px',
			backgroundColor: 'white',
			marginTop: '3%',
			marginRight: '3%',
			marginLeft: '3%',
      marginBottom: '3%'
		},
		topicName: {
			textAlign: 'center',
      fontSize: 30,
      color: 'white',

		},
		postsList: {
			marginRight: '5%',
      marginLeft: '5%',
		},
	}
}
