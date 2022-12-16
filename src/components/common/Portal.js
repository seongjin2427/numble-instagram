/* eslint-disable react/prop-types */
import {useRef} from 'react'
import reactDom from 'react-dom'

const Portal = ({children}) => {
  const el = useRef(document.body)
  return reactDom.createPortal(children, el.current)
}

export default Portal
