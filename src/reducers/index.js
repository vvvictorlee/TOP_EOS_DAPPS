import { combineReducers } from 'redux'
import appReducer from './app/app_reducer'
import votesReducer from './votes/votes_reducer'
import postsReducer from './posts/posts_reducer'
import usersReducer from './users/users_reducer'
import loginReducer from './users/login_reducer'
// takes all your seperate reducers into one giant reducer
// each Redux action will flow through each middleware and then reach the reducers
// then it will go through each reducer
const rootReducer = combineReducers({
	app: appReducer,
	votes: votesReducer,
	posts: postsReducer,
	users: usersReducer,
	login: loginReducer,
})

export default rootReducer
