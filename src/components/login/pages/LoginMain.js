import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginMain.module.scss';

const LoginMain = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [autoLogin, setAutoLogin] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRememberMeChange = (event) => {
        setRememberMe(event.target.checked);
    };

    const handleAutoLoginChange = (event) => {
        setAutoLogin(event.target.checked);
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
                console.log('Login successful');
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

    return (
        <div className={styles.loginContainer}>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">아이디</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                </div>
                <div>
                    <label>
                        <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={handleRememberMeChange}
                        />
                        아이디 저장
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={autoLogin}
                            onChange={handleAutoLoginChange}
                        />
                        자동 로그인
                    </label>
                </div>
                <button type="submit">로그인</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
            <div>
                <button onClick={handleSignUp}>회원가입</button>
                <button>비밀번호찾기</button>
            </div>
        </div>
    );
};

export default LoginMain;
