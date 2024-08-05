import React from "react";
import styles from './InnerHeader.module.scss';
import { Link, useNavigate } from "react-router-dom";
import { removeUserToken, getUserIdFromStorage } from '../../../../utils/auth';

const InnerHeader = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        removeUserToken();
        navigate('/login');
    };

    const handleRetire = async () => {
        const email = getUserIdFromStorage();
        if (!email) {
            alert("로그인 정보가 없습니다.");
            return;
        }

        try {
            const response = await fetch('http://localhost:8877/api/auth/retire', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                alert("회원 탈퇴가 완료되었습니다.");
                handleLogout();
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            alert('회원 탈퇴 중 오류가 발생했습니다.');
        }
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
