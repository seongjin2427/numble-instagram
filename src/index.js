import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import {ThemeProvider} from 'styled-components'
import {composeWithDevTools} from 'redux-devtools-extension' // 리덕스 개발자 도구

import App from './App'
import theme from './style/theme'
import RootReducer from './store/reducers'
import {GlobalStyle} from './style/styled'
import 'react-app-polyfill/stable'

const store = createStore(RootReducer, composeWithDevTools())

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
)
