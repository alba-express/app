import React from 'react'
import RegisterWorkPlace from './RegisterWorkPlace'
import UpdateWorkPlace from './UpdateWorkPlace'
import DeleteWorkPlace from './DeleteWorkPlace'
import MasterMain from './master/MasterMain'

const WorkPlaceList = () => {
  return (
    <>
      <div>
        <h1>사업장리스트페이지</h1>
        <MasterMain />

      </div>

      <RegisterWorkPlace />
      <UpdateWorkPlace />
      <DeleteWorkPlace />
    </>
  )
}

export default WorkPlaceList