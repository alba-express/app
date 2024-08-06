import React, { useEffect, useState } from 'react'
import styles from './SlaveRegisterFixedDayModal.module.scss';

const SlaveRegisterFixedDayModal = () => {

  // 근무시간선택 --> 고정시간을 선택한 경우 요일 & 시간을 배열(객체{label, 요일선택여부, 시작시간, 종료시간})로 담기
  const initialFixedDays = 
                    [
                      { label: 'monday', value: '월', select: false},
                      { label: 'tuesday', value: '화', select: false},
                      { label: 'wednesday', value: '수', select: false},
                      { label: 'thursday',  value: '목', select: false},
                      { label: 'friday', value: '금', select: false},
                      { label: 'saturday', value: '토', select: false},
                      { label: 'sunday', value: '일', select: false},
                    ];


  // 고정시간 요일 배열 상태값으로 관리
  const [fixedDays , setFixedDays] = useState(initialFixedDays);

  // 요일을 선택여부에 따라 select 값 변경하기
  const selectDayHandler = e => {

    const selectDays = fixedDays.map((day) => day.value === e.target.value ? {...day, select: !day.select} : {...day});

    setFixedDays(selectDays);
  };

  //-------------------------------------------------

  // 고정시간 시간 상태값으로 관리
  const [fixedTimes, setFixedTimes] = useState({startSchedule: '', endSchedule: ''});

  // 시작시간을 입력하면 startSchedule 값 변경하기
  const startTimeHandler = e => {
    // console.log('시작시간 input 태그 값', e.target.value);
    
    const inputStartTime = {...fixedTimes, startSchedule: e.target.value};

    setFixedTimes(inputStartTime);
  }

  // 종료시간을 입력하면 endSchedule 값 변경하기
  const endTimeHandler = e => {
    // console.log('종료시간 input 태그 값', e.target.value);

    const inputEndTime = {...fixedTimes, endSchedule: e.target.value};

    setFixedTimes(inputEndTime);
  }

  // 선택한 요일 & 입력한 시작/종료시간 상태값이 업데이트될 때 마다 실시간으로 확인하기
  useEffect(() => {

    console.log('선택한요일', fixedDays);
    console.log('선택한시간', fixedTimes);

  }, [fixedDays, fixedTimes]);

  //-------------------------------------------------

  return (
    <>
      <div className={styles.slaveRegistModalBox}>

        <div className={styles['slaveRegistPageInputSchedule-box']} >요일선택</div>
    
        <div className={styles['slaveRegistPageInputSchedule-box']} >
          <div className={styles['slaveRegistPageInputSchedule-content']} >

              {fixedDays.map((day) => (
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
            <label>
              <input type="time" className={styles['slaveRegistPageInputSchedule-input']} onChange={startTimeHandler}/>
              부터
            </label>
            <label>
              <input type="time" className={styles['slaveRegistPageInputSchedule-input']} onChange={endTimeHandler}/>
              까지
            </label>
        </div>
      </div>
      
    </>
  )
}

export default SlaveRegisterFixedDayModal