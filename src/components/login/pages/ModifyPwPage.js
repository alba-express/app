import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ModifyPwPage = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("비밀번호가 일치하지 않습니다.");
            return;
        }

        const userData = {
            email,
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

            const data = await response.json();
            console.log("비밀번호 변경 성공:", data);
            setSuccessMessage("비밀번호가 성공적으로 변경되었습니다.");
            setErrorMessage("");
            navigate("/login");
        } catch (error) {
            console.error("비밀번호 변경 오류:", error);
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
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>비밀번호 확인:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    {password !== confirmPassword && (
                        <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>
                    )}
                </div>
                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                <button type="submit" disabled={!email}>비밀번호 변경</button>
            </form>
        </div>
    );
};

export default ModifyPwPage;
