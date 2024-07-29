import React from 'react'
import SlaveDetail from './SlaveDetail'
import RegisterSlave from './registstSlave/RegisterSlave'
import UpdateSlave from './UpdateSlave'
import DeleteSlave from './DeleteSlave'

const SlaveManagement = () => {
  return (
    <>
      <div>
        <h1>직원리스트페이지</h1>
        <SlaveDetail />
      </div>

      <RegisterSlave />
      <UpdateSlave />
      <DeleteSlave />
    </>
  )
}

export default SlaveManagement