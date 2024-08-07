import React, { useEffect, useState } from 'react'
import styles from './SlaveRegisterVariableDayModal.module.scss';

const SlaveRegisterVariableDayModal = ({ onVariable }) => {

  // 근무시간선택 --> 변동시간을 선택한 경우 요일 & 시간을 배열(객체{label, 요일선택여부, 시작시간, 종료시간}) 로 담기
  const initialVariableDays = 
                              [
                                { label: 'monday', value: '월', select: false, startSchedule: '', endSchedule: '' },
                                { label: 'tuesday', value: '화', select: false, startSchedule: '', endSchedule: '' },
                                { label: 'wednesday', value: '수', select: false, startSchedule: '', endSchedule: '' },
                                { label: 'thursday',  value: '목', select: false, startSchedule: '', endSchedule: '' },
                                { label: 'friday', value: '금', select: false, startSchedule: '', endSchedule: '' },
                                { label: 'saturday', value: '토', select: false, startSchedule: '', endSchedule: '' },
                                { label: 'sunday', value: '일', select: false, startSchedule: '', endSchedule: '' },
                              ];

  // 변동시간 배열 상태값으로 관리
  const [variableDays , setVariableDays] = useState(initialVariableDays);

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
    
    const inputStartTime = variableDays.map((day) => day.label === label ? {...day, startSchedule: value} : {...day});

    setVariableDays(inputStartTime);
  };

  // 종료시간을 입력하면 endSchedule 값 변경하기
  const endTimeHandler = (label, value) => {
    // console.log('label', label);
    // console.log('value', value);

    const inputEndTime = variableDays.map((day) => day.label === label ? {...day, endSchedule: value} : {...day});

    setVariableDays(inputEndTime);
  };

  // 배열에서 요일을 선택한 객체만 필터링하기
  useEffect(() => {

    const updatedVariableDays = variableDays.filter(day => day.select);
    // console.log('최종 변동시간', updatedVariableDays);

    // SlaveRegistPage 에서 내려보낸 onVariable 에 updatedVariableDays 전달하기
    onVariable(updatedVariableDays);

  }, [variableDays]);

  //-------------------------------------------------

  return (
    <>
      <div className={styles['slaveRegistPageScheduleModal-title']} > 요일을 선택해주세요 </div>

      {variableDays.map((day) => (
      <div className={styles['slaveRegistPageScheduleModal-content']} key={day.label} >
        <label htmlFor={day.label} className={day.select ? styles.selectedDaySchedule : styles.daySchedule} >
          {day.value}
          <input 
            type="checkbox" 
            checked={day.select} 
            id={day.label} 
            value={day.value} 
            style={{ display: 'none' }} 
            onChange={selectDayHandler} 
          />
        </label>

        <label htmlFor={`${day.label}-startTime`} >
          <input 
            type="time" 
            id={`${day.label}-startTime`} 
            value={day.startSchedule} 
            className={styles['slaveRegistPageInputSchedule-input']} 
            onChange={ e => {startTimeHandler(day.label, e.target.value)}}
          />
          부터
        </label>

        <label htmlFor={`${day.label}-EndTime`}>
          <input 
            type="time" 
            id={`${day.label}-EndTime`} 
            value={day.endSchedule} 
            className={styles['slaveRegistPageInputSchedule-input']} 
            onChange={ e => {endTimeHandler(day.label, e.target.value)}}
          />
          까지
        </label>
      </div>
      ))}
    </>
  )
}

export default SlaveRegisterVariableDayModal