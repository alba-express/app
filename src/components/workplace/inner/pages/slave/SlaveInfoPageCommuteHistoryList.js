import React from 'react'
import styles from './SlaveInfoPageCommuteHistoryList.module.scss';

const SlaveInfoPageCommuteHistoryList = () => {

  //-------------------------------------------------

  return (
    <>
      <div className={`${styles['link-text']} ${styles['slaveManagementList-OneSlave']}`}>
        
        <div className={styles['slaveManagementList-OneSlaveName']} >
          2024-08-13
        </div>
      
        <div className={styles['slaveManagementList-OneSlaveWage']}>
          <div className={styles['slaveManagementList-OneSlaveMoneyType']} >
              08:55:00
          </div>
        </div>

        <div className={styles['slaveManagementList-OneSlaveScheduleList']} >
            <div className={styles['slaveManagementList-OneSlaveScheduleOne']} >
              18:03:29
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