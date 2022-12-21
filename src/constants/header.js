const HEADER_MENU_LIST = [
  {
    icon: 'HomeIcon',
    url: '/',
    black: true,
    clickHandler(fn) {
      console.log('/')
    },
  },
  {
    icon: 'SendIcon',
    url: '/chat',
    black: false,
    clickHandler(fn) {
      console.log('/')
    },
  },
  {
    icon: 'AddIcon',
    url: undefined,
    black: false,
    clickHandler(fn) {
      fn(true)
    },
  },
  {
    icon: 'HeartIcon',
    url: undefined,
    black: false,
    clickHandler(fn) {
      console.log('/')
    },
  },
]

const HEADER_MODAL_LIST = [
  {
    icon: 'UserIcon',
    url: '/my-page',
    title: '프로필',
    clickHandler(fn) {
      console.log('/')
    },
  },
  {
    icon: 'BookmarkIcon',
    url: '/',
    title: '저장됨',
    clickHandler(fn) {
      console.log('/')
    },
  },
  {
    icon: 'SettingsIcon',
    url: '/',
    title: '설정',
    clickHandler(fn) {
      console.log('/')
    },
  },
  {
    icon: 'AlertCircleIcon',
    url: '/',
    title: '문제 신고',
    clickHandler(fn) {
      console.log('/')
    },
  },
  {
    icon: 'SettingsIcon',
    url: '/login',
    title: '로그아웃',
    clickHandler(fn) {
      localStorage.removeItem('jwt')
      localStorage.removeItem('loginId')
      fn()
    },
  },
]

export {HEADER_MENU_LIST, HEADER_MODAL_LIST}
