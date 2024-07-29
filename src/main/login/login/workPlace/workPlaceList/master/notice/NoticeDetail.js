import React from 'react'
import UpdateNotice from './UpdateNotice'
import DeleteNotice from './DeleteNotice'

const NoticeDetail = () => {
  // 1. 공지사항 한 개의 내용 보여주기

  // 2. 공지사항 한 개 수정하기

  // 3. 공지사항 한 개 삭제하기
  return (
    <>
      <p>---------------------------------------------------------- 공지사항상세조회페이지</p>
      <UpdateNotice />
      <DeleteNotice />
    </>
  )
}

export default NoticeDetail