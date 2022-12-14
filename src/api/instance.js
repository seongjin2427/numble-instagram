import axios from 'axios'

const instance = axios.create({
  url: process.env.REACT_APP_API,
})

export default instance
