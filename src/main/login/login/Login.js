import React from 'react'
import FindPassword from '../password/FindPassword'
import SignUp from '../signUp/SignUp'
import WorkPlaceList from './workPlace/workPlaceList/WorkPlaceList'

const Login = () => {
  return (
    <>
      <div>
        <h1>로그인페이지</h1>
        <WorkPlaceList />
      </div>
      
      <FindPassword />
      <SignUp />

    </>
    
  )
}

export default Login