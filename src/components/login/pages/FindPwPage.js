import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FindPwPage = () => {
    const [email, setEmail] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleVerificationCodeChange = (event) => {
        setVerificationCode(event.target.value);
    };

    const handleSendCode = async () => {
        try {
            const response = await fetch(`http://localhost:8877/api/auth/send-verification-code`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setIsEmailSent(true);
                setSuccessMessage("Verification code sent to your email.");
                setError("");
            } else {
                const data = await response.json();
                setError(data.message || "Failed to send verification code.");
                setSuccessMessage("");
            }
        } catch (error) {
            setError("Failed to send verification code.");
            setSuccessMessage("");
        }
    };

    const handleVerifyCode = async () => {
        try {
            const response = await fetch("http://localhost:8877/api/auth/verify-code", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, code: verificationCode }),
            });

            if (response.ok) {
                const result = await response.json();
                if (result) {
                    navigate("/login/modify-pw", { state: { email } });
                } else {
                    setError("Invalid verification code.");
                }
            } else {
                const data = await response.json();
                setError(data.message || "Failed to verify code.");
            }
        } catch (error) {
            setError("Failed to verify code.");
        }
    };

    return (
        <div>
            <h1>비밀번호 찾기</h1>
            <div>
                <label>이메일:</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    disabled={isEmailSent}
                    required
                />
                <button type="button" onClick={handleSendCode} disabled={isEmailSent}>
                    {isEmailSent ? "인증코드 전송 완료" : "인증코드 전송"}
                </button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
            </div>
            {isEmailSent && (
                <div>
                    <label>인증코드:</label>
                    <input
                        type="text"
                        value={verificationCode}
                        onChange={handleVerificationCodeChange}
                        required
                    />
                    <button type="button" onClick={handleVerifyCode}>
                        인증코드 확인
                    </button>
                </div>
            )}
        </div>
    );
};

export default FindPwPage;
