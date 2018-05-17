// Compt for copying as a template
// This compt is used for...

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Radium from 'radium'
import PropTypes from 'prop-types'
import Rx from 'rxjs'
import { withRouter } from 'react-router-dom'
import {
  Button,
	Input,
  Calendar,
  Form,
  Icon,
  DatePicker,
  Tooltip,
} from 'antd'
import moment from 'moment'
import { savePostsToRedux } from '../../actions/posts/posts_actions'
import {sendPostToDB, getPostsFromDB} from '../../api/posts/posts_api.js'

const FormItem = Form.Item;

class CreatePost extends Component {

  constructor() {
		super()
		this.state = {
				topPick: '',
        releaseDate: '',
        description: '',
        pressed: false,
		};
	}

  submitPost(){
    this.setState({pressed: true})
    sendPostToDB({
      user_id: this.props.login, title: this.state.topPick, project_release: this.state.releaseDate,
      description: this.state.description})
    .then((data) => {
      return getPostsFromDB()})
      .then((data) => {
        console.log(data)
        this.props.savePostsToRedux(data)
      })
      .catch((err) => {
        console.log(err)
      })
    setTimeout(() => { this.setState({pressed: false}) }, 1000)
    console.log(this.state.pressed)
  }

	render() {
		return (
      <div id='CreatePost' style={comStyles().postsContainer}>
  			<h2 id='CreatePostTitle'><br/>CREATE POST</h2>
        <Form onSubmit={() => this.submitPost()} >

					<div>
						<FormItem>
								<Input
								prefix={<Icon type="star" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Top Pick"
								value={this.state.topPick}
								onChange={(e) => this.setState({ topPick: e.target.value })}
								/>
						</FormItem>
						<FormItem>
		            <DatePicker placeholder="Release(d) Date" onChange={(e) => this.setState({ releaseDate: moment(e).format()})}/>
		        </FormItem>
						<FormItem>
							<Input
								prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Description"
								value={this.state.description}
								onChange={(e) => this.setState({ description: e.target.value })}
							/>
						</FormItem>
						<Button icon={this.state.pressed ? 'caret-down' : 'down'} type={this.state.pressed ? 'default' : 'primary'} onClick={() => this.submitPost()}>Submit</Button>
					</div>

				</Form>
			</div>
		)
	}
}

// defines the types of variables in this.props
CreatePost.propTypes = {
	history: PropTypes.object.isRequired,
  login: PropTypes.string.isRequired,
  savePostsToRedux: PropTypes.func.isRequired,
}

// for all optional props, define a default value
CreatePost.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(CreatePost)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
	}
}

// Connect together the Redux store with this React component
export default withRouter(
	connect(mapReduxToProps, {
    savePostsToRedux,
	})(RadiumHOC)
)

// ===============================

// the JS function that returns Radium JS styling
const comStyles = () => {
	return {
		postsContainer: {
			borderRadius: '25px',
			backgroundColor: 'ADD8E6',
			marginBottom:'3%',
			marginRight: '8%',
			marginLeft: '8%',
      textAlign: 'center',
		},
	}
}
