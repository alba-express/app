import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveUserToken, saveUserId } from '../../../utils/auth';
import styles from './LoginMain.module.scss';

const LoginMain = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [autoLogin, setAutoLogin] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleChange = (setter) => (event) => {
        setter(event.target.value);
    };

    const handleCheckboxChange = (setter) => (event) => {
        setter(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8877/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, rememberMe, autoLogin }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token; // 서버가 반환하는 토큰을 가져옴
                console.log('Received token:', token); // 디버깅 로그 추가
                saveUserToken(token, autoLogin); // autoLogin이 true면 로컬스토리지에 저장, false면 세션스토리지에 저장
                saveUserId(email); // 이메일 저장
                navigate('/workplace'); // 로그인 성공 시 /workplace로 이동
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to fetch');
        }
    };

    const handleSignUp = () => {
        navigate('/login/sign-up');
    };

    const handleFindPassword = () => {
        navigate('/login/find-pw');
    };

    return (
        <div className={styles.fullPageContainer}>
            <div className={styles.loginContainer}>
                <h1 className={styles.loginTitle}>로그인</h1>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputContainer}>
                        <label htmlFor="email" className={styles.inputLabel}>아이디</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleChange(setEmail)}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password" className={styles.inputLabel}>비밀번호</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={handleChange(setPassword)}
                            required
                            className={styles.inputField}
                        />
                    </div>
                    <div className={styles.checkboxContainer}>
                        <label>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={handleCheckboxChange(setRememberMe)}
                            />
                            아이디 저장
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={autoLogin}
                                onChange={handleCheckboxChange(setAutoLogin)}
                            />
                            자동 로그인
                        </label>
                    </div>
                    <button type="submit" className={styles.submitButton}>확인</button>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
                <div className={styles.additionalLinks}>
                    <button onClick={handleSignUp} className={styles.linkButton}>회원가입</button>
                    <button onClick={handleFindPassword} className={styles.linkButton}>비밀번호찾기</button>
                </div>
            </div>
        </div>
    );
};

export default LoginMain;
