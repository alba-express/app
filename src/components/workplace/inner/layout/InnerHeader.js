import React from "react";
import styles from './InnerHeader.module.scss';
import { Link, useNavigate } from "react-router-dom";
import { removeUserToken } from '../../../../utils/auth';
import {useSelector} from "react-redux";

const InnerHeader = () => {

    const notices = useSelector(state => state.notice.noticeList);

    const navigate = useNavigate();

    const handleLogout = () => {
        removeUserToken();
        navigate('/login');
    };

    const handleRetire = () => {
        navigate('/login/retire');
    };

    const NoticeModalHandler = () => {
        navigate()
    };

    return (
        <div className={styles['headerButton-box']} >
            <div className={styles['headerNotice']} onClick={NoticeModalHandler}>
                <img src={`${process.env.PUBLIC_URL}/images/master_notice.png`} alt="Example" /> {notices[0].title}
            </div>
            <Link to="/workplace" className={styles['link-text']}>
                <button className={styles['headerButton']}>사업장변경</button>
            </Link>
            <button className={styles['headerButton']} onClick={handleLogout}>로그아웃</button>
            <button className={styles['headerButton']} onClick={handleRetire}>회원 탈퇴</button>
        </div>
    );
};

export default InnerHeader;
