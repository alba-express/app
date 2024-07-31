import React from "react";
import styles from './SlaveManagePage.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SlaveManagePage = () => {
    return (
        <>
            <div className={styles['content-box']}>
                <div className={styles['slaveManagementHeader-box']}>
                  <div className={styles['slaveManagementHeader-title']}>알바관리</div>
                  <div className={styles['slaveManagementHeader-count']}>총 직원 수 : 5명</div>
                  <button className={styles['headerButton']} >직원등록</button>
                </div>
                <div className={styles['slaveManagementList-box']}>
                  <div className={styles['slaveManagementList-titlebox']}>
                    <div className={styles['slaveManagementList-title']}> 근무중 아르바이트생 목록 </div>
                    <div className={styles['slaveManagementList-title2']}> 퇴사한 아르바이트생 목록 </div>
                    <div className={styles['slaveManagementList-searchbox']}>
                      <input className={styles['slaveManagementList-search']} value={"이름으로 검색"} />
                      <FontAwesomeIcon icon={faSearch} className={styles['slaveManagementList-question']} />
                    </div>
                  </div>
                  <div className={styles['slaveManagementList-content']}>
                    <div className={styles['slaveManagementList-slave']}></div>
                    <div className={styles['slaveManagementContent-nameAndRole']}>
                      <div className={styles['slaveManagementContent-name']}>키티</div>
                      <div className={styles['slaveManagementContent-role']}>매니저</div>
                    </div>
                    <div>근무시간 : 월, 수, 금 08:00~20:00</div>
                    <div>입사일 : 2024.07.30</div>
                  </div>
                </div>
            </div>
        </>
    );
};

export default SlaveManagePage;
