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
                console.log('Login successful');
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
        <div className={styles.loginContainer}>
            <h1>로그인</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">아이디</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={handleChange(setEmail)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={handleChange(setPassword)}
                        required
                    />
                </div>
                <div>
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
                <button type="submit">로그인</button>
                {error && <p className={styles.error}>{error}</p>}
            </form>
            <div>
                <button onClick={handleSignUp}>회원가입</button>
                <button onClick={handleFindPassword}>비밀번호찾기</button>
            </div>
        </div>
    );
};

export default LoginMain;
