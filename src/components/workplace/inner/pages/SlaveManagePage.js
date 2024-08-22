import React, { useEffect, useState } from 'react'
import styles from './SlaveManagePage.module.scss';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SlaveManagePageSlaveList from "./slave/SlaveManagePageSlaveList";
import { useDispatch, useSelector } from 'react-redux';
import { slaveActions } from '../../../../store/slave-slice';
import axios from 'axios';
import { workplaceActions } from '../../../../store/workplace-slice';

const SlaveManagePage = () => {

  // redux store 에서 상태값 변경하는 action hook 불러오기
  const dispatch = useDispatch();

      // 괴도 박성진 다녀감
      useEffect(() => {
          dispatch(workplaceActions.setCurrentPage({currentPage: 1}));
      }, [])
      // 괴도 박성진 다녀감

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

  // 검색창에 검색하는 이름을 상태값으로 관리하기
  const [searchName, setSearchName] = useState('');

  // search 전용 input 태그에 이름이 입력될 경우 이름을 상태값에 반영하기
  const slaveSearchHandler = e => {
    setSearchName(e.target.value);
  };

  // 검색아이콘을 클릭할 경우 상태값으로 관리하는 검색할 이름을 서버로 전송하기
  const sendSearchHandler = async () => {

    // 검색할 이름이 공백일 경우
    if (searchName.trim() === '') {
      alert("검색할 직원의 이름을 입력해주세요");
      return;
    }

    // 검색할 이름을 서버로 전송하기
    try {
      const response = await axios.get(`http://localhost:8877/detail/search-slave/`, {
        params: {
            slaveName: searchName,
            workplaceId: localStorage.getItem('workplaceId')
        }
    });

    // 검색한 이름을 가진 직원 정보가 있을 경우
    if (response.data) {
      dispatch(slaveActions.setShowSearchSlaveInfo(response.data)); // redux 의 직원 한 명 정보에 저장
      localStorage.setItem('searchSlaveList', JSON.stringify(response.data)); // 로컬스토리지에 저장

      const searchSlave = localStorage.getItem('searchSlaveList');

      console.log('검색한직원', searchSlave);
      
    } else {
      alert("해당 이름을 가진 직원 정보가 없습니다")
    }

  } catch (e) {
    console.error('서버에 검색할 직원의 이름 전송 실패', e);
    alert('직원 정보를 가져오는 데 실패했습니다.');

  }};

  //-------------------------------------------------

  return (
      <>
        <div className={styles['content-box']}>
          <div className={styles['slaveManagementHeader-box']}>
            <div className={styles['slaveManagementHeader-title']}> 직원관리 </div>

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
              <input className={styles['slaveManagementTitle-search']} value={searchName} placeholder="이름으로 검색" onChange={slaveSearchHandler}/>
              <FontAwesomeIcon icon={faSearch} className={styles['slaveManagementList-question']} onClick={sendSearchHandler}/>
            </div>

          </div>

          {/* 직원 목록 틀 */}
          <SlaveManagePageSlaveList />

        </div>
      </>
  );
};

export default SlaveManagePage;
