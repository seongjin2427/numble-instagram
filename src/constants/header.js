const HEADER_MENU_LIST = [
  {
    icon: 'HomeIcon',
    url: process.env.REACT_APP_ORIGIN,
    black: true,
    clickHandler(fn) {
      console.log(process.env.REACT_APP_ORIGIN)
    },
  },
  {
    icon: 'SendIcon',
    url: `${process.env.REACT_APP_ORIGIN}/chat`,
    black: false,
    clickHandler(fn) {
      console.log(process.env.REACT_APP_ORIGIN)
    },
  },
  {
    icon: 'AddIcon',
    url: process.env.REACT_APP_ORIGIN,
    black: false,
    clickHandler(fn) {
      fn(true)
    },
  },
  {
    icon: 'HeartIcon',
    url: process.env.REACT_APP_ORIGIN,
    black: false,
    clickHandler(fn) {
      console.log(process.env.REACT_APP_ORIGIN)
    },
  },
]

const HEADER_MODAL_LIST = [
  {
    icon: 'UserIcon',
    url: `${process.env.REACT_APP_ORIGIN}/my-page`,
    title: '프로필',
    clickHandler(fn) {
      console.log(process.env.REACT_APP_ORIGIN)
    },
  },
  {
    icon: 'BookmarkIcon',
    url: process.env.REACT_APP_ORIGIN,
    title: '저장됨',
    clickHandler(fn) {
      console.log('/')
    },
  },
  {
    icon: 'SettingsIcon',
    url: process.env.REACT_APP_ORIGIN,
    title: '설정',
    clickHandler(fn) {
      console.log('/')
    },
  },
  {
    icon: 'AlertCircleIcon',
    url: process.env.REACT_APP_ORIGIN,
    title: '문제 신고',
    clickHandler(fn) {
      console.log('/')
    },
  },
  {
    icon: 'SettingsIcon',
    url: `${process.env.REACT_APP_ORIGIN}/login`,
    title: '로그아웃',
    clickHandler(fn) {
      localStorage.removeItem('jwt')
      localStorage.removeItem('loginId')
      fn()
    },
  },
]

export {HEADER_MENU_LIST, HEADER_MODAL_LIST}
