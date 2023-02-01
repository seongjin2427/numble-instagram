// icon 컴포넌트명에 대해 위험할 수 있음
// 오타 등의 에러가 나면 원인을 확인하기 어려움
// -> jsx 아이콘 컴포넌트로 아예 추가를 하는게 더 좋음
const SIGN_UP_INPUTS = [
  {
    id: 'phoneNumber',
    type: 'text',
    icon: 'MailIcon',
    placeholder: '전화번호,사용자 이름 또는 이메일',
  },
  {
    id: 'realName',
    type: 'text',
    icon: 'UserIcon',
    placeholder: '성명',
  },
  {
    id: 'loginId',
    type: 'text',
    icon: 'SettingsIcon',
    placeholder: '사용자 이름',
  },
  {
    id: 'password',
    type: 'password',
    icon: 'LockIcon',
    placeholder: '비밀번호',
  },
]

export {SIGN_UP_INPUTS}
