import React, { useEffect, useState } from 'react'
import styles from './SlaveRegisterFixedDayModal.module.scss';

const SlaveRegisterFixedDayModal = ({ onFixed }) => {

  // 근무시간선택 --> 고정시간을 선택한 경우 요일 & 시간을 배열(객체{label, 요일선택여부, 시작시간, 종료시간})로 담기
  // 근무요일 (월=1, 화=2, 수=3, 목=4, 금=5, 토=6, 일=7)
  const initialFixedDays = 
                          [
                            { scheduleDay: 1, value: '월', select: false, startSchedule: '', endSchedule: '' },
                            { scheduleDay: 2, value: '화', select: false, startSchedule: '', endSchedule: '' },
                            { scheduleDay: 3, value: '수', select: false, startSchedule: '', endSchedule: '' },
                            { scheduleDay: 4, value: '목', select: false, startSchedule: '', endSchedule: '' },
                            { scheduleDay: 5, value: '금', select: false, startSchedule: '', endSchedule: '' },
                            { scheduleDay: 6, value: '토', select: false, startSchedule: '', endSchedule: '' },
                            { scheduleDay: 7, value: '일', select: false, startSchedule: '', endSchedule: '' },
                          ];

  // 고정시간 요일 배열 상태값으로 관리
  const [fixedDays , setFixedDays] = useState(initialFixedDays);

  // 요일을 선택여부에 따라 select 값 변경하기
  const selectDayHandler = e => {

    setFixedDays((prev) => prev.map((prevDay) => prevDay.value === e.target.value ? {...prevDay, select: !prevDay.select} : {...prevDay}));
  };

  //-------------------------------------------------

  // 시작시간을 입력하면 startSchedule 값 변경하기
  const startTimeHandler = e => {

    const startTime = e.target.value;
    setFixedDays((prev) => prev.map((day) => ({ ...day, startSchedule: startTime })));
  };

  // 종료시간을 입력하면 endSchedule 값 변경하기
  const endTimeHandler = e => {

    const endTime = e.target.value;
    setFixedDays((prev) => prev.map((day) => ({ ...day, endSchedule: endTime })));
  };

  // 배열에서 요일을 선택한 객체만 필터링하기
  useEffect(() => {

    const updatedFixedDays = fixedDays.filter(day => day.select);
    console.log('최종 고정시간', updatedFixedDays);

    // SlaveRegistPage 에서 내려보낸 onFixed 에 updatedFixedDays 전달하기
    onFixed(updatedFixedDays);

  }, [fixedDays, onFixed]);

  //-------------------------------------------------

  return (
    <>
      <div className={styles['slaveRegistPageScheduleModal-title']} > 요일을 선택해주세요 </div>
    
      <div className={styles['slaveRegistPageScheduleModal-content']} >
      {fixedDays.map((day) => (
        <label key={day.scheduleDay} htmlFor={day.scheduleDay} className={day.select ? styles.selectedDaySchedule : styles.daySchedule } >
          {day.value}
          <input 
            type='checkbox' 
            checked={day.select} 
            id={day.scheduleDay} 
            value={day.value} 
            style={{ display: 'none' }} 
            onChange={selectDayHandler}
          />
        </label>
      ))}
      </div>

      <div className={styles['slaveRegistPageScheduleModal-title']} > 시간선택 </div>

      <div className={styles['slaveRegistPageScheduleModalInput-box']} >
        <label>
          <input 
            type="time" 
            className={styles['slaveRegistPageScheduleModalInput']} 
            onChange={startTimeHandler}
          />
          부터
        </label>
        
        <label>
          <input 
            type="time" 
            className={styles['slaveRegistPageScheduleModalInput']} 
            onChange={endTimeHandler}
          />
          까지
        </label>
      </div>
    </>
  )
}

export default SlaveRegisterFixedDayModal