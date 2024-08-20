import React from 'react'
import styles from './SlaveInfoPageCommuteHistoryList.module.scss';

const SlaveInfoPageCommuteHistoryList = ({ scheduleLogList }) => {

  return (
    <>
      <div className={`${styles['link-text']} ${styles['slaveManagementList-OneSlave']}`}>
        <div className={styles['slaveManagementList-OneSlaveName']} >
          {scheduleLogList.scheduleLogStart}
        </div>
        <div className={styles['slaveManagementList-OneSlaveWage']}>
          <div className={styles['slaveManagementList-OneSlaveMoneyType']} >
            {scheduleLogList.scheduleLogStart}
          </div>
        </div>
        <div className={styles['slaveManagementList-OneSlaveScheduleList']} >
            <div className={styles['slaveManagementList-OneSlaveScheduleOne']} >
              {scheduleLogList.scheduleLogEnd}
            </div>
        </div>
        <div className={styles['slaveManagementList-OneSlaveJoin']} >
          정상출근
        </div>
      </div>
    </>
  )
}

export default SlaveInfoPageCommuteHistoryList