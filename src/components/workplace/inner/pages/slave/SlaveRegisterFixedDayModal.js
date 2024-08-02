import React from 'react'
import styles from './SlaveRegisterFixedDayModal.module.scss';

const SlaveRegisterFixedDayModal = () => {
  return (
    <>
      <div className={styles.slaveRegistModalBox}>

        <div className={styles['slaveRegistPageInputSchedule-box']} >요일선택</div>
    
        <div className={styles['slaveRegistPageInputSchedule-box']} >
          <div className={styles['slaveRegistPageInputSchedule-content']} >
              <div className={styles['slaveRegistPageInputSchedule-title']}>월</div>
              <input type="checkbox" style={{ display: 'none' }}/>
          </div>

          <div className={styles['slaveRegistPageInputSchedule-content']} >
              <div className={styles['slaveRegistPageInputSchedule-title']}>화</div>
              <input type="checkbox" style={{ display: 'none' }}/>
          </div>

          <div className={styles['slaveRegistPageInputSchedule-content']} >
              <div className={styles['slaveRegistPageInputSchedule-title']}>수</div>
              <input type="checkbox" style={{ display: 'none' }}/>
          </div>

          <div className={styles['slaveRegistPageInputSchedule-content']} >
              <div className={styles['slaveRegistPageInputSchedule-title']}>목</div>
              <input type="checkbox" style={{ display: 'none' }}/>
          </div>

          <div className={styles['slaveRegistPageInputSchedule-content']} >
              <div className={styles['slaveRegistPageInputSchedule-title']}>금</div>
              <input type="checkbox" style={{ display: 'none' }}/>
          </div>

          <div className={styles['slaveRegistPageInputSchedule-content']} >
              <div className={styles['slaveRegistPageInputSchedule-title']}>토</div>
              <input type="checkbox" style={{ display: 'none' }}/>
          </div>

          <div className={styles['slaveRegistPageInputSchedule-content']} >
              <div className={styles['slaveRegistPageInputSchedule-title']}>일</div>
              <input type="checkbox" style={{ display: 'none' }}/>
          </div>
            
        </div>

        <div className={styles['slaveRegistPageInputSchedule-box']} >시간선택</div>

        <div className={styles['slaveRegistPageScheduleInput-box']} >
            <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
            <div>부터</div>
            <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
            <div>까지</div>
        </div>
      </div>
      
    </>
  )
}

export default SlaveRegisterFixedDayModal