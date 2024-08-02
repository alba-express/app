import React from 'react'
import styles from './SlaveManagePageInActiveSlaveList.module.scss'

const SlaveManagePageInactiveSlaveList = () => {
  return (
    <>
      <div className={styles['slaveManagementList-title']}>
        <div className={styles['slaveManagementList-titleNumber']}>퇴사직원번호</div>
        <div className={styles['slaveManagementList-titleName']}>퇴사이름 & 직책</div>
        <div className={styles['slaveManagementList-titleJoin']}>입사일</div>
        <div className={styles['slaveManagementList-titleTime']}>퇴사일</div>
      </div>
      <div className={styles['slaveManagementList-content']}>
        <div className={styles['slaveManagementList-box']}>
          <div className={styles['slaveManagementList-OneSlave']}>
            <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
            <div className={styles['slaveManagementList-OneSlaveName']}>사탕매니저</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2015.12.24</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
          </div>
          <div className={styles['slaveManagementList-OneSlave']}>
            <div className={styles['slaveManagementList-OneSlaveNumber']}>10041810</div>
            <div className={styles['slaveManagementList-OneSlaveName']}>폼폼푸린직원</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2000.06.15</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2023.02.18</div>
          </div>
          <div className={styles['slaveManagementList-OneSlave']}>
            <div className={styles['slaveManagementList-OneSlaveNumber']}>10042118</div>
            <div className={styles['slaveManagementList-OneSlaveName']}>쿠로미점장</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2023.01.24</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.06.2</div>
          </div>
          
          
        </div>
      </div>
    </>
  )
}

export default SlaveManagePageInactiveSlaveList