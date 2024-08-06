import React from "react";
import styles from './InnerHeader.module.scss';
import { Link, useNavigate } from "react-router-dom";
import { removeUserToken } from '../../../../utils/auth';

const InnerHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeUserToken();
        navigate('/login');
    };

    const handleRetire = () => {
        navigate('/login/retire');
    };

    return (
        <div className={styles['headerButton-box']} >
            <div className={styles['headerNotice']} >
                <img src={`${process.env.PUBLIC_URL}/images/master_notice.png`} alt="Example" /> 사장님 말씀 : 도비는 자유가 없어
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
