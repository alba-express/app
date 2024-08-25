import React, { useEffect, useState } from 'react'
import styles from './SlaveManagePageSlaveStatusList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { slaveActions } from '../../../../../../store/slave-slice';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {BASE_URL} from "../../../../../../config/host-config";

const SlaveManagePageSlaveStatusList = () => {

  // redux store 에서 상태값 변경하는 action hook 불러오기
  const dispatch = useDispatch();

  // 페이지 이동시 사용할 useNavigate hook 불러오기
  const navigate = useNavigate();

  //------------------------------------------------- 

  // 에러 상태값으로 관리
  const [error, setError] = useState(null);

  // redux store 에서 보여줄 직원의 종류를 선택하는 상태값 불러오기 (초기값: 전체 직원 리스트)
  const showWhichSlave = useSelector((state) => state.slave.showWhichSlave);

  // redux store 에서 보여줄 가공 후 직원 목록과 총 직원 수를 보여주는 상태값 불러오기 (초기값: 전체 직원 리스트 & 총 직원 수)
  const showUpdatedSlaveListInfo = useSelector((state) => state.slave.showUpdatedSlaveListInfo);


  // redux store 에서 선택한 직원 한 명의 정보를 표시하는 상태값 불러오기
  const showOneSlaveInfo = useSelector((state) => state.slave.showInactiveSlaveInfo);

  //-------------------------------------------------

  useEffect(()=> {

    console.log("직원종류에 따라 가공된 직원리스트", showUpdatedSlaveListInfo);
    
  }, [showUpdatedSlaveListInfo])



  // 요일의 순서를 정의합니다.
  const dayOrder = ["월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"];

  //-------------------------------------------------

  // 특정 직원 한 명을 클릭했을 때 해당 직원의 상세정보페이지로 이동하기
  const selectOneSlaveHandler = async (slaveId) => {
    try {
      const response = await axios.get(`${BASE_URL}/detail/slave-info/${slaveId}`);

      const clickOneSlave = response.data;
    
      // slaveScheduleList를 요일 순서에 따라 정렬하기
      clickOneSlave.scheduleList.sort((a, b) => {
        return dayOrder.indexOf(a.scheduleDay) - dayOrder.indexOf(b.scheduleDay);
      });

      // 해당 직원의 정보를 redux 특정 직원 한 명의 정보 표시 에 저장하기
      dispatch(slaveActions.setShowOneSlaveInfo(clickOneSlave));
      // 해당 직원의 정보를 로컬스토리지에 저장하기
      localStorage.setItem('oneSlave', JSON.stringify(clickOneSlave)); 
    
      // 해당 직원 상세페이지로 이동하기
      navigate(`/detail/slave-info`);

    } catch (error) {
      setError(error.message);
      console.error('Error:', error);
    };

  };

  if (error) {
    return <div>Error: {error}</div>;
  };

  //-------------------------------------------------

  return (
    <>
      <div className={styles['content-box']}>
      {showUpdatedSlaveListInfo.totalSlaveCount === 0 ? 
          (<div className={`${styles['link-text']} ${styles['slaveManagementList-nonSlave']}`}> 선택한 직원 정보가 없습니다. </div>)
          : 
          (showUpdatedSlaveListInfo.slaveList.map((oneSlave, index) => 
            (
              <div
                key={oneSlave.slaveId}
                onClick={() => selectOneSlaveHandler(oneSlave.slaveId)}
                style={{
                  height: oneSlave.slaveScheduleList.some(schedule => schedule.scheduleType === false)
                    ? `${oneSlave.slaveScheduleList.length * 1.8}rem`
                    : '4rem',// 조건을 만족하지 않을 때의 기본 높이 설정
                    minHeight: '4rem'
                }}
                className={`${styles['link-text']} ${styles['slaveManagementList-OneSlave']}`}
              >
                <div className={styles['slaveManagementList-OneSlaveCount']}>
                    {index + 1}
                </div>
              
                <div className={styles['slaveManagementList-OneSlaveNameAndPosition']}>
                  <div className={styles['slaveManagementList-OneSlaveName']} >
                    {oneSlave.slaveName}
                  </div>
                  <div className={styles['slaveManagementList-OneSlavePosition']} >
                    {oneSlave.slavePosition}
                  </div>
                </div>
                {/* 급여리스트 */}
                {oneSlave.slaveWageList.map((wage) => 
                  <div key={wage.slaveWageId} className={styles['slaveManagementList-OneSlaveWage']}>
                    <div className={styles['slaveManagementList-OneSlaveMoneyType']} >
                      <div>{wage.slaveWageType} {wage.slaveWageAmount}원</div>
                      <div>(4대보험&nbsp;&nbsp;{wage.slaveWageInsurance})</div>
                    </div>
                  </div>
                )}
                {/* 근무리스트 */}
                {oneSlave.slaveScheduleList.some(schedule => schedule.scheduleType === true) 
                  ? (
                      <div key={oneSlave.slaveScheduleId} className={styles['slaveManagementList-OneSlaveScheduleList']}>
                        {oneSlave.slaveScheduleList
                          .filter(schedule => schedule.scheduleType === true) // scheduleType이 true인 것만 필터링
                          .map((schedule) => (
                            <div key={schedule.slaveScheduleId-1}>
                              {Array.isArray(schedule.scheduleDay)
                                ? schedule.scheduleDay.map((day, dayIndex) => (
                                    <span key={dayIndex}>
                                      {day.charAt(0)}
                                    </span>
                                  )).join(', ') // join을 사용해 문자열로 결합
                                : schedule.scheduleDay.charAt(0)
                              }
                              {` ${schedule.scheduleStart} - ${schedule.scheduleEnd}`}
                            </div>
                          ))}
                      </div>
                    ) 
                  :
                    (
                      <div className={styles['slaveManagementList-OneSlaveScheduleList']}>
                        {oneSlave.slaveScheduleList.map((schedule) => 
                          <div key={schedule.slaveScheduleId-0} className={styles['slaveManagementList-OneSlaveScheduleOne']}>
                            {Array.isArray(schedule.scheduleDay)
                              ? schedule.scheduleDay.map((day, dayIndex) => (
                                  <span key={dayIndex}>
                                    {day.charAt(0)}
                                  </span>
                                )).join(', ')
                              : schedule.scheduleDay.charAt(0)
                            }
                            {` ${schedule.scheduleStart} - ${schedule.scheduleEnd}`}
                          </div>
                        )}
                      </div>
                    )
                }
                
                

                <div className={styles['slaveManagementList-OneSlaveJoin']} >
                  <span>{oneSlave.slaveCreatedAt}</span>
                  <span style={{ fontSize: '13px' }}> {showWhichSlave === 'inactive' ? `(퇴사일자: ${oneSlave.slaveFiredDate})` : null} </span>
                </div>
              </div>
            )
          ))   
        }
      </div>
    </>
  )
}

export default SlaveManagePageSlaveStatusList