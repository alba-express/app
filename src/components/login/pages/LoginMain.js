import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LoginMain.module.scss";  // 수정된 경로

const LoginMain = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://your-backend-api-url/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error("Invalid credentials");
            }

            const data = await response.json();
            // 로그인 성공 후 처리
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div className={styles.container}>
            <h2>로그인</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div>
                    <label htmlFor="email">아이디</label>
                    <input
                        type="text"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        required
                    />
                </div>
                <div className={styles.checkboxContainer}>
                    <label>
                        <input type="checkbox" />
                        아이디 저장
                    </label>
                    <label>
                        <input type="checkbox" />
                        자동 로그인
                    </label>
                </div>
                {error && <p className={styles.error}>{error}</p>}
                <button type="submit" className={styles.button}>확인</button>
                <div className={styles.linkContainer}>
                    <button type="button" onClick={() => navigate("/login/sign-up")} className={styles.link}>
                        회원가입
                    </button>
                    <button type="button" onClick={() => navigate("/login/find-pw")} className={styles.link}>
                        비밀번호찾기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default LoginMain;
