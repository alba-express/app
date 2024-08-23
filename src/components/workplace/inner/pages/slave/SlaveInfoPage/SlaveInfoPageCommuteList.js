import React from "react";
import styles from './SlaveInfoPageCommuteList.module.scss';
import SlaveInfoPageCommuteHistoryList from "./SlaveInfoPageCommuteHistoryList";

const SlaveInfoPageCommuteList = ({ commuteList }) => {
  return (
    <>
      <div className={styles['slaveManagementList-title']}>
        <div className={styles['slaveManagementList-titleName']}>근무일</div>
        <div className={styles['slaveManagementList-titleWage']}>출근시간</div>
        <div className={styles['slaveManagementList-titleSchedule']}>퇴근시간</div>
        <div className={styles['slaveManagementList-titleJoin']}>출근정보</div>
      </div>

      <div className={styles['slaveManagementList-content']}>
        <div className={styles['slaveManagementList-box']}>

          <SlaveInfoPageCommuteHistoryList scheduleLogList={commuteList}/>

        </div>
      </div>
    </>
  )
}

export default SlaveInfoPageCommuteList