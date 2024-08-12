import React, { useEffect, useState } from 'react'
import styles from './SlaveManagePageActiveSlaveList.module.scss'
import { sl } from 'date-fns/locale';

const SlaveManagePageActiveSlaveList = () => {

  // 근무중인 모든 직원 리스트 상태값으로 관리
  const [activeSlaveList, setActiveSlaveList] = useState([]);

  // 에러 상태값으로 관리
  const [error, setError] = useState(null);

  useEffect(() => {

    fetch('http://localhost:8877/detail/activeSlaveList')
      .then(response => {
        // Content-Type이 JSON인지 확인
        const contentType = response.headers.get('content-type');
        if (!response.ok || !contentType || !contentType.includes('application/json')) {
          throw new Error('Unexpected response: ' + response.statusText);
        }
        return response.json();
      })
      .then(slaveList => {
        setActiveSlaveList(slaveList);
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
        <div className={styles['slaveManagementList-titleNumber']}>직원번호</div>
        <div className={styles['slaveManagementList-titleName']}>이름 & 직책</div>
        <div className={styles['slaveManagementList-titleTime']}>근무시간</div>
        <div className={styles['slaveManagementList-titleMoney']}>시급</div>
        <div className={styles['slaveManagementList-titleJoin']}>입사일</div>
      </div>

      <div className={styles['slaveManagementList-content']}>
        <div className={styles['slaveManagementList-box']}>
          
          {activeSlaveList.map((activeSlave) => 
            (
              <li key={activeSlave.slaveId} className={styles['slaveManagementList-OneSlave']} >

                <div className={styles['slaveManagementList-OneSlaveNumber']} >
                  {activeSlave.slaveId}
                </div>

                <div className={styles['slaveManagementList-OneSlaveName']} >
                  {activeSlave.slaveName}
                  {activeSlave.slavePosition}
                </div>

                {activeSlave.slaveWageList.map((wage) => 
                  <li key={wage.slaveWageId} className={styles['slaveManagementList-OneSlaveTime']} >
                    {wage.slaveWageType}
                    {wage.slaveWageAmount}
                    {wage.slaveWageInsurance}
                  </li>
                )}

                {activeSlave.slaveScheduleList.map((schedule) => 
                  <li key={schedule.slaveScheduleId} className={styles['slaveManagementList-OneSlaveMoney']} >
                    {schedule.scheduleDay}
                    {schedule.startSchedule}
                    {schedule.endSchedule}
                  </li>
                )}

                <div className={styles['slaveManagementList-OneSlaveJoin']} >
                  {activeSlave.slaveCreatedAt}
                </div>

              </li>
            )
          )}

        </div>
      </div>
    </>
  )
}

export default SlaveManagePageActiveSlaveList