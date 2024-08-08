import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CommuteRecord = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [slaveId, setSlaveId] = useState(null);
    const [logId, setLogId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isCheckedIn, setIsCheckedIn] = useState(false); // 출근 상태를 추적하는 상태 추가
    const [hasCheckedOut, setHasCheckedOut] = useState(false); // 퇴근 상태를 추적하는 상태 추가
    const [isComplete, setIsComplete] = useState(false); // 출퇴근 완료 상태를 추적하는 상태 추가

    useEffect(() => {
        if (location.state && location.state.slaveId) {
            setSlaveId(location.state.slaveId);
        } else {
            navigate('/');
        }
    }, [location.state, navigate]);

    useEffect(() => {
        const fetchCurrentLog = async () => {
            try {
                const response = await fetch(`http://localhost:8877/schedule/current-log?slaveId=${slaveId}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.id) {
                        setLogId(data.id);
                        setIsCheckedIn(true); // 출근 기록이 있으면 출근 상태로 설정
                        if (data.scheduleLogEnd) {
                            setHasCheckedOut(true); // 퇴근 기록이 있으면 퇴근 상태로 설정
                        }
                    }
                }
            } catch (error) {
                console.error('Failed to fetch current log:', error);
            }
        };

        if (slaveId) {
            fetchCurrentLog();
        }
    }, [slaveId]);

    useEffect(() => {
        // 출근 및 퇴근 상태에 따라 출퇴근 완료 상태를 설정
        if (isCheckedIn && hasCheckedOut) {
            setIsComplete(true);
        }
    }, [isCheckedIn, hasCheckedOut]);

    const checkIn = async () => {
        if (!slaveId) {
            setErrorMessage('Error: slaveId가 설정되지 않았습니다.');
            return;
        }
        if (isCheckedIn) {
            setErrorMessage('이미 출근 처리되었습니다.');
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
                setLogId(data.id);
                setIsCheckedIn(true); // 출근 상태로 설정
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || '서버 오류');
            }
        } catch (error) {
            setErrorMessage(error.message || '출근 처리 중 오류가 발생했습니다.');
        }
    };

    const checkOut = async () => {
        if (!logId) {
            setErrorMessage('Error: 로그 ID가 설정되지 않았습니다.');
            return;
        }
        if (hasCheckedOut) {
            setErrorMessage('이미 퇴근 처리되었습니다.');
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
                setLogId('');
                setIsCheckedIn(false); // 출근 상태 초기화
                setHasCheckedOut(true); // 퇴근 상태로 설정
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || '서버 오류');
            }
        } catch (error) {
            setErrorMessage(error.message || '퇴근 처리 중 오류가 발생했습니다.');
        }
    };

    return (
        <>
            <div>직원 출퇴근 기록 페이지</div>
            <div>
                {isComplete ? (
                    <div>출퇴근 처리가 완료되었습니다.</div> // 출퇴근 완료 메시지
                ) : (
                    <>
                        <button onClick={checkIn} disabled={isCheckedIn}>출근</button>
                        <button onClick={checkOut} disabled={!isCheckedIn || hasCheckedOut}>퇴근</button>
                    </>
                )}
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            </div>
        </>
    );
};

export default CommuteRecord;
