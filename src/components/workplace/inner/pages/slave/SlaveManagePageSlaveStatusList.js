import React, { useEffect, useState } from 'react'
import styles from './SlaveManagePageSlaveStatusList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { slaveActions } from '../../../../../store/slave-slice';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SlaveManagePageActiveSlaveList = () => {

  // redux store 에서 상태값 변경하는 action hook 불러오기
  const dispatch = useDispatch();

  //-------------------------------------------------

  // redux store 에서 근무중인 직원 or 퇴사한 직원 리스트 표시하는 상태값 불러오기 (초기값: 근무중인 직원 리스트 표시)
  const showSlaveList = useSelector((state) => state.slave.showSlaveList);

  // redux store 에서 근무중인 직원의 정보를 표시하는 상태값 불러오기
  const showActiveSlaveInfo = useSelector((state) => state.slave.showActiveSlaveInfo);

  // redux store 에서 퇴사한 직원의 정보를 표시하는 상태값 불러오기
  const showInactiveSlaveInfo = useSelector((state) => state.slave.showInactiveSlaveInfo);

  //-------------------------------------------------

  // 에러 상태값으로 관리
  const [error, setError] = useState(null);

  // 직원 리스트 표시에 따라 서버에서 직원 정보 받아오기
  useEffect (() => {
    if (showSlaveList === true) { // 근무중인 직원정보 받아오기
      fetch('http://localhost:8877/detail/activeSlaveList')
        .then(response => {
          const contentType = response.headers.get('content-type');
          if (!response.ok || !contentType || !contentType.includes('application/json')) {
            throw new Error('Unexpected response: ' + response.statusText);
          }
          return response.json();
        })
        .then(slaveDto => {
          dispatch(slaveActions.setShowActiveSlaveInfo(slaveDto));
        })
        .catch(error => {
          setError(error.message);
        });

    } else if (showSlaveList === false) { // 퇴사한 직원정보 받아오기
      axios.get('http://localhost:8877/detail/inactiveSlaveList')
        .then(response => {
          dispatch(slaveActions.setShowInactiveSlaveInfo(response.data));
        })
        .catch(error => {
          setError(error.message);
        });
    }

    if (error) {
      return <div>Error: {error}</div>;
    }
  }, [showSlaveList]);

  //-------------------------------------------------

  // true 라면 근무중인 직원리스트를, false 라면 퇴사한 직원리스트를 렌더링하는 조건식을 변수에 담기
  const showWhichSlaveList = showSlaveList ? showActiveSlaveInfo : showInactiveSlaveInfo;

  //-------------------------------------------------

  // redux store 에서 특정 직원 한 명의 정보를 표시하는 상태값 불러오기 (초기값: 특정 직원의 한 명의 정보를 넣을 빈 배열)
  const showOneSlaveInfo = useSelector((state) => state.slave.showOneSlaveInfo);

  // 
  const navigate = useNavigate();

  //-------------------------------------------------

  // 특정 직원 한 명을 클릭했을 때 해당 직원의 상세정보페이지로 이동하기
  const selectOneSlaveHandler = async (selectSlaveId) => {

    // 해당 직원의 id
    // console.log('이 직원의 아이디', selectSlaveId);

    // 상세정보페이지로 이동, 해당 직원의 id를 상태로 전달하기
    navigate(`/detail/slave-info`, {state: {slaveId: selectSlaveId}});
  };

  return (
    <>
      {showWhichSlaveList.slaveList.map((oneSlave) => 
        (
          <div key={oneSlave.slaveId} onClick={() => selectOneSlaveHandler(oneSlave.slaveId)} className={`${styles['link-text']} ${styles['slaveManagementList-OneSlave']}`}>
            
            <div className={styles['slaveManagementList-OneSlaveName']} >
              {oneSlave.slaveName}
            </div>

            <div className={styles['slaveManagementList-OneSlavePosition']} >
              {oneSlave.slavePosition}
            </div>

            {oneSlave.slaveWageList.map((wage) => 
              <div key={wage.slaveWageId} className={styles['slaveManagementList-OneSlaveWage']}>
                <div className={styles['slaveManagementList-OneSlaveMoneyType']} >
                    급여타입 : {wage.slaveWageType}
                    금액: {wage.slaveWageAmount}
                </div>
                <div className={styles['slaveManagementList-OneSlaveInsurance']} >
                  4대보험 : {wage.slaveWageInsurance}
                </div>
              </div>
            )}

            <div className={styles['slaveManagementList-OneSlaveScheduleList']} >
              {oneSlave.slaveScheduleList.map((schedule) => 
                <div key={schedule.slaveScheduleId} className={styles['slaveManagementList-OneSlaveScheduleOne']} >
                  {schedule.scheduleDay}
                  {schedule.scheduleStart} 부터
                  {schedule.scheduleEnd} 까지
                </div>
              )}
            </div>

            <div className={styles['slaveManagementList-OneSlaveJoin']} >
              {oneSlave.slaveCreatedAt}
            </div>
          </div>
        )
      )}
    </>
  )
}

export default SlaveManagePageActiveSlaveList