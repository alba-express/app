import React from 'react'
import styles from './SlaveManagePageActiveSlaveList.module.scss'

const SlaveManagePageActiveSlaveList = () => {
  return (
    <>
      <div className={styles['slaveManagementList-title']}>
        <div className={styles['slaveManagementList-titleNumber']}>직원번호</div>
        <div className={styles['slaveManagementList-titleName']}>이름 & 직책</div>
        <div className={styles['slaveManagementList-titleTime']}>근무시간</div>
        <div className={styles['slaveManagementList-titleMoney']}>시급</div>
        <div className={styles['slaveManagementList-titleJoin']}>입사일</div>
      </div>
      <div className={styles['slaveManagementList-content']}>
        <div className={styles['slaveManagementList-box']}>
          <div className={styles['slaveManagementList-OneSlave']}>
            <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
            <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
            <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
            <div className={styles['slaveManagementList-OneSlaveMoney']}>10000원</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2020.03.22</div>
          </div>
          <div className={styles['slaveManagementList-OneSlave']}>
            <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
            <div className={styles['slaveManagementList-OneSlaveName']}>공갈빵알바</div>
            <div className={styles['slaveManagementList-OneSlaveTime']}>월, 금 14:00~24:00</div>
            <div className={styles['slaveManagementList-OneSlaveMoney']}>500원</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2022.05.05</div>
          </div>
          <div className={styles['slaveManagementList-OneSlave']}>
            <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
            <div className={styles['slaveManagementList-OneSlaveName']}>팥죽알바</div>
            <div className={styles['slaveManagementList-OneSlaveTime']}>월, 금 08:00~20:00</div>
            <div className={styles['slaveManagementList-OneSlaveMoney']}>3300원</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
          </div>
          <div className={styles['slaveManagementList-OneSlave']}>
            <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
            <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
            <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
            <div className={styles['slaveManagementList-OneSlaveMoney']}>1800원</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
          </div>
          <div className={styles['slaveManagementList-OneSlave']}>
            <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
            <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
            <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
            <div className={styles['slaveManagementList-OneSlaveMoney']}>20000원</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
          </div>
          <div className={styles['slaveManagementList-OneSlave']}>
            <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
            <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
            <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
            <div className={styles['slaveManagementList-OneSlaveMoney']}>12000원</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
          </div>
          <div className={styles['slaveManagementList-OneSlave']}>
            <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
            <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
            <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
            <div className={styles['slaveManagementList-OneSlaveMoney']}>9980원</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
          </div>
          <div className={styles['slaveManagementList-OneSlave']}>
            <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
            <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
            <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
            <div className={styles['slaveManagementList-OneSlaveMoney']}>100원</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
          </div>
          <div className={styles['slaveManagementList-OneSlave']}>
            <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
            <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
            <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
            <div className={styles['slaveManagementList-OneSlaveMoney']}>25000원</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
          </div>
          <div className={styles['slaveManagementList-OneSlave']}>
            <div className={styles['slaveManagementList-OneSlaveNumber']}>10041818</div>
            <div className={styles['slaveManagementList-OneSlaveName']}>키티매니저</div>
            <div className={styles['slaveManagementList-OneSlaveTime']}>월, 수, 금 08:00~20:00</div>
            <div className={styles['slaveManagementList-OneSlaveMoney']}>10원</div>
            <div className={styles['slaveManagementList-OneSlaveJoin']}>2024.07.30</div>
          </div>
          
        </div>
      </div>
    </>
  )
}

export default SlaveManagePageActiveSlaveList