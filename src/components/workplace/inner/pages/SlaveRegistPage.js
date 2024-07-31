import React from "react";
import styles from './SlaveRegistPage.module.scss'

const SlaveRegistPage = () => {
    return (
        <>
            <div className={styles['slaveRegistPage']}>

                <div className={styles['slaveRegistPageHeader-box']}>
                    직원등록
                </div>

                <form className={styles['slaveRegistPageForm-box']}>
                    <div className={styles['slaveRegistPageInput-box']}>
                        <div>이름</div>
                        <input />
                    </div>
                    <div className={styles['slaveRegistPageInput-box']}>
                        <div>전화번호</div>
                        <input />
                    </div>
                    <div className={styles['slaveRegistPageInput-box']}>
                        <div>생년월일</div>
                        <input />
                    </div>
                    <div className={styles['slaveRegistPageInput-box']}>
                        <div>근무요일시간</div>
                        <input />
                    </div>
                    <div className={styles['slaveRegistPageInput-box']}>
                        <div>급여정보</div>
                        <input />
                    </div>
                    <div className={styles['slaveRegistPageInput-box']}>
                        <div>
                            <input />
                            <div>4대보험</div>
                        </div>
                        <div>
                            <input />
                            <div>적용안함</div>
                        </div>
                    </div>
                    <button>취소</button>
                    <button>등록</button>
                </form>

                
            </div>
        </>
    );
};

export default SlaveRegistPage;
