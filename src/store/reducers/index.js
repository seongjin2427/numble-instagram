import {combineReducers} from 'redux'
import HomeReducer from './home'
import LoginReducer from './login'
import SignUpReducer from './signup'
import FeedReducer from './feed'

const RootReducer = combineReducers({
  HomeReducer,
  LoginReducer,
  SignUpReducer,
  FeedReducer,
})

export default RootReducer
