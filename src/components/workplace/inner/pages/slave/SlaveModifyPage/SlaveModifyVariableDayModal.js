import React, { useEffect, useState } from 'react'
import styles from './SlaveModifyVariableDayModal.module.scss';

const SlaveModifyVariableDayModal = ({ onVariable, oneSlave }) => {

  // 근무시간선택 --> 변동시간을 선택한 경우 요일 & 시간을 배열(객체{label, 요일선택여부, 시작시간, 종료시간}) 로 담기
  // 근무요일 (월=1, 화=2, 수=3, 목=4, 금=5, 토=6, 일=7)
  const initialVariableDays = 
                              [
                                { scheduleDay: 1, value: '월', select: false, startSchedule: '', endSchedule: '' },
                                { scheduleDay: 2, value: '화', select: false, startSchedule: '', endSchedule: '' },
                                { scheduleDay: 3, value: '수', select: false, startSchedule: '', endSchedule: '' },
                                { scheduleDay: 4, value: '목', select: false, startSchedule: '', endSchedule: '' },
                                { scheduleDay: 5, value: '금', select: false, startSchedule: '', endSchedule: '' },
                                { scheduleDay: 6, value: '토', select: false, startSchedule: '', endSchedule: '' },
                                { scheduleDay: 0, value: '일', select: false, startSchedule: '', endSchedule: '' },
                              ];

  // 변동시간 배열 상태값으로 관리
  const [variableDays , setVariableDays] = useState(initialVariableDays);

  function convertToTimeFormat(timeString) {
    // 예시로 주어진 timeString: '20시 21분'
    const timeParts = timeString.match(/(\d{1,2})시\s*(\d{1,2})분/);
    if (timeParts) {
        let hours = timeParts[1];
        let minutes = timeParts[2];

        // 시간을 두 자리로 맞추기 위해 0을 채운다.
        if (hours.length === 1) hours = '0' + hours;
        if (minutes.length === 1) minutes = '0' + minutes;

        return `${hours}:${minutes}`;
    }
    return '';
  }

  useEffect(() => {

    // 로컬스토리지에서 받아온 선택한 직원의 정보에서 급여리스트 정보만 추출하기
    const modifyScheduleList = oneSlave().scheduleList;
  
    // scheduleType이 false인 경우에만 아래 코드를 실행
    if (modifyScheduleList[0].scheduleType === false) {
  
      console.log("변동조회조회", modifyScheduleList[0].scheduleType);
  
      const updatedVariableDays = variableDays.map(day => {
        const schedule = modifyScheduleList.find(schedule => schedule.scheduleDay[0] === day.value);
        if (schedule) {
          return {
            ...day,
            select: true,
            startSchedule: convertToTimeFormat(schedule.scheduleStart),
            endSchedule: convertToTimeFormat(schedule.scheduleEnd)
          };
        }
        return day;
      });
  
      setVariableDays(updatedVariableDays);
    }
  
  }, []);

  // 요일을 선택여부에 따라 select 값 변경하기
  const selectDayHandler = e => {

    const selectDays = variableDays.map((day) => day.value === e.target.value ? {...day, select: !day.select} : {...day});

    // console.log('selectDays', selectDays);
    
    setVariableDays(selectDays);
  };

  // 시작시간을 입력하면 startSchedule 값 변경하기
    const startTimeHandler = (label, value) => {
      const inputStartTime = variableDays.map((day) => day.scheduleDay === label ? {...day, startSchedule: value} : {...day});

      setVariableDays(inputStartTime);
    };

    // 종료시간을 입력하면 endSchedule 값 변경하기
    const endTimeHandler = (label, value) => {
      const inputEndTime = variableDays.map((day) => day.scheduleDay === label ? {...day, endSchedule: value} : {...day});

      setVariableDays(inputEndTime);
    };

    // 배열에서 요일을 선택한 객체만 필터링하기
    useEffect(() => {
      
      const updatedVariableDays = variableDays.filter(day => day.select);
      console.log('최종 변동시간', updatedVariableDays);
  
      // SlaveRegistPage 에서 내려보낸 onVariable 에 updatedVariableDays 전달하기
      onVariable(updatedVariableDays);
  
    }, [variableDays]);

    //-------------------------------------------------

    return (
      <>
        <div className={styles['slaveRegistPageScheduleModal-title']} > 요일을 선택해주세요 </div>
  
        {variableDays.map((day) => (
        <div className={styles['slaveRegistPageScheduleModal-content']} key={day.scheduleDay} >
          <label htmlFor={day.scheduleDay} className={day.select ? styles.selectedDaySchedule : styles.nonDaySchedule } >
            {day.value}
            <input 
              type="checkbox" 
              checked={day.select} 
              id={day.scheduleDay} 
              value={day.value} 
              style={{ display: 'none' }} 
              onChange={selectDayHandler} 
            />
          </label>
  
          <label htmlFor={`${day.scheduleDay}-startTime`} >
            <input 
              type="time" 
              id={`${day.scheduleDay}-startTime`} 
              value={day.startSchedule} 
              className={styles['slaveRegistPageInputSchedule-input']} 
              onChange={ e => {startTimeHandler(day.scheduleDay, e.target.value)}}
            />
            부터
          </label>
  
          <label htmlFor={`${day.scheduleDay}-EndTime`}>
            <input 
              type="time" 
              id={`${day.scheduleDay}-EndTime`} 
              value={day.endSchedule} 
              className={styles['slaveRegistPageInputSchedule-input']} 
              onChange={ e => {endTimeHandler(day.scheduleDay, e.target.value)}}
            />
            까지
          </label>
        </div>
        ))}
      </>
    )
  }
  
  export default SlaveModifyVariableDayModal