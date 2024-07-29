import React from 'react'
import NoticeDetail from './NoticeDetail'
import RegisterNotice from './RegisterNotice'

const NoticeList = () => {
  // 1. 사업장의 모든 공지사항 보여주기

  // 2. 공지사항 한 개 클릭하면 공지사항상세조회페이지 이동하기

  // 3. 공지사항 등록하기

  return (
    <>
      <p>------------------------------------------- 공지사항리스트페이지</p>
      <RegisterNotice />
      <NoticeDetail />
    </>
  )
}

export default NoticeList