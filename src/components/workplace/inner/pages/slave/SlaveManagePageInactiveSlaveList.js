import React, { useEffect, useState } from 'react'
import styles from './SlaveManagePageInActiveSlaveList.module.scss'
import axios from 'axios';

const SlaveManagePageInactiveSlaveList = () => {

  // 퇴사한 모든 직원 리스트 상태값으로 관리
  const [inactiveSlaveList, setInactiveSlaveList] = useState([]);

  // 에러 상태값으로 관리
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:8877/detail/inactiveSlaveList')
      .then(response => {
        setInactiveSlaveList(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  //-------------------------------------------------

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

          {inactiveSlaveList.map((inactiveSlave) => 
            (
              <li key={inactiveSlave.slaveId} className={styles['slaveManagementList-OneSlave']} >
                <div className={styles['slaveManagementList-OneSlaveNumber']} >
                  {inactiveSlave.slaveId}
                </div>

                <div className={styles['slaveManagementList-OneSlaveName']} >
                  {inactiveSlave.slaveName}
                  {inactiveSlave.slavePosition}
                </div>

                <div className={styles['slaveManagementList-OneSlaveJoin']} >
                  {inactiveSlave.slaveCreatedAt}
                </div>

                <div className={styles['slaveManagementList-OneSlaveJoin']} >
                  {inactiveSlave.slaveFiredDate}
                </div>
              </li>
            )
          )}
        
        </div>
      </div>
    </>
  )
}

export default SlaveManagePageInactiveSlaveList