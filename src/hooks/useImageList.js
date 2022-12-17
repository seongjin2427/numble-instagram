import React, {useState} from 'react'

const useImageList = () => {
  const [imageList, setImageList] = useState([])

  const handleFiles = files => {
    console.log('files', files)
    if (!files.length) {
      setImageList([])
      return
    }
    let fileList = []

    if (files.length > 10) {
      alert(`10개 이상의 파일을 업로드 할 수 없습니다.\n업로드 된 이미지 개수 : ${files.length}개 (최대 10개)`)
      return
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      console.log(i, file.type)

      if (!file.type.match('image/.*')) {
        alert(`이미지 포맷을 확인해주세요.업로드 된 파일 이름 ${file.name}`)
        return
      }

      fileList = [...fileList, file]
    }

    if (fileList.length > 0) {
      setImageList(fileList)
    }
  }

  return [imageList, handleFiles]
}

export default useImageList
