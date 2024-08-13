import React from 'react'
import styles from './SlaveInfoPage.module.scss';
import { Link } from "react-router-dom";
import SlaveInfoPageCommuteList from './slave/SlaveInfoPageCommuteList';

const SlaveInfoPage = () => {
  return (
    <>
        <div className={styles['content-box']}>
            <div className={styles['slaveInfoPage-HeaderBox']} >
                <div className={styles['slaveInfoPage-HeaderTitle']} > 직원상세정보 </div>
                <Link to="/detail/slave-modify" className={styles['link-text']}> 
                    <button className={styles['headerButton']} > 직원수정 </button>
                </Link>
            </div>

            <div className={styles['slaveInfoPage-MiddleBox']}>
                <div>
                    <div className={styles['slaveInfoPage-SlaveInfoBox']}>
                        <div className={styles['slaveInfoPage-SlaveInfoTitle']}> 개인정보 </div>
                        <div className={styles['slaveInfoPage-SlaveInfoContentBox']}>
                            <div className={styles['slaveInfoPage-SlaveInfoContentTitle']}>
                                <div> 이름 : </div>
                                <div> 직책 : </div>
                                <div> 전화번호 : </div>
                                <div> 생년월일 : </div>
                                <div> 입사일 : </div>
                            </div>
                            <div className={styles['slaveInfoPage-SlaveInfoContentContent']}>
                                <div>뽀로로</div>
                                <div>노예</div>
                                <div>010-9542-4752</div>
                                <div>1810-05-24</div>
                                <div>2024-08-13</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles['slaveInfoPage-SlaveWageBox']}>
                        <div className={styles['slaveInfoPage-SlaveWageTitle']}> 급여타입 / 금액 </div>
                        <div className={styles['slaveInfoPage-SlaveInfoContentBox']} > 시급 10000원 </div>
                    </div>
                </div>
                    
                <div>
                    <div className={styles['slaveInfoPage-SlaveScheduleBox']}>
                        <div className={styles['slaveInfoPage-SlaveScheduleTitle']}> 고정근무시간 </div>
                        <div className={styles['slaveInfoPage-SlaveScheduleContentBox']} >
                            <div>요일 /  시간</div>
                            <div>월 : 09:00 ~ 18:00</div>
                            <div>화 : 09:00 ~ 18:00</div>
                            <div>수 : 09:00 ~ 18:00</div>
                            <div>목 : 09:00 ~ 18:00</div>
                            <div>금 : 09:00 ~ 18:00</div>
                            <div>토 : 09:00 ~ 18:00</div>
                            <div>일 : 09:00 ~ 18:00</div>
                        </div>
                    </div>
                </div>

                <div>
                    <div className={styles['slaveInfoPage-SlaveNothingBox']}>
                        <div className={styles['slaveInfoPage-SlaveNothingTitle']}> 임시제목 </div>
                        <div className={styles['slaveInfoPage-SlaveNothingContentBox']}> 임시내용 </div>
                    </div>
                </div>

            </div>

            <div className={styles['slaveInfoPage-BottomBox']} >
                <div className={styles['slaveInfoPage-BottomTitle']}> 근태정보 </div>
                <SlaveInfoPageCommuteList />
            </div>
        </div>
    </>
  )
}

export default SlaveInfoPage
