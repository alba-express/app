import React from 'react'
import styles from './SlaveInfoPageCommuteHistoryList.module.scss';

const SlaveInfoPageCommuteHistoryList = ({ scheduleLogList }) => {

  // 선택된 직원 한 명이 없을경우 사용할 대체데이터
  const defaultOneSlave = {
    slaveName: '알바니',
    slavePosition: '직원',
    slavePhoneNumber: '000-0000-0000',
    slaveBirthday: '0000-01-01',
    slaveCreatedAt: '0000-01-01',
    wageList: [{ slaveWageType: "급여타입미정", slaveWageAmount: "급여금액미정" }],
    scheduleList: [{scheduleDay: "요일없음", scheduleStart: "00:00", scheduleEnd: "00:00"}],
    scheduleLogList: ["근태정보없음"]
  };

  const getOneSlave = () => {
    // 해당 사업장의 직원 중 선택한 직원 한 명의 정보를 가져오기위해 로컬스토리지에서 oneSlave 데이터 가져오기
    const oneSlave = localStorage.getItem('oneSlave');

    // oneSlave가 존재하지 않을 경우 대체데이터 사용하기
    if (!oneSlave) {
        return oneSlave = defaultOneSlave;
    } 

    // oneSlave가 있으면 oneSlave 사용하기
    try {
        return JSON.parse(oneSlave);
    } catch (e) {
        console.error("로컬스토리지의 oneSlave 에러", e);
        return defaultOneSlave;
    }
  };

  // oneSlave 정의하기
  const oneSlave = getOneSlave();

  return (
    <>
    {oneSlave.scheduleLogList.map((log, index) => (
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