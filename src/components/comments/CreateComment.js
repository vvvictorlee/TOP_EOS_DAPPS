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
  Dropdown,
  Menu
} from 'antd'
import moment from 'moment'
import { savePostsToRedux } from '../../actions/posts/posts_actions'
import { sendPostToDB, getPostsFromDB } from '../../api/posts/posts_api.js'

const FormItem = Form.Item
const { TextArea } = Input



class CreateComment extends Component {

  constructor() {
		super()
		this.state = {
				topPick: '',
        releaseDate: '',
        description: '',
        pressed: false,
        state: 'Current State',
        url: '',
        summary: '',
		}
	}

  submitPost(){
    if (this.state.topPick !== '' && this.state.releaseDate !== '' && this.state.description !== '' && this.state.state !== 'State if DApp' && this.state.url !== '' && this.state.summary !== '') {
      this.setState({pressed: true})
      console.log(this.props.login)
      sendPostToDB({
        user_id: this.props.login,
        title: this.state.topPick,
        project_release: this.state.releaseDate,
        description: this.state.description,
        summary: this.state.summary,
        state: this.state.state,
        url: this.state.url,
      })
      .then((data) => {
        return getPostsFromDB()
      })
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
    else {
      alert('missing inputs bruh')
    }
  }

  menuClick(key) {
    if (key === '.$1'){
      this.setState({ state: 'LIVE'})
      console.log(this.state.state)
    }
    else if (key === '.$2'){
      this.setState({ state: 'BETA'})
      console.log(this.state.state)
    }
    else if (key === '.$3'){
      this.setState({ state: 'PROTOTYPE'})
      console.log(this.state.state)
    }
    else if (key === '.$4'){
      this.setState({ state: 'CONCEPT'})
      console.log(this.state.state)
    }
  }

	render() {
    const menu = (
      <Menu onClick={(e) => this.menuClick(e.key)}>
        <Menu.Item key='1'>
          <a  >LIVE</a>
        </Menu.Item>
        <Menu.Item key='2'>
          <a  >BETA</a>
        </Menu.Item>
        <Menu.Item key='3'>
          <a  >PROTOTYPE</a>
        </Menu.Item>
        <Menu.Item key='4'>
          <a >CONCEPT</a>
        </Menu.Item>
      </Menu>
    )
		return (
      <div id='CreateComment' style={comStyles().postsContainer}>
  			<h2 id='CreateCommentTitle'><br/>CREATE POST</h2>
        <Form onSubmit={() => this.submitPost()} >

					<div>
						<FormItem>
								<Input
  								prefix={<Icon type="star" style={{ color: 'rgba(0,0,0,.25)' }} />}
  								placeholder="Name of DApp"
  								value={this.state.topPick}
  								onChange={(e) => this.setState({ topPick: e.target.value })}
								/>
						</FormItem>
            <FormItem>
								<Input
  								prefix={<Icon type="pushpin-o" style={{ color: 'rgba(0,0,0,.25)' }} />}
  								placeholder="Brief summary of DApp"
  								value={this.state.summary}
  								onChange={(e) => this.setState({ summary: e.target.value })}
								/>
						</FormItem>
						<FormItem>
                <Dropdown overlay={menu} placement="bottomLeft">
                  <Button>{this.state.state}</Button>
                </Dropdown>
		            <DatePicker placeholder="Release(d) Date" onChange={(e) => this.setState({ releaseDate: moment(e).format()})}/>
		        </FormItem>
            <FormItem>
              <Input
                prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Website URL"
                value={this.state.url}
                onChange={(e) => this.setState({ url: e.target.value }, console.log(this.state.url))}
              />
		        </FormItem>
						<FormItem>
							<TextArea
                rows={4}
								prefix={<Icon type="form" style={{ color: 'rgba(0,0,0,.25)' }} />}
								placeholder="Detailed description"
								value={this.state.description}
								onChange={(e) => this.setState({ description: e.target.value }, console.log(this.state.description))}
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
CreateComment.propTypes = {
	history: PropTypes.object.isRequired,
  savePostsToRedux: PropTypes.func.isRequired,
  login: PropTypes.string.isRequired,
}

// for all optional props, define a default value
CreateComment.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(CreateComment)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    login: redux.login.loggedIn,
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
