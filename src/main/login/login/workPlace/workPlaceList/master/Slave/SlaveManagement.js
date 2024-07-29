import React from 'react'
import SlaveDetail from './SlaveDetail'
import RegisterSlave from './registstSlave/RegisterSlave'

const SlaveManagement = () => {
  // 1. 사업장의 모든 직원 보여주기

  // 2. 직원 한 명 클릭하면 해당 직원 상세조회 페이지로 이동하기

  // 3. 직원등록 페이지로 이동하기

  return (
    <>
      <p>------------------------------------------- 직원리스트페이지</p>
      <SlaveDetail />
      <RegisterSlave />
    </>
  )
}

export default SlaveManagement