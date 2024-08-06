import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { removeUserToken } from '../../../utils/auth';
import ConfirmRetireModal from './ConfirmRetireModal'; // 모달 컴포넌트 import

const RetirePage = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleConfirmRetire = async () => {
        const email = localStorage.getItem('userId') || sessionStorage.getItem('userId');
        if (!email) {
            setError('No email found in storage');
            return;
        }

        try {
            const response = await fetch('http://localhost:8877/api/auth/retire', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                alert("회원 탈퇴가 완료되었습니다.");
                removeUserToken();
                navigate('/login'); // 탈퇴 후 로그인 페이지로 이동
            } else {
                const data = await response.json();
                setError(data.message);
            }
        } catch (error) {
            setError('Failed to fetch');
        }
    };

    return (
        <div>
            <h1>회원 탈퇴</h1>
            <form onSubmit={handleSubmit}>
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
                {error && <p>{error}</p>}
                <button type="submit">회원 탈퇴</button>
            </form>
            {isModalOpen && (
                <ConfirmRetireModal
                    onClose={handleCloseModal}
                    onConfirm={handleConfirmRetire}
                />
            )}
        </div>
    );
};

export default RetirePage;
