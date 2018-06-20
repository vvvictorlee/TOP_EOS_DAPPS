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
  Menu,
  Checkbox,
  message,

} from 'antd'
import moment from 'moment'
import { savePostsToRedux } from '../../actions/posts/posts_actions'
import { sendPostToDB, getPostsFromDB } from '../../api/posts/posts_api.js'
import { sc2api } from '../../api/steemconnect/steem_api'
import validator from 'validator'
const shortid = require('shortid')
const FormItem = Form.Item
const { TextArea } = Input


class CreatePost extends Component {

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
        checkbox: false,
		}
	}

  editUrl() {
    console.log('editUrl')
    let goodurl = this.state.url
    if ( !goodurl.includes('https://') && !goodurl.includes('http://')){
      console.log('newrl')
      goodurl = 'https://' + goodurl
    }
    if (validator.isURL(goodurl)){
      return goodurl
    }
    else {
      message.warning('Bad URL input')
    }
  }

  submitPost(){
    const val = this.editUrl()

    if ( val && this.state.topPick !== '' && this.state.state !== 'Current State' && this.state.releaseDate !== '' && this.state.description !== '' && this.state.state !== 'State if DApp' && this.state.url !== '' && this.state.summary !== '') {
      this.setState({pressed: true})

      if (this.state.checkbox) {
        const permLink = shortid.generate().toLowerCase()
        console.log(permLink)
        sc2api.comment('', 'topeosdapps', this.props.loggedUser, permLink, this.state.topPick, this.state.description, { tags: ['eos', 'top', 'dapp'], app: 'topeosdapps' },
          function (err, res) {
            if (err){
              console.log(err.error_description)
              message.error('Steemit blockchain only allows a new post every 5 minutes')
            }
            else {
              console.log(res)
            }
          }
        )
      }
      sendPostToDB({
        user_id: this.props.login,
        title: this.state.topPick,
        project_release: this.state.releaseDate,
        description: this.state.description,
        summary: this.state.summary,
        state: this.state.state,
        url: val,
        steemlink: this.state.checkbox,
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
      setTimeout(() => { this.setState({pressed: false}) }, 2000)
      message.loading('Action in progress..', 1.5)
        .then(() => message.success('Loading finished', 1.5))

    }
    else {
      if (val) {
        message.warning('Missing inputs')
      }
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
      <div id='CreatePost' style={comStyles().postsContainer}>
  			<h2 id='CreatePostTitle' style={comStyles().title}><br/>CREATE POST<br/></h2>
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
						<FormItem >
                <div style={{display: 'flex', justifyContent: 'space-around'}}>
                  <Dropdown overlay={menu} placement="bottomLeft">
                    <Button icon='down' >{this.state.state}</Button>
                  </Dropdown>
  		            <DatePicker placeholder="Release(d) Date" onChange={(e) => this.setState({ releaseDate: moment(e).format()})}/>
                </div>
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
            <FormItem>
              <Checkbox onChange={() => this.setState({checkbox: !this.state.checkbox})} defaultChecked={false} >Generate post onto the Steem blockchain</Checkbox>
            </FormItem>
						<Button icon={this.state.pressed ? 'loading' : 'down'} disabled={this.state.pressed ? true : false} type={this.state.pressed ? 'default' : 'primary'} onClick={() => this.submitPost()}>Submit</Button>
					</div>

				</Form>
			</div>
		)
	}
}

// defines the types of variables in this.props
CreatePost.propTypes = {
	history: PropTypes.object.isRequired,
  savePostsToRedux: PropTypes.func.isRequired,
  loggedUser: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
}

// for all optional props, define a default value
CreatePost.defaultProps = {

}

// Wrap the prop in Radium to allow JS styling
const RadiumHOC = Radium(CreatePost)

// Get access to state from the Redux store
const mapReduxToProps = (redux) => {
	return {
    login: redux.login.loggedIn,
    loggedUser: redux.login.loggedUser,
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
			marginRight: '25%',
			marginLeft: '25%',
      textAlign: 'center',
		},
    title: {
      color: 'white,'
    }
	}
}
