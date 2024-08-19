import React, { useState } from 'react'
import styles from './SlaveManagePage.module.scss';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SlaveManagePageSlaveList from "./slave/SlaveManagePageSlaveList";
import { useDispatch, useSelector } from 'react-redux';
import { slaveActions } from '../../../../store/slave-slice';

const SlaveManagePage = () => {

  // redux store 에서 상태값 변경하는 action hook 불러오기
  const dispatch = useDispatch();

  //-------------------------------------------------

  // redux store 에서 근무중인 직원 or 퇴사한 직원 목록 표시하는 상태값 불러오기 (초기값: 근무중인 직원 목록 표시)
  const showSlaveList = useSelector((state) => state.slave.showSlaveList);

  // redux store 에서 근무중인 직원의 정보를 표시하는 상태값 불러오기
  const showActiveSlaveInfo = useSelector((state) => state.slave.showActiveSlaveInfo);

  // redux store 에서 퇴사한 직원의 정보를 표시하는 상태값 불러오기
  const showInactiveSlaveInfo = useSelector((state) => state.slave.showInactiveSlaveInfo);

  // 근무중 직원 목록 버튼 클릭한 경우 상태값 변경하기
  const activeSlaveHandler = e => {
    dispatch(slaveActions.setShowSlaveList(true));
  }

  // 퇴사한 직원 목록 버튼 클릭한 경우 상태값 변경하기
  const inactiveSlaveHandler = e => {
    dispatch(slaveActions.setShowSlaveList(false));
  }

  //-------------------------------------------------

  const slaveSearchHandler = e => {
    e.target.value = '';
  }

  //-------------------------------------------------

  return (
      <>
        <div className={styles['content-box']}>
          <div className={styles['slaveManagementHeader-box']}>
            <div className={styles['slaveManagementHeader-title']}>직원관리</div>

            <Link to="/detail/slave-regist" className={styles['link-text']}> 
              <button className={styles['headerButton']} > 직원등록 </button>
            </Link>

          </div>
          
          <div className={styles['slaveManagementTitle-box']}>

            <div onClick={activeSlaveHandler} className={showSlaveList ? styles.slaveListSelectType : styles.slaveListType} > 
              <div>근무중인 직원 보기 </div>
              <div className={styles.slaveListCount} > ( 총 직원수 : {showActiveSlaveInfo.totalSlaveCount ? showActiveSlaveInfo.totalSlaveCount : 0} 명 ) </div>
            </div>

            <div onClick={inactiveSlaveHandler} className={showSlaveList ? styles.slaveListType : styles.slaveListSelectType} > 
              <div>퇴사한 직원 보기 </div>
              <div className={styles.slaveListCount}> ( 총 직원수 : {showInactiveSlaveInfo.totalSlaveCount ? showInactiveSlaveInfo.totalSlaveCount : 0} 명 ) </div> 
            </div>

            <div className={styles['slaveManagementTitle-searchbox']}>
              <input className={styles['slaveManagementTitle-search']} value={"이름으로 검색"} onClick={slaveSearchHandler}/>
              <FontAwesomeIcon icon={faSearch} className={styles['slaveManagementList-question']} />
            </div>

          </div>

          {/* 직원 목록 틀 */}
          <SlaveManagePageSlaveList />

        </div>
      </>
  );
};

export default SlaveManagePage;
