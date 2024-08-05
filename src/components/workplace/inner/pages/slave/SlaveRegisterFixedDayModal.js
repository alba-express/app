import React, { useEffect, useState } from 'react'
import styles from './SlaveRegisterFixedDayModal.module.scss';

const SlaveRegisterFixedDayModal = () => {

  // 근무시간선택 --> 고정시간을 선택한 경우 요일 & 시간을 배열(객체{label, 요일선택여부, 시작시간, 종료시간})로 담기
  const fixedDays = 
                    [
                      { label: 'monday', value: '월', select: false, startSchedule: '', endSchedule: ''},
                      { label: 'tuesday', value: '화', select: false, startSchedule: '', endSchedule: ''},
                      { label: 'wednesday', value: '수', select: false, startSchedule: '', endSchedule: ''},
                      { label: 'thursday',  value: '목', select: false, startSchedule: '', endSchedule: ''},
                      { label: 'friday', value: '금', select: false, startSchedule: '', endSchedule: ''},
                      { label: 'saturday', value: '토', select: false, startSchedule: '', endSchedule: ''},
                      { label: 'sunday', value: '일', select: false, startSchedule: '', endSchedule: ''},
                    ];

  // 고정시간 배열 상태값으로 관리
  const [selectDay, setSelectDay] = useState(fixedDays);

  const selectDayHandler = e => {

    // 요일을 선택여부에 따라 select 값 변경하기
    setSelectDay((prev) => prev.map((prevDay) => prevDay.value === e.target.value ? {...prevDay, select: !prevDay.select} : {...prevDay}));
    
  };

  useEffect(() => {
    // console.log(selectDay);
    console.log('선택한요일', selectDay);
  }, [selectDay]);

  //-------------------------------------------------

  return (
    <>
      <div className={styles.slaveRegistModalBox}>

        <div className={styles['slaveRegistPageInputSchedule-box']} >요일선택</div>
    
        <div className={styles['slaveRegistPageInputSchedule-box']} >
          <div className={styles['slaveRegistPageInputSchedule-content']} >

              {selectDay.map((day) => (
                <label 
                      key={day.index} 
                      htmlFor={day.label} 
                      className={day.select ? styles.SelectedDaySchedule : styles.slaveRegistPageInputScheduleTitle } 
                      onClick={selectDayHandler}
                >
                  {day.value}
                  <input type='checkbox' checked={day.select} id={day.label}  value={day.value} style={{ display: 'none' }} />
                </label>
              ))}

          </div>
        </div>

        <div className={styles['slaveRegistPageInputSchedule-box']} >시간선택</div>

        <div className={styles['slaveRegistPageScheduleInput-box']} >
            <input type="time" className={styles['slaveRegistPageInputSchedule-input']} value={fixedDays.startSchedule}/>
            <div>부터</div>
            <input type="time" className={styles['slaveRegistPageInputSchedule-input']} value={fixedDays.endSchedule}/>
            <div>까지</div>
        </div>
      </div>
      
    </>
  )
}

export default SlaveRegisterFixedDayModal