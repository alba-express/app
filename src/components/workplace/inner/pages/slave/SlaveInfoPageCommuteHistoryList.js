import React from 'react'
import styles from './SlaveInfoPageCommuteHistoryList.module.scss';
import { useSelector } from 'react-redux';

const SlaveInfoPageCommuteHistoryList = () => {

  // redux store 에서 특정 직원 한 명의 정보를 표시하는 상태값 불러오기 (초기값: 특정 직원의 한 명의 정보를 넣을 빈 배열)
  const showOneSlaveInfo = useSelector((state) => state.slave.showOneSlaveInfo);

  //-------------------------------------------------

  return (
    <>
      {showOneSlaveInfo.scheduleLogList.map((log) => (
        <div className={`${styles['link-text']} ${styles['slaveManagementList-OneSlave']}`}>
          <div className={styles['slaveManagementList-OneSlaveName']} >
            {log.scheduleLogStart}
          </div>
          <div className={styles['slaveManagementList-OneSlaveWage']}>
            <div className={styles['slaveManagementList-OneSlaveMoneyType']} >
              {log.scheduleLogStart}
            </div>
          </div>
          <div className={styles['slaveManagementList-OneSlaveScheduleList']} >
              <div className={styles['slaveManagementList-OneSlaveScheduleOne']} >
                {log.scheduleLogEnd}
              </div>
          </div>
          <div className={styles['slaveManagementList-OneSlaveJoin']} >
            정상출근
          </div>
        </div>
      ))}
    </>
  )
}

export default SlaveInfoPageCommuteHistoryList