import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './ModifyPwPage.module.scss';

const ModifyPwPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const validatePassword = (password) => {
        return password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/g.test(password);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setPasswordValid(validatePassword(event.target.value));
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setPasswordMatch(event.target.value === password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!passwordValid || !passwordMatch) {
            return;
        }

        try {
            const response = await fetch("http://localhost:8877/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                alert("비밀번호 수정이 완료되었습니다.");
                navigate("/login");
            } else {
                const data = await response.json();
                alert(data.message || "Failed to reset password.");
            }
        } catch (error) {
            alert("Failed to reset password.");
        }
    };

    return (
        <div>
            <h1>비밀번호 변경</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>새 비밀번호:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    {!passwordValid && <p style={{ color: "red" }}>비밀번호는 8자 이상이며 특수문자를 포함해야 합니다.</p>}
                </div>
                <div>
                    <label>새 비밀번호 확인:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    {!passwordMatch && <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>}
                </div>
                <button type="submit" disabled={!passwordValid || !passwordMatch}>확인</button>
            </form>
        </div>
    );
};

export default ModifyPwPage;
