import React from 'react'
import SignUp from '../signUp/SignUp'
import FindPassword from '../password/FindPassword'
import WorkPlaceList from './workPlace/workPlaceList/WorkPlaceList'

const Login = () => {
  // 1. 아이디 비밀번호 입력 후 로그인하기
  // 1-1. 아이디저장, 자동로그인
  // 1-2. 사업장리스트 페이지로 이동하기

  // 2. 회원가입 페이지 이동
  // 3. 비밀번호찾기 페이지 이동

  return (
    <>
      <p>---------- 로그인페이지</p>
      <SignUp />
      <FindPassword />

      <WorkPlaceList />
    </>
    
  )
}

export default Login