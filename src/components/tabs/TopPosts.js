// Compt for copying as a template
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  List, Avatar, Button, Spin
} from 'antd'

class TopPosts extends Component {

  constructor() {
		super()
		this.state = {
      loading: true,
      loadingMore: false,
      showLoadingMore: true,
      data: [],
      count: 5,
		}
	}

  componentWillMount(){
    console.log('asd')
  }

  componentDidMount(){
    console.log('asd')
  }


  shouldComponentUpdate(nextProps) {
    console.log('hit shouldComponentUpdate')
    console.log(nextProps)
    if (nextProps.posts != this.props.posts){
      return true
    }
    else {
      return false
    }
  }

  componentWillUpdate(nextProps){
    console.log('will updated')
    console.log(nextProps)
    console.log(nextProps.posts.slice(0,this.state.count))

    this.setState({
      data: nextProps.posts.slice(0,this.state.count),
      loadingMore: false,
      loading: false,
    })
  }


  onLoadMore = () => {
    this.setState({
      loadingMore: true,
      count: this.state.count + 5
    })
  }

	render() {
    const { loading, loadingMore, showLoadingMore, data } = this.state;
    const loadMore = showLoadingMore ? (
      <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
        {loadingMore && <Spin />}
        {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
      </div>
    ) : null;
		return (
      <div >
  			<h2 id='TopPostsTitle' style={comStyles().topicName}><br/>TOP POSTS</h2>
        <div id='TopPosts' style={comStyles().postsContainer}>
          <div style={comStyles().postsList}>
            <br />
            <List
            className="demo-loadmore-list"
            loading={loading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={this.state.data}
            renderItem={item => (
              <List.Item actions={[<a>edit</a>, <a>more</a>]}>
                <List.Item.Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title={<a href="https://ant.design">{item.title}</a>}
                  description={item.description}
                />
                <div>content</div>
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
{
  // <List
  //   style={comStyles().postsList}
  //   className="demo-loadmore-list"
  //   itemLayout="horizontal"
  //   dataSource={this.props.posts.sort((a, b) => b.votes - a.votes)}
  //   renderItem={item => {
  //     return (
  //       <List.Item actions={[<Button icon={'heart'} type='primary' onClick={() => this.upVote(item.id, this.props.username)}>  {item.votes} </Button>]}>
  //
  //         <List.Item.Meta
  //           avatar={
  //              <Avatar style={{ backgroundColor: 'red', verticalAlign: 'middle' }} size="large">
  //                {item.username[0].toUpperCase()}
  //              </Avatar>
  //           }
  //           title={<a>{item.toppick}</a>}
  //           description={item.Description}
  //         />
  //         <div>User: {item.username}</div>
  //
  //       </List.Item>
  //     )
  //   }}
  // />
}
// defines the types of variables in this.props
TopPosts.propTypes = {
	history: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
}

// for all optional props, define a default value
TopPosts.defaultProps = {
  posts: []
}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(TopPosts)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
  return {
    posts: redux.posts.allPosts
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
		postsContainer: {
			borderRadius: '25px',
			backgroundColor: '#E0FFFF',
			boxShadow: '10px 10px 5px grey',
			marginBottom:'3%',
			marginTop: '3%',
			marginRight: '8%',
			marginLeft: '8%',
		},
		topicName: {
			textAlign: 'center',
		},
		postsList: {
			marginRight: '5%',
			marginLeft: '5%',
		},
	}
}
