import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WorkplacePwdVerify = () => {
    const [workplacePassword, setWorkplacePassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const workplaceIdByStore = localStorage.getItem('workplaceId');

    const workplacePwdVerifyHandler = (event) => {
        setWorkplacePassword(event.target.value);
    };

    console.log('등록된 사업장 간편비밀번호: ', workplacePassword);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('사업장 간편비밀번호: ', workplacePassword);
        
        try {
            const response = await axios.post(`http://localhost:8877/workplace/verify/${workplacePassword}`, { password: workplacePassword });

            if (response.data.valid) {
                navigate('/detail'); // 비밀번호가 맞으면 InnerMainPage로 이동
            } else {
                setError('비밀번호가 올바르지 않습니다.');
            }
        } catch (error) {
            console.error('Error verifying password:', error);
            setError('비밀번호 검증 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            <h1>해당 사업장의 간편비밀번호를 입력하세요.</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="password">간편비밀번호</label>
                    <input
                        type="text"
                        id="workplacePassword"
                        value={workplacePassword}
                        onChange={workplacePwdVerifyHandler}
                        required
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">확인</button>
            </form>
        </>
    );
};

export default WorkplacePwdVerify;
