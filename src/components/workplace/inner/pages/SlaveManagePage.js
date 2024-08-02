import React, { useState } from "react";
import styles from './SlaveManagePage.module.scss';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SlaveManagePageActiveSlaveList from "./slave/SlaveManagePageActiveSlaveList";
import SlaveManagePageInactiveSlaveList from "./slave/SlaveManagePageInactiveSlaveList";

const SlaveManagePage = () => {

  // 직원종류선택 --> 근무중인직원 & 퇴사한 직원 목록보기 상태값 관리
  const [active, setActive] = useState(true);

  const activeSlaveHandler = e => {
    setActive(true);
  }

  const inactiveSlaveHandler = e => {
    setActive(false);
  }



  return (
      <>
          <div className={styles['content-box']}>
              <div className={styles['slaveManagementHeader-box']}>
                <div className={styles['slaveManagementHeader-title']}>직원관리</div>
                <div className={styles['slaveManagementHeader-count']}>총 직원 수 : 5명</div>
                <Link to="/detail/slave-regist" className={styles['link-text']}> 
                  <button className={styles['headerButton']} > 직원등록 </button>
                </Link>
                <Link to="/detail/slave-modify" className={styles['link-text']}> 
                  <button className={styles['headerButton']} > 직원수정(임시) </button>
                </Link>
                <Link to="/detail/slave-info" className={styles['link-text']}> 
                  <button className={styles['headerButton']} > 직원상세(임시) </button>
                </Link>
              </div>
              <div className={styles['slaveManagementTitle-box']}>
                <div onClick={activeSlaveHandler} className={styles['slaveManagementTitle-list']}> 근무중 아르바이트생 목록 </div>
                <div onClick={inactiveSlaveHandler} className={styles['slaveManagementTitle-list']}> 퇴사한 아르바이트생 목록 </div>
                <div className={styles['slaveManagementTitle-searchbox']}>
                  <input className={styles['slaveManagementTitle-search']} value={"이름으로 검색"} />
                  <FontAwesomeIcon icon={faSearch} className={styles['slaveManagementList-question']} />
                </div>
              </div>
              <div>

                {active ? <SlaveManagePageActiveSlaveList /> : <SlaveManagePageInactiveSlaveList />}

              </div>
          </div>
      </>
  );
};

export default SlaveManagePage;
