import React from 'react'
import NoticeDetail from './NoticeDetail'
import RegisterNotice from './RegisterNotice'
import UpdateNotice from './UpdateNotice'
import DeleteNotice from './DeleteNotice'

const NoticeList = () => {
  return (
    <>
      <div>
        <h1>공지사항리스트페이지</h1>
        <NoticeDetail />
      </div>

      <RegisterNotice />
      <UpdateNotice />
      <DeleteNotice />
    </>
  )
}

export default NoticeList