import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CommuteRecord = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [slaveId, setSlaveId] = useState(null);
    const [logId, setLogId] = useState(''); // 로그 ID 상태 추가
    const [errorMessage, setErrorMessage] = useState(''); // 에러 메시지 상태 추가

    useEffect(() => {
        // 상태에서 slaveId를 가져옵니다.
        if (location.state && location.state.slaveId) {
            setSlaveId(location.state.slaveId);
        } else {
            // slaveId가 없는 경우, 적절히 처리합니다.
            navigate('/'); // 예를 들어, 홈으로 이동
        }
    }, [location.state, navigate]);

    const checkIn = async () => {
        if (!slaveId) {
            setErrorMessage('Error: slaveId가 설정되지 않았습니다.');
            return;
        }
        try {
            const payload = { slaveId };
    
            const response = await fetch(`http://localhost:8877/schedule/checkin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Check-in 성공:', data);
                setLogId(data.id); // check-in 응답으로부터 id 저장
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || '서버 오류');
            }
        } catch (error) {
            console.error('Check-in Error:', error.message);
            setErrorMessage(error.message || '출근 처리 중 오류가 발생했습니다.');
        }
    };

    const checkOut = async () => {
        if (!logId) {
            setErrorMessage('Error: 로그 ID가 설정되지 않았습니다.');
            return;
        }
        try {
            const response = await fetch(`http://localhost:8877/schedule/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ logId })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Check-out 성공:', data);
                setLogId(''); // 로그 ID를 초기화하여 두 버튼 모두 비활성화
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || '서버 오류');
            }
        } catch (error) {
            console.error('Check-out Error:', error.message);
            setErrorMessage(error.message || '퇴근 처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            <div>직원 출퇴근 기록 페이지</div>
            <div>
                <button onClick={checkIn} disabled={!!logId}>출근</button>
                <button onClick={checkOut} disabled={!logId}>퇴근</button>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>} {/* 에러 메시지 표시 */}
            </div>
        </>
    );
};

export default CommuteRecord;
