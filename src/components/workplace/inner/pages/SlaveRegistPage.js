import React, { useState } from "react";
import styles from './SlaveRegistPage.module.scss'
import { Link } from "react-router-dom";
import SlaveRegisterModal from "./SlaveRegisterModal";

const SlaveRegistPage = () => {

    const fixedDayHandler = e => {}

    // const selectSchedule = 

    // 근무시간선택 --> 변동시간을 선택한 경우 상태값 관리
    const [variableDay, setVariableDay] = useState('');

    // 변동시간 클릭이벤트
    const variableDayHandler = e => {


        // 변동시간 스타일 변경
        // const cn = 'card ' + styleName;

        // 변동시간 선택 모달창 생성
        setVariableDay(true);
        
    }

    const closeSlaveRegisterModalHandler = e => {
        console.log('닫기닫기');
        setVariableDay(false);
    }
    return (
        <>
            <div className={styles['slaveRegistPage']}>

                <div className={styles['slaveRegistPageHeader-box']}>
                    직원등록
                </div>

                <form className={styles['slaveRegistPageForm-box']}>

                    <div className={styles['slaveRegistPageForm-top']}>
                        
                        <div className={styles['slaveRegistPageForm-left']}>
                            <div className={styles['slaveRegistPageInput-box']}>
                                <div className={styles['slaveRegistPageInput-title']}>이름</div>
                                <input className={styles['slaveRegistPageInput-input']} />
                            </div>
                            <div className={styles['slaveRegistPageInput-box']}>
                                <div className={styles['slaveRegistPageInput-title']}>전화번호</div>
                                <input className={styles['slaveRegistPageInput-input']}/>
                            </div>
                            <div className={styles['slaveRegistPageInput-box']}>
                                <div className={styles['slaveRegistPageInput-title']}>생년월일</div>
                                <input type="date" className={styles['slaveRegistPageInput-input']}/>
                            </div>

                            <div className={styles['slaveRegistPageInput-box']}>
                                <div className={styles['slaveRegistPageInput-title']}>직책</div>
                                <input className={styles['slaveRegistPageInput-input']} />
                            </div>

                            <div className={`${styles['slaveRegistPageInput-box']} ${styles.slaveRegistDown}`}>
                                <div className={styles['slaveRegistPageInput-title']}>급여정보</div>
                                <div className={styles['slaveRegistPageInputWage-box']} >
                                    <div className={styles['slaveRegistPageInputWage-content']} >
                                        <div className={styles['slaveRegistPageInputWage-title']}>시급</div>
                                        <input type="checkbox" style={{ display: 'none' }}/>

                                        <div className={styles['slaveRegistPageInputWage-title']}>월급</div>
                                        <input type="checkbox" style={{ display: 'none' }}/>
                                    </div>

                                    <div className={styles['slaveRegistPageInputWage-content']} >
                                        <div>시급</div>
                                        <input className={styles['slaveRegistPageInputWage-input']}/>
                                        <div>원</div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles['slaveRegistPageInput-box']}>
                                <div className={styles['slaveRegistPageInput-title']}>4대보험여부</div>

                                <div className={styles['slaveRegistPageInputTax-box']} >
                                    <div className={styles['slaveRegistPageInputTax-content']} >
                                        <div className={styles['slaveRegistPageInputTax-title']}>적용</div>
                                        <input type="checkbox" className={styles['slaveRegistPageInputTax-input']}/>
                                    </div>
                                    <div className={styles['slaveRegistPageInputTax-content']} >
                                        <div className={styles['slaveRegistPageInputTax-title']}>적용안함</div>
                                        <input type="checkbox" className={styles['slaveRegistPageInputTax-input']}/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={styles['slaveRegistPageForm-middle']}></div>

                        <div className={styles['slaveRegistPageForm-right']}>

                            <div className={`${styles['slaveRegistPageSchedule-box']} ${styles.slaveRegistDown}`}>
                                <div className={styles['slaveRegistPageInput-title']}>근무시간선택</div>
                                <div className={styles['slaveRegistPageInputScheduleTitle-box']} >
                                    <div className={styles['slaveRegistPageInputSchedule-title']}>고정시간</div>
                                    <input onClick={fixedDayHandler} type="checkbox" style={{ display: 'none' }}/>
                                    <div onClick={variableDayHandler} className={styles['slaveRegistPageInputSchedule-title']}>변동시간</div>
                                    <input type="checkbox" style={{ display: 'none' }}/>
                                </div>


                                {variableDay && <SlaveRegisterModal onCloseSlaveRegisterModal={closeSlaveRegisterModalHandler} />}
                            </div>


                            
                            
                        </div>
                    </div>

                    <div className={styles['slaveRegistPageForm-bottom']}>
                        <div className={styles['slaveRegistPageButton-box']}>
                            <Link to="/detail/slave-manage" className={styles['link-text']}> 
                            <button className={styles['slaveRegistPage-button']} > 취소 </button>
                            </Link>
                            <button className={styles['slaveRegistPage-button']}>등록</button>
                        </div>
                    </div>

                </form>

                
            </div>
        </>
    );
};

export default SlaveRegistPage;