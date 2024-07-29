import React from 'react'
import SlaveManagement from './Slave/SlaveManagement';
import WageManagement from './Wage/WageManagement'
import ScheduleManagement from './schedule/ScheduleManagement'
import NoticeList from './notice/NoticeList'
import CommutePage from './commute/CommutePage'

const MasterMain = () => {
  return (
    <>
      <div>
        <h1>사장메인페이지</h1>
      </div>

      <SlaveManagement />
      <WageManagement />
      <ScheduleManagement />
      <NoticeList />
      <CommutePage />
    </>
  )
}

export default MasterMain