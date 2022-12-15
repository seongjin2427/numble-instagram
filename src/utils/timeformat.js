import dayjs from 'dayjs'

const convertRelativeTimeFormat = time => {
  const formatter = new Intl.RelativeTimeFormat('ko', {numeric: 'always'})
  const now = new Date()

  const diff = t => dayjs(time).diff(now, t)
  const formatted = (v, t) => formatter.format(v, t)

  const years = diff('years')
  const months = diff('months')
  const days = diff('days')
  const hours = diff('hours')
  const minutes = diff('minutes')
  const seconds = diff('seconds')

  if (months < 0 && months !== 1) return dayjs(time).format('M월 DD일')
  if (days < 0 && days !== 1) return formatted(days, 'days')
  if (hours < 0 && hours !== 1) return formatted(hours, 'hours')
  if (minutes < 0 && minutes !== 1) return formatted(minutes, 'minutes')
  if (seconds < 0 && seconds !== 1) return formatted(seconds, 'seconds')
}

export {convertRelativeTimeFormat}
