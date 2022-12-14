import React from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'

const HomePage = () => {
  // Redux 값 불러오기
  const {user} = useSelector(state => state.LoginReducer)

  return <Home></Home>
}

const Home = styled.div`
  width: 100%
  display: flex;
  flex-direction: column;
  /* background-color: blue; */
  padding: 1rem;
`

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  background-color: green;
  margin-left: 5rem;
  margin-right: 5rem;
`

export default HomePage
