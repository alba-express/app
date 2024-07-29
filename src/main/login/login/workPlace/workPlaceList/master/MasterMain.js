import React from 'react'
import SlaveManagement from './Slave/SlaveManagement';
import WageManagement from './Wage/WageManagement'
import ScheduleManagement from './schedule/ScheduleManagement'
import NoticeList from './notice/NoticeList'
import CommutePage from './commute/CommutePage'

const MasterMain = () => {
  // 1. 직원리스트 페이지로 이동하기

  // 2. 급여관리 페이지로 이동하기

  // 3. 일정관리 페이지로 이동하기

  // 4. 공지사항리스트 페이지로 이동하기

  // 5. 출퇴근로그인 페이지로 이동하기

  return (
    <>
      <p>--------------------------------- 사장메인페이지</p>
      <SlaveManagement />
      <WageManagement />
      <ScheduleManagement />
      <NoticeList />
      <CommutePage />
    </>
  )
}

export default MasterMain