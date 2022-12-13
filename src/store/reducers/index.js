import {combineReducers} from 'redux'
import HomeReducer from './home'
import LoginReducer from './login'
import SignUpReducer from './signup'

const RootReducer = combineReducers({
  HomeReducer,
  LoginReducer,
  SignUpReducer,
})

export default RootReducer
