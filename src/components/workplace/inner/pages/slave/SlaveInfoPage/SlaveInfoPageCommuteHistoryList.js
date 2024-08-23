import React, { useEffect, useState } from 'react'
import styles from './SlaveInfoPageCommuteHistoryList.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { slaveActions } from '../../../../../../store/slave-slice';
import axios from 'axios';

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

  //-------------------------------------------------

  // redux store 에서 상태값 변경하는 action hook 불러오기
  const dispatch = useDispatch();

  // 에러 상태값으로 관리
  const [error, setError] = useState(null);

  // redux store 에서 선택한 직원 한 명의 정보를 표시하는 상태값 불러오기
  const showOneSlaveScheduleLogInfo = useSelector((state) => state.slave.showOneSlaveScheduleLogInfo);

  //-------------------------------------------------

  const [log, setLog] = useState(null);

  // 서버로 페치요청보내 
  useEffect(() => {
    console.log("아이디", oneSlave.slaveId);
    const slaveId = oneSlave.slaveId;

    // API 엔드포인트에서 데이터를 받아오는 함수
    const fetchCommuteStatus = async () => {
      try {
        // axios를 사용하여 GET 요청
        const response = await axios.get(`http://localhost:8877/detail/status/${slaveId}`);

        const data = response.data;

        // Redux store에 데이터 저장
        dispatch(slaveActions.setShowOneSlaveScheduleLogInfo(data));

      } catch (error) {
        console.error("Fetch error: ", error);
        setError(error.message);
      }
    };

    fetchCommuteStatus();
  }, [oneSlave.slaveId]);

  useEffect(()=> {
    console.log(showOneSlaveScheduleLogInfo);
    
  }, [])

  if (error) {
    return <div>Error: {error}</div>;
  }
    

  return (
    <>
      {showOneSlaveScheduleLogInfo.map((log, index) => (
        <div className={`${styles['link-text']} ${styles['slaveManagementList-OneSlave']}`}>

          <div className={styles['slaveManagementList-OneSlaveName']} >
            날짜: {log.date}
          </div>
          <div className={styles['slaveManagementList-OneSlaveName']} >
            시작시간정보: {log.expectedStartTime}
          </div>
          <div className={styles['slaveManagementList-OneSlaveName']} >
            종료시간정보: {log.expectedEndTime}
          </div>
          <div className={styles['slaveManagementList-OneSlaveName']} >
            출근시간 :{log.actualStartTime}
          </div>
          <div className={styles['slaveManagementList-OneSlaveName']} >
            퇴근시간 : {log.actualEndTime}
          </div>
          <div className={styles['slaveManagementList-OneSlaveName']} >
            근무현황 : {log.status}
          </div>
        </div>
      ))}
    </>
  )
}

export default SlaveInfoPageCommuteHistoryList