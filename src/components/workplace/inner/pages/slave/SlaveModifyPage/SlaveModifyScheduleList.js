import React, { useCallback, useEffect, useState } from 'react'
import styles from './SlaveModifyScheduleList.module.scss';
import SlaveModifyFixedDayModal from './SlaveModifyFixedDayModal';
import SlaveModifyVariableDayModal from './SlaveModifyVariableDayModal';

const SlaveModifyScheduleList = ({ onSchedules }) => {
  
  // 근무정보리스트 기본 배열 설정하기
  // 근무타입(ScheduleType): true, 1 --> 고정시간 / false, 0 --> 변동시간
  // 근무요일(ScheduleDay): 1--> 월 / 2--> 화 / 3--> 수 / 4--> 목 / 5--> 금 / 6--> 토 / 0--> 일
                                // 근무타입,               근무리스트     
  const initialScheduleList = {slaveScheduleType: null, slaveScheduleList: []};

  // 근무리스트 상태값으로 관리하기
  const [scheduleList, setScheduleList] = useState(initialScheduleList);

    // 근무방식선택에 따른 버튼 스타일 변경
    const getScheduleTypeClassName = (type) => {

        if (type === '') {
            return styles.nonScheduleType;
        } else if (type === 'fixed') {
            return scheduleList.slaveScheduleType === true ? styles.scheduleType : styles.nonScheduleType;

        } else if (type === 'variable') {
            return scheduleList.slaveScheduleType === false ? styles.scheduleType : styles.nonScheduleType;
        }
    };

    // 고정시간 버튼 클릭이벤트 
    const fixedDayHandler = e => {

        // 이미 고정시간(true)이 클릭된 상태인 경우 재클릭이기 때문에 선택 초기화 (근무타입)
        if (scheduleList.slaveScheduleType === true) {
            setScheduleList(initialScheduleList);
            
            // 아무것도 클릭을 안했었거나, 변동시간(false)이 클릭됐었던 경우 근무타입 고정시간(true) 으로 변경
        } else {
            setScheduleList({...scheduleList, slaveScheduleType: true });
        }
    };

    //-------------------------------------------------

    // 변동시간 버튼 클릭이벤트
    const variableDayHandler = e => {

        // 이미 변동시간(false)이 클릭된 상태인 경우 재클릭이기 때문에 선택 초기화 (근무타입)
        if (scheduleList.slaveScheduleType === false) {
            setScheduleList(initialScheduleList);

            // 아무것도 클릭을 안했었거나, 고정시간(true)이 클릭됐었던 경우 근무타입 변동시간(false) 으로 변경
        } else {
            setScheduleList({...scheduleList, slaveScheduleType: false });
        }
    };

    //-------------------------------------------------

    // 고정시간 모달창으로 함수 내려보내 고정시간 정보 받아오기 & 상태관리하기
    const onFixedDay = useCallback((fixedDay) => {
        setScheduleList(prev => ({...prev, slaveScheduleList: fixedDay}));
    }, [scheduleList]);


    // 변동시간 모달창으로 함수 내려보내 변동시간 정보 받아오기 & 상태관리하기
    const onVariableDay = useCallback((variableDay) => { 
        setScheduleList(prev => ({...prev, slaveScheduleList: variableDay}));
    }, [scheduleList]);

    //-------------------------------------------------

    // 직원등록에서 내려온 함수에 근무리스트 담아서 올려보내기
    useEffect(() => {

      onSchedules(scheduleList);

    }, [scheduleList]);

    //-------------------------------------------------

  return (
    <>
        <div className={styles['slaveRegistPageSchedule-box']} >
            <div className={styles['slaveRegistPageInput-title']} > 근무시간선택 </div>

            <div className={styles['slaveRegistPageInputScheduleTitle-box']} >

                <label htmlFor="fixed" className={getScheduleTypeClassName('fixed')} >
                    고정시간
                    <input id="fixed" onClick={fixedDayHandler} type="checkbox" style={{ display: 'none' }} />
                </label>

                <label htmlFor="variable" className={getScheduleTypeClassName('variable')} >
                    변동시간
                    <input id="variable" onClick={variableDayHandler} type="checkbox" style={{ display: 'none' }} />
                </label>

            </div>

            <div className={styles['slaveRegistPageInputScheduleContent-box']} >

                {scheduleList.slaveScheduleType === true && <SlaveModifyFixedDayModal onFixed={onFixedDay} />}
                {scheduleList.slaveScheduleType === false && <SlaveModifyVariableDayModal onVariable={onVariableDay} />}

            </div>
        </div>
    </>
  )
}

export default SlaveModifyScheduleList