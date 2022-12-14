const HEADER_MENU_LIST = [
  {
    icon: 'HomeIcon',
    url: '/',
    black: true,
  },
  {
    icon: 'SendIcon',
    url: '/',
    black: false,
  },
  {
    icon: 'AddIcon',
    url: '/',
    black: false,
  },
  {
    icon: 'HeartIcon',
    url: '/',
    black: false,
  },
  {
    icon: 'UserIcon',
    url: '/',
    black: false,
  },
]

const HEADER_MODAL_LIST = [
  {
    icon: 'UserIcon',
    url: '/',
    title: '프로필',
    onClick(fn) {
      console.log('/')
    },
  },
  {
    icon: 'BookmarkIcon',
    url: '/',
    title: '저장됨',
    onClick(fn) {
      console.log('/')
    },
  },
  {
    icon: 'SettingsIcon',
    url: '/',
    title: '설정',
    onClick(fn) {
      console.log('/')
    },
  },
  {
    icon: 'AlertCircleIcon',
    url: '/',
    title: '문제 신고',
    onClick(fn) {
      console.log('/')
    },
  },
  {
    icon: 'SettingsIcon',
    url: '/',
    title: '로그아웃',
    onClick(fn) {
      console.log('/')
    },
  },
]

export {HEADER_MENU_LIST, HEADER_MODAL_LIST}
