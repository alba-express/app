import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styles from './InnerNavi.module.scss';

const InnerNavi = () => {

    const workplaceId = localStorage.getItem('workplaceId');
    const [workplaceData, setWorkplaceData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8877/workplace/${workplaceId}`);
            const json = await response.json();
            setWorkplaceData(json);
        };
        fetchData();
    }, []);
    return (
        <div className={styles.fullScreen}>
            <Link to="/detail" className={`${styles['link-text']} ${styles['logo-box']}`}>
                <img src={`${process.env.PUBLIC_URL}/images/albunny_logo.png`} alt="Albunny Logo"/>
            </Link>
            <li className={styles['profile-box']}>
                <div className={styles.workplaceName}> {workplaceData.workplaceName} </div>
                {/*<div> 안녕하세요. </div>*/}
                <div className={styles.workplaceAddress}> {workplaceData.workplaceAddressStreet} {workplaceData.workplaceAddressDetail}</div>
            </li>

            <Link to="slave-manage" className={`${styles['link-text']} ${styles['leftMenu-box']}`}>
                <img src={`${process.env.PUBLIC_URL}/images/slave.png`} alt="Example"/>
                직원관리
            </Link>

            <Link to="wage-manage" className={`${styles['link-text']} ${styles['leftMenu-box']}`}>
                <img src={`${process.env.PUBLIC_URL}/images/wage.png`} alt="Example"/>
                급여관리
            </Link>

            <Link to="schedule-manage" className={`${styles['link-text']} ${styles['leftMenu-box']}`}>
                <img src={`${process.env.PUBLIC_URL}/images/schedule.png`} alt="Example"/>
                일정관리
            </Link>

            <Link to="notice" className={`${styles['link-text']} ${styles['leftMenu-box']}`}>
                <img src={`${process.env.PUBLIC_URL}/images/notice.png`} alt="Example"/>
                공지사항
            </Link>

            <Link to="commute-manage" className={`${styles['link-text']} ${styles['leftMenu-box']}`}>
                <img src={`${process.env.PUBLIC_URL}/images/commute.png`} alt="Example"/>
                출퇴근관리
            </Link>
        </div>
    );
};

export default InnerNavi;