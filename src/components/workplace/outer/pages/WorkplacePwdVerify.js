import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './WorkplacePwdVerify.module.scss'; 

const WorkplacePwdVerify = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const workplaceId = localStorage.getItem('workplaceId');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`http://localhost:8877/workplace/verify/${workplaceId}`, { password });
            const { valid } = response.data;

            if (valid) {
                // 검증 완료 후 상태를 로컬 스토리지에 저장
                localStorage.setItem('passwordVerified', 'true');
                // 이동할 페이지 결정할 액션 불러오기 !
                const action = localStorage.getItem('action');
                navigate(action, { replace: true });

                // 비밀번호 검증 후 페이지 이동 조건문
                if (action === 'modify') {
                    navigate('/workplace/modify', { replace: true }); // 수정 페이지로 이동
                } else {
                    navigate('/detail', { replace: true }); // 기본 업장 메인페이지로 이동
                } 

                // 비밀번호 검증 페이지 방문 기록 삭제
                localStorage.removeItem('action');

            } else {
                setError('간편 비밀번호가 일치하지 않습니다.');
            }
        } catch (error) {
            console.error('Error verifying password:', error);
            setError('비밀번호 검증 중 오류가 발생했습니다.');
        }
    };

    const cancelHandler = () => {
        window.location.href = '/workplace';
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h1 className={styles.header1}>간편 비밀번호 검증</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="password">간편 비밀번호:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitButton}>확인</button>
                        <button type="button" onClick={cancelHandler} className={styles.cancelButton}>취소</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


export default WorkplacePwdVerify;
