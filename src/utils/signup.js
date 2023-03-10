/**
 *
 * @param {number} y: 선택 년도
 * @param {number} m: 선택 월
 * @returns 선택 년도 및 월의 전체 일 배열
 */
const makeDate = (y = 2022, m = 12) => {
  let year = isNaN(+y) ? 2022 : y
  let month = isNaN(+m) ? 12 : m
  const date = new Date(+year, +month, 1, 0, 0, 0, 0) - 1

  const endDay = new Date(date).getDate()
  const result = []

  for (let i = 1; i <= endDay; i++) {
    result.push(i + '')
  }

  return result
}

/**
 *
 * @param {number} start: 시작 숫자
 * @param {number} end: 끝 수자
 * @param {boolean} reverse: 반대 순서로 변경
 * @returns 시작부터 끝까지의 숫자배열
 */
const makeYearMonth = (start, end, reverse) => {
  const result = []

  if (reverse) {
    for (let i = end; i >= start; i--) {
      result.push(i + '')
    }
  } else {
    for (let i = start; i <= end; i++) {
      result.push(i + '')
    }
  }

  return result
}

export {makeDate, makeYearMonth}
