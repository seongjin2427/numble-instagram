import {useState} from 'react'

const useToggle = () => {
  const [toggle, setToggle] = useState(false)

  const onToggle = b => setToggle(b)

  return [toggle, onToggle]
}

export default useToggle
