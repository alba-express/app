import React from "react";
import styles from './SlaveManagePageSlaveList.module.scss';
import SlaveManagePageActiveSlaveList from "./SlaveManagePageSlaveStatusList";

const SlaveManagePageSlaveList = () => {
  return (
    <>
      <div className={styles['slaveManagementList-title']}>
        {/* <div className={styles['slaveManagementList-titleNumber']}>직원번호</div> */}
        <div className={styles['slaveManagementList-titleName']}>이름 & 직책</div>
        <div className={styles['slaveManagementList-titleWage']}>급여정보</div>
        <div className={styles['slaveManagementList-titleSchedule']}>근무시간</div>
        <div className={styles['slaveManagementList-titleJoin']}>입사일</div>
      </div>

      <div className={styles['slaveManagementList-content']}>
        <div className={styles['slaveManagementList-box']}>

          <SlaveManagePageActiveSlaveList />

        </div>
      </div>
    </>
  )
}

export default SlaveManagePageSlaveList