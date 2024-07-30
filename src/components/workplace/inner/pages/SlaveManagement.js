import React from 'react'
// import SlaveDetail from './SlaveDetail'
// import RegisterSlave from './registstSlave/RegisterSlave'
import styles from './SlaveManagement.module.scss';

const SlaveManagement = () => {
  // 1. 사업장의 모든 직원 보여주기

  // 2. 직원 한 명 클릭하면 해당 직원 상세조회 페이지로 이동하기

  // 3. 직원등록 페이지로 이동하기

  return (
    <>
      <div className={styles['body-box']} >
        <div className={styles['main-box']} >
          <div>
            <div className={styles['logo-box']} > 
              Alba Express </div>
            <div className={styles['profile-box']} > 이미영사장님 안녕하세요 </div>
            <div className={styles['leftMenu-box']}> 
              <img src={""} /> 직원관리 
            </div>
            <div className={styles['leftMenu-box']}> 
              <img src={""} /> 급여관리 
            </div>
            <div className={styles['leftMenu-box']}> 
              <img src={""} /> 일정관리 </div>
            <div className={styles['leftMenu-box']}> 
              <img src={""} /> 공지사항 </div>
            <div className={styles['leftMenu-box']}> 
              <img src={""} />출근/퇴근 </div>
          </div>
          <div>
            <div className={styles['headerButton-box']} >
              <div className={styles['headerNotice']}> 
                <img src={""} /> 사장님 말씀 : 도비는 자유가 없어 
              </div>
              <button className={styles['headerButton']} > 사업장변경 </button>
              <button className={styles['headerButton']} > 로그아웃 </button>
            </div>
            <div className={styles['content-box']}>
              <div className={styles['slaveMain-box']}>
                <div>직원관리</div>
                <div>총 직원 수 : 5명</div>
                <button className={styles['headerButton']} >직원등록</button>
              </div>
              <div>
                <div></div>
              </div>
            </div>
          </div>

        </div>
      </div>
      {/* <p>------------------------------------------- 직원리스트페이지</p> */}
      {/* <SlaveDetail /> */}
      {/* <RegisterSlave /> */}
    </>
  )
}

export default SlaveManagement