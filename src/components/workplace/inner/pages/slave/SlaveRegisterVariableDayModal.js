import React from 'react'
import styles from './SlaveRegisterVariableDayModal.module.scss';

const SlaveRegisterModal = () => {

  return (
    <>
      <div className={styles.slaveRegistModalBox}>
        <div className={styles['slaveRegistPageInputSchedule-box']} >
            <div className={styles['slaveRegistPageInputSchedule-content']} >
                <div className={styles['slaveRegistPageInputSchedule-title']}>월</div>
                <input type="checkbox" style={{ display: 'none' }}/>
                <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
                <div>부터</div>
                <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
                <div>까지</div>
            </div>
            <div className={styles['slaveRegistPageInputSchedule-content']} >
                <div className={styles['slaveRegistPageInputSchedule-title']}>화</div>
                <input type="checkbox" style={{ display: 'none' }}/>
                <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
                <div>부터</div>
                <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
                <div>까지</div>
            </div>
            <div className={styles['slaveRegistPageInputSchedule-content']} >
                <div className={styles['slaveRegistPageInputSchedule-title']}>수</div>
                <input type="checkbox" style={{ display: 'none' }}/>
                <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
                <div>부터</div>
                <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
                <div>까지</div>
            </div>
            <div className={styles['slaveRegistPageInputSchedule-content']} >
                <div className={styles['slaveRegistPageInputSchedule-title']}>목</div>
                <input type="checkbox" style={{ display: 'none' }}/>
                <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
                <div>부터</div>
                <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
                <div>까지</div>
            </div>
            <div className={styles['slaveRegistPageInputSchedule-content']} >
                <div className={styles['slaveRegistPageInputSchedule-title']}>금</div>
                <input type="checkbox" style={{ display: 'none' }}/>
                <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
                <div>부터</div>
                <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
                <div>까지</div>
            </div>
            <div className={styles['slaveRegistPageInputSchedule-content']} >
                <div className={styles['slaveRegistPageInputSchedule-title']}>토</div>
                <input type="checkbox" style={{ display: 'none' }}/>
                <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
                <div>부터</div>
                <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
                <div>까지</div>
            </div>
            <div className={styles['slaveRegistPageInputSchedule-content']} >
                <div className={styles['slaveRegistPageInputSchedule-title']}>일</div>
                <input type="checkbox" style={{ display: 'none' }}/>
                <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
                <div>부터</div>
                <input type="time" className={styles['slaveRegistPageInputSchedule-input']}/>
                <div>까지</div>
            </div>
        </div>
        {/* <div className={styles.close} onClick={onCloseSlaveRegisterModal}>닫기</div> */}
      </div>
    </>
  )
}

export default SlaveRegisterModal