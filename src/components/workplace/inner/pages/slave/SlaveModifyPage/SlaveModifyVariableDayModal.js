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

  useEffect(() => {
    // 로컬스토리지에서 받아온 선택한 직원의 정보에서 스케줄 리스트 정보만 추출하기
    const modifyScheduleList = oneSlave().scheduleList;

    if (modifyScheduleList && modifyScheduleList.length > 0) {
      setVariableDays(prev =>
        prev.map(day => {
          // modifyScheduleList 배열에서 해당 요일에 맞는 스케줄 찾기
          const matchedSchedule = modifyScheduleList.find(schedule => 
            schedule.scheduleDay.substring(0, 1) === day.value
          );

          if (matchedSchedule) {
            return {
              ...day,
              select: true,
              startSchedule: matchedSchedule.scheduleStart,
              endSchedule: matchedSchedule.scheduleEnd,
            };
          } else {
            return day; // 일치하는 스케줄이 없으면 기존의 day 객체 반환
          }
        })
      );
    }

    console.log("스케쥴", modifyScheduleList);
  }, []);

  // 요일을 선택여부에 따라 select 값 변경하기
  const selectDayHandler = e => {

    const selectDays = variableDays.map((day) => day.value === e.target.value ? {...day, select: !day.select} : {...day});

    // console.log('selectDays', selectDays);
    
    setVariableDays(selectDays);
  };

  // 시작시간을 입력하면 startSchedule 값 변경하기
  const startTimeHandler = (label, value) => {
    // console.log('label', label);
    // console.log('value', value);
    
    const inputStartTime = variableDays.map((day) => day.scheduleDay === label ? {...day, startSchedule: value} : {...day});

    setVariableDays(inputStartTime);
  };

  // 종료시간을 입력하면 endSchedule 값 변경하기
  const endTimeHandler = (label, value) => {
    // console.log('label', label);
    // console.log('value', value);

    const inputEndTime = variableDays.map((day) => day.scheduleDay === label ? {...day, endSchedule: value} : {...day});

    setVariableDays(inputEndTime);
  };

  // 배열에서 요일을 선택한 객체만 필터링하기
  useEffect(() => {

    const updatedVariableDays = variableDays.filter(day => day.select);
    console.log('최종 변동시간', updatedVariableDays);

    // SlaveRegistPage 에서 내려보낸 onVariable 에 updatedVariableDays 전달하기
    onVariable(updatedVariableDays);

  }, [variableDays, onVariable]);

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