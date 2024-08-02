import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

const ModifyPwPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
        return passwordRegex.test(password);
    };

    const debouncedValidate = useCallback(
        debounce((password, confirmPassword) => {
            setPasswordValid(validatePassword(password));
            setPasswordMatch(password === confirmPassword);
        }, 300),
        []
    );

    useEffect(() => {
        debouncedValidate(password, confirmPassword);
    }, [password, confirmPassword, debouncedValidate]);

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!passwordValid || !passwordMatch) {
            return;
        }

        const userData = {
            password,
        };

        try {
            const response = await fetch("http://localhost:8877/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            alert('비밀번호 수정이 완료되었습니다.');
            navigate('/login');
        } catch (error) {
            setErrorMessage(error.message);
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
                    <label>비밀번호 확인:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                    />
                    {!passwordMatch && <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>}
                </div>
                <button type="submit" disabled={!passwordValid || !passwordMatch}>비밀번호 변경</button>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            </form>
        </div>
    );
};

export default ModifyPwPage;
