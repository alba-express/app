import React from 'react'
import RegisterWorkPlace from './RegisterWorkPlace'
import UpdateWorkPlace from './UpdateWorkPlace'
import DeleteWorkPlace from './DeleteWorkPlace'
import MasterMain from './master/MasterMain'

const WorkPlaceList = () => {
  // 1. 회원의 모든 사업장 보여주기

  // 2. 사업장 등록하기

  // 3. 사업장 수정하기

  // 4. 사업장 삭제하기

  // 5. 사업장 하나 클릭하면 해당 사업장의 사장메인페이지로 이동하기

  return (
    <>
      <p>------------------ 사업장리스트페이지</p>
      <RegisterWorkPlace />
      <UpdateWorkPlace />
      <DeleteWorkPlace />

      <MasterMain />
    </>
  )
}

export default WorkPlaceList