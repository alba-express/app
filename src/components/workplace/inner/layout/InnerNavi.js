import React from "react";
import { Link } from "react-router-dom";
import styles from './InnerNavi.module.scss';

const InnerNavi = () => {
    return (
        <div className={styles.fullScreen}>
            <Link to="/detail" className={`${styles['link-text']} ${styles['logo-box']}`} >
                Alba Express  
            </Link>
                <li className={styles['profile-box']}>
                    <div> 사장님 안녕? 만나서반가워 </div>
                    <div> 로그인한 회원 정보 간단히 나중에 추가 </div>
                    <div> 비밀번호변경, 탈퇴 기능 나중에 추가 </div>
                </li>

                <Link to="slave-manage" className={`${styles['link-text']} ${styles['leftMenu-box']}`} > 
                    <img src={`${process.env.PUBLIC_URL}/images/slave.png`} alt="Example" />
                    직원관리
                </Link>

                <Link to="wage-manage" className={`${styles['link-text']} ${styles['leftMenu-box']}`} > 
                    <img src={`${process.env.PUBLIC_URL}/images/wage.png`} alt="Example" />
                    급여관리
                </Link>

                <Link to="schedule-manage" className={`${styles['link-text']} ${styles['leftMenu-box']}`} >
                    <img src={`${process.env.PUBLIC_URL}/images/schedule.png`} alt="Example" />
                    일정관리
                </Link>

                <Link to="notice" className={`${styles['link-text']} ${styles['leftMenu-box']}`} > 
                    <img src={`${process.env.PUBLIC_URL}/images/notice.png`} alt="Example" />
                    공지사항
                </Link>

                <Link to="commute-manage" className={`${styles['link-text']} ${styles['leftMenu-box']}`} > 
                    <img src={`${process.env.PUBLIC_URL}/images/commute.png`} alt="Example" />
                    출퇴근관리
                </Link>
        </div>
    );
};

export default InnerNavi;