import React, {useState} from 'react'

const useImageList = () => {
  const [imageList, setImageList] = useState([])

  const handleFiles = imgs => {
    const files = Array.from(imgs)

    if (!files.length) {
      setImageList([])
      return false
    }

    const fileList = []
    const wrongFormat = []
    const overSize = []
    const maxFileSize = 5 * 1024 * 1024

    if (files.length > 10) {
      alert(`10개 이상의 파일을 업로드 할 수 없습니다.\n업로드 된 이미지 개수 : ${files.length}개 (최대 10개)`)
      return false
    }

    files.forEach(file => {
      if (!file.type.match('image/.*')) {
        wrongFormat.push(file)
      }
      if (file.size > maxFileSize) {
        overSize.push(file.size)
      }
      fileList.push(file)
    })

    if (wrongFormat.length > 0) {
      alert(`이미지 포맷을 확인해주세요.`)
      return false
    }

    if (overSize.length > 0) {
      alert(`이미지 크기는 5mb이상 될 수 없습니다.`)
      return false
    }

    if (fileList.length > 0) {
      setImageList(fileList)
      return true
    }
  }

  return [imageList, handleFiles]
}

export default useImageList
