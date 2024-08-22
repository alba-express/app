import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import styles from './InnerNavi.module.scss';
import { useSelector } from "react-redux";

const InnerNavi = () => {

    const workplaceId = localStorage.getItem('workplaceId');
    const [workplaceData, setWorkplaceData] = useState({});
    const currentPage = useSelector(state => state.workplace.currentPage);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8877/workplace/${workplaceId}`);
            const json = await response.json();
            setWorkplaceData(json);
        };
        fetchData();
    }, []);
    const detailHandler = (e) => {
        e.preventDefault();
        if(currentPage !== 5) {
            navigate("/detail")
        } else {
            localStorage.setItem('action', 'detail');
            navigate('/workplace/pwdverify');
        }
      };
    const slaveHandler = (e) => {
        e.preventDefault();
        if(currentPage !== 5) {
            navigate("slave-manage")
        } else {
            localStorage.setItem('action', 'slave');
            navigate('/workplace/pwdverify');
        }
      };
    const wageHandler = (e) => {
        e.preventDefault();
        if(currentPage !== 5) {
            navigate("wage-manage")
        } else {
            localStorage.setItem('action', 'wage');
            navigate('/workplace/pwdverify');
        }
      };
    const scheduleHandler = (e) => {
        e.preventDefault();
        if(currentPage !== 5) {
            navigate("schedule-manage")
        } else {
            localStorage.setItem('action', 'schedule');
            navigate('/workplace/pwdverify');
        }
      };
    const noticeHandler = (e) => {
        e.preventDefault();
        if(currentPage !== 5) {
            navigate("notice")
        } else {
            localStorage.setItem('action', 'notice');
            navigate('/workplace/pwdverify');
        }
      };
    return (
        <div className={styles.fullScreen}>
            <a className={`${styles['link-text']} ${styles['logo-box']}`} onClick={detailHandler}>
                <img src={`${process.env.PUBLIC_URL}/images/albunny_logo.png`} alt="Albunny Logo"/>
            </a>
            <li className={styles['profile-box']}>
                <div className={styles.workplaceName}> {workplaceData.workplaceName} </div>
                {/*<div> 안녕하세요. </div>*/}
                <div className={styles.workplaceAddress}> {workplaceData.workplaceAddressStreet} {workplaceData.workplaceAddressDetail}</div>
            </li>

            <a className={`${styles['link-text']} ${styles['leftMenu-box']}`} onClick={slaveHandler}>
                <img src={`${process.env.PUBLIC_URL}/images/slave.png`} alt="Example"/>
                직원관리
            </a>

            <a className={`${styles['link-text']} ${styles['leftMenu-box']}`} onClick={wageHandler}>
                <img src={`${process.env.PUBLIC_URL}/images/wage.png`} alt="Example"/>
                급여관리
            </a>

            <a className={`${styles['link-text']} ${styles['leftMenu-box']}`} onClick={scheduleHandler}>
                <img src={`${process.env.PUBLIC_URL}/images/schedule.png`} alt="Example"/>
                일정관리
            </a>

            <a className={`${styles['link-text']} ${styles['leftMenu-box']}`} onClick={noticeHandler}>
                <img src={`${process.env.PUBLIC_URL}/images/notice.png`} alt="Example"/>
                공지사항
            </a>

            <Link to="commute-manage" className={`${styles['link-text']} ${styles['leftMenu-box']}`}>
                <img src={`${process.env.PUBLIC_URL}/images/commute.png`} alt="Example"/>
                출퇴근관리
            </Link>
        </div>
    );
};

export default InnerNavi;