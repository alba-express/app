import React, { useState, useEffect } from "react";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [verificationCode, setVerificationCode] = useState("");
    const [isEmailVerified, setIsEmailVerified] = useState(false);
    const [isVerificationSent, setIsVerificationSent] = useState(false);
    const [timer, setTimer] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [passwordValid, setPasswordValid] = useState(true);
    const [passwordMatch, setPasswordMatch] = useState(true);

    const validatePassword = (password) => {
        return password.length >= 8 && /[!@#$%^&*(),.?":{}|<>]/g.test(password);
    };

    const handleEmailCheck = async () => {
        try {
            const response = await fetch(`http://localhost:8877/api/auth/check-email?email=${email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            setIsVerificationSent(true);
            setSuccessMessage("인증코드가 이메일로 전송되었습니다.");
            setErrorMessage("");
            setTimer(300); // 5분 타이머 설정
        } catch (error) {
            setErrorMessage(error.message);
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

            const result = await response.json();
            if (result) {
                setIsEmailVerified(true);
                setSuccessMessage("이메일 인증이 완료되었습니다.");
                setErrorMessage("");
                setTimer(0); // 인증 완료 시 타이머 종료
            } else {
                throw new Error("잘못된 인증코드입니다.");
            }
        } catch (error) {
            setErrorMessage(error.message);
            setSuccessMessage("");
        }
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setPasswordMatch(false);
            return;
        }

        const userData = {
            email,
            password,
            name,
        };

        try {
            const response = await fetch("http://localhost:8877/api/auth/register", {
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
            console.log("회원가입 성공:", data);
            // 회원가입 성공 시 처리 로직
        } catch (error) {
            console.error("회원가입 오류:", error);
            setErrorMessage(error.message);
        }
    };

    useEffect(() => {
        if (timer > 0) {
            const intervalId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [timer]);

    return (
        <div>
            <h1>회원가입</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>이메일:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isEmailVerified}
                        required
                    />
                    <button type="button" onClick={handleEmailCheck} disabled={isVerificationSent}>
                        {isVerificationSent ? "인증코드 전송 완료" : "이메일 중복 확인"}
                    </button>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
                </div>
                {isVerificationSent && (
                    <div>
                        <label>인증코드:</label>
                        <input
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value)}
                            disabled={isEmailVerified}
                            required
                        />
                        <button type="button" onClick={handleVerifyCode} disabled={isEmailVerified}>
                            인증코드 확인
                        </button>
                        {timer > 0 && <p>{`남은 시간: ${Math.floor(timer / 60)}분 ${timer % 60}초`}</p>}
                        {timer === 0 && isVerificationSent && !isEmailVerified && (
                            <button type="button" onClick={handleEmailCheck}>
                                인증코드 재전송
                            </button>
                        )}
                    </div>
                )}
                <div>
                    <label>비밀번호:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordValid(validatePassword(e.target.value));
                        }}
                        required
                    />
                    {!passwordValid && <p style={{ color: "red" }}>비밀번호는 8자 이상이며 특수문자를 포함해야 합니다.</p>}
                </div>
                <div>
                    <label>비밀번호 확인:</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setPasswordMatch(e.target.value === password);
                        }}
                        required
                    />
                    {!passwordMatch && <p style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</p>}
                </div>
                <div>
                    <label>이름:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={!isEmailVerified || !passwordValid || !passwordMatch}>회원가입</button>
            </form>
        </div>
    );
};

export default SignUpPage;
