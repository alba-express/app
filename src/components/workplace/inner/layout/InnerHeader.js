import React from "react";
import styles from './InnerHeader.module.scss';

const InnerHeader = () => {
    return (
        <div className={styles['headerButton-box']} >
            <div className={styles['headerNotice']} > 
              <img src={`${process.env.PUBLIC_URL}/images/master_notice.png`} alt="Example" /> 사장님 말씀 : 도비는 자유가 없어 
            </div>
            <button className={styles['headerButton']} > 사업장변경 </button>
            <button className={styles['headerButton']} > 로그아웃 </button>
        </div>
    );
};

export default InnerHeader;
