import React, { useEffect, useState } from 'react'
import styles from './SlaveManagePageSlaveStatusList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { slaveActions } from '../../../../../store/slave-slice';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const SlaveManagePageSlaveStatusList = () => {

  // redux store 에서 에러의 정보를 표시하는 상태값 불러오기
  const showError = useSelector((state) => state.showError);

  // redux store 에서 근무중인 직원 or 퇴사한 직원 리스트 표시하는 상태값 불러오기 (초기값: 근무중인 직원 리스트 표시)
  const showSlaveList = useSelector((state) => state.slave.showSlaveList);

  // redux store 에서 전체 직원의 정보를 표시하는 상태값 불러오기
  const showAllSlaveInfo = useSelector((state) => state.slave.showAllSlaveInfo);

  // redux store 에서 근무중인 직원의 정보를 표시하는 상태값 불러오기
  const showActiveSlaveInfo = useSelector((state) => state.slave.showActiveSlaveInfo);

  // redux store 에서 퇴사한 직원의 정보를 표시하는 상태값 불러오기
  const showInactiveSlaveInfo = useSelector((state) => state.slave.showInactiveSlaveInfo);

  // redux store 에서 선택한 직원 한 명의 정보를 표시하는 상태값 불러오기
  const showOneSlaveInfo = useSelector((state) => state.slave.showInactiveSlaveInfo);

  //-------------------------------------------------

  // redux store 에서 상태값 변경하는 action hook 불러오기
  const dispatch = useDispatch();

  // 에러 상태값으로 관리
  const [error, setError] = useState(null);

  //-------------------------------------------------

  // 해당 사업장의 모든 직원 목록을 불러오기 위해 로컬스토리지에 저장된 사업장을 변수로 생성
  const workplaceIdByStore = localStorage.getItem('workplaceId');

  // 해당 사업장을 서버로 전송해 해당 사업장의 직원정보만 불러오기 &
  // 직원 리스트 표시에 따라 서버에서 직원 정보 받아오기
  useEffect (() => {
    if (showSlaveList === true) {
      fetch(`http://localhost:8877/detail/slaveList/${workplaceIdByStore}`)
        .then(response => {
          const contentType = response.headers.get('content-type');
          if (!response.ok || !contentType || !contentType.includes('application/json')) {
            throw new Error('Unexpected response: ' + response.statusText);
          }
          return response.json();
        })
        .then(slaveDto => {
          // console.log('전체직원', slaveDto);
          
          dispatch(slaveActions.setAllSlaveInfo(slaveDto));
          localStorage.setItem('allSlaveList', showAllSlaveInfo); // 전체 직원 정보 목록 로컬스토리지에 저장
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

  // 퇴사일이 없는 직원은 근무중인 직원, 퇴사일이 있는 직원은 퇴사한 직원
  useEffect (() => {
    const activeSlaves = showAllSlaveInfo.filter(slave => slave.slaveFiredDate === null);
    const inactiveSlaves = showAllSlaveInfo.filter(slave => slave.slaveFiredDate !== null);

    dispatch(slaveActions.setShowActiveSlaveInfo({
        slaveList: activeSlaves,
        totalSlaveCount: activeSlaves.length
    }));

    localStorage.setItem('activeSlaveList', showActiveSlaveInfo); // 직원 목록 중 근무중인 직원 정보 목록 로컬스토리지에 저장

    dispatch(slaveActions.setShowInactiveSlaveInfo({
        slaveList: inactiveSlaves,
        totalSlaveCount: inactiveSlaves.length
    }));

    localStorage.setItem('inactiveSlaveList', showInactiveSlaveInfo);  // 직원 목록 중 퇴사한 직원 정보 목록 로컬스토리지에 저장

  }, [showAllSlaveInfo, dispatch]);

  // true 라면 근무중인 직원리스트를, false 라면 퇴사한 직원리스트를 렌더링하는 조건식을 변수에 담기
  const showWhichSlaveList = showSlaveList ? showActiveSlaveInfo : showInactiveSlaveInfo;

  //-------------------------------------------------

  const navigate = useNavigate();

  //-------------------------------------------------

  // 특정 직원 한 명을 클릭했을 때 해당 직원의 상세정보페이지로 이동하기
  const selectOneSlaveHandler = async (slaveId) => {
    try {
      const response = await axios.get(`http://localhost:8877/detail/slave-info/${slaveId}`);

      const clickOneSlave = response.data;
      // 해당 직원의 정보를 redux 특정 직원 한 명의 정보 표시 에 저장하기
      dispatch(slaveActions.setShowOneSlaveInfo(clickOneSlave));
      // 해당 직원의 정보를 로컬스토리지에 저장하기
      localStorage.setItem('oneSlave', JSON.stringify(clickOneSlave)); 
    
      // 해당 직원 상세페이지로 이동하기
      navigate(`/detail/slave-info`);

    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    }

  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <>
      {showWhichSlaveList.slaveList.length === 0 ? 
      ( <div className={`${styles['link-text']} ${styles['slaveManagementList-nonSlave']}`}> 직원정보없음 </div> ) 
      :
      (showWhichSlaveList.slaveList.map((oneSlave) => 
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
      ))
      }
    </>
  )
}

export default SlaveManagePageSlaveStatusList