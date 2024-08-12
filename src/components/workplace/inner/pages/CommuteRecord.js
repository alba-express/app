import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from './CommuteRecord.module.scss'; // 모듈 스타일을 가져옵니다.

const Modal = ({ show, onClose, onConfirm, message }) => {
    if (!show) return null; // 모달이 보이지 않으면 아무것도 렌더링하지 않음

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <div>{message}</div>
                <div className={styles.modalButtons}>
                    <button onClick={onConfirm} className={styles.confirmButton}>확인</button>
                    <button onClick={onClose} className={styles.cancelButton}>취소</button>
                </div>
            </div>
        </div>
    );
};

const CommuteRecord = () => {
    const location = useLocation(); // 현재 URL의 상태를 추적하는 location 객체 사용
    const navigate = useNavigate(); // 다른 페이지로 이동하기 위한 네비게이션 훅
    const [slaveId, setSlaveId] = useState(null); // 직원의 ID 상태 관리
    const [logId, setLogId] = useState(''); // 출퇴근 로그 ID 상태 관리
    const [errorMessage, setErrorMessage] = useState(''); // 오류 메시지 상태 관리
    const [isCheckedIn, setIsCheckedIn] = useState(false); // 출근 상태를 추적
    const [hasCheckedOut, setHasCheckedOut] = useState(false); // 퇴근 상태를 추적
    const [isComplete, setIsComplete] = useState(false); // 출퇴근 완료 상태를 추적
    const [serverTime, setServerTime] = useState(null); // 서버 시간을 저장할 상태, Date 객체로 저장
    const [showModal, setShowModal] = useState(false); // 모달의 표시 여부 상태
    const [modalAction, setModalAction] = useState(null); // 모달에서 수행할 작업 ('checkIn' 또는 'checkOut')

    // 컴포넌트가 처음 마운트될 때 실행되는 useEffect
    useEffect(() => {
        if (location.state && location.state.slaveId) {
            setSlaveId(location.state.slaveId); // slaveId를 상태로 설정
        } else {
            navigate('/'); // slaveId가 없으면 메인 페이지로 리다이렉트
        }
    }, [location.state, navigate]);

    // 서버에서 현재 로그와 서버 시간을 가져오는 함수
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

        const fetchServerTime = async () => {
            try {
                const response = await fetch('http://localhost:8877/schedule/server-time');
                if (response.ok) {
                    const data = await response.json();
                    setServerTime(new Date(data)); // 서버 시간을 Date 객체로 변환하여 상태에 저장
                }
            } catch (error) {
                console.error('Failed to fetch server time:', error);
            }
        };

        if (slaveId) {
            fetchCurrentLog(); // 출근 기록을 가져옴
        }

        fetchServerTime(); // 서버 시간을 가져오는 함수 호출
    }, [slaveId]);

    // 출근 및 퇴근 상태에 따라 출퇴근 완료 상태를 설정
    useEffect(() => {
        if (isCheckedIn && hasCheckedOut) {
            setIsComplete(true); // 출근과 퇴근이 모두 완료되었을 때 출퇴근 완료로 설정
        }
    }, [isCheckedIn, hasCheckedOut]);

    // 서버 시간을 실시간으로 업데이트하는 useEffect
    useEffect(() => {
        let interval;
        if (serverTime) {
            interval = setInterval(() => {
                setServerTime(prevTime => new Date(prevTime.getTime() + 1000)); // 1초씩 시간 증가
            }, 1000); // 1초마다 실행
        }
        return () => clearInterval(interval); // 컴포넌트가 언마운트될 때 인터벌 제거
    }, [serverTime]);

    // 출근 버튼 클릭 시 호출되는 함수
    const handleCheckIn = () => {
        setModalAction('checkIn'); // 모달에서 출근 작업을 수행할 것임을 설정
        setShowModal(true); // 모달 표시
    };

    // 퇴근 버튼 클릭 시 호출되는 함수
    const handleCheckOut = () => {
        setModalAction('checkOut'); // 모달에서 퇴근 작업을 수행할 것임을 설정
        setShowModal(true); // 모달 표시
    };

    // 모달의 확인 버튼 클릭 시 호출되는 함수
    const handleConfirm = async () => {
        setShowModal(false); // 모달 닫기

        try {
            if (modalAction === 'checkIn') {
                if (!slaveId) {
                    setErrorMessage('Error: slaveId가 설정되지 않았습니다.');
                    return;
                }
                if (isCheckedIn) {
                    setErrorMessage('이미 출근 처리되었습니다.');
                    return;
                }
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
            } else if (modalAction === 'checkOut') {
                if (!logId) {
                    setErrorMessage('Error: 로그 ID가 설정되지 않았습니다.');
                    return;
                }
                if (hasCheckedOut) {
                    setErrorMessage('이미 퇴근 처리되었습니다.');
                    return;
                }
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
            }
        } catch (error) {
            setErrorMessage(error.message || '처리 중 오류가 발생했습니다.');
        }
    };

    // 모달의 취소 버튼 클릭 시 호출되는 함수
    const handleClose = () => {
        setShowModal(false); // 모달 닫기
    };

    // 모달 메시지 설정 함수
    const getModalMessage = () => {
        if (modalAction === 'checkIn') {
            return `현재시간: ${serverTime ? serverTime.toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '로딩 중...'} 으로 출근하시겠습니까?`;
        } else if (modalAction === 'checkOut') {
            return `현재시간: ${serverTime ? serverTime.toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '로딩 중...'} 으로 퇴근하시겠습니까?`;
        }
        return ''; // 기본 메시지
    };

    return (
        <div className={styles.contentBox}>
            <div className={styles.title}>직원 출퇴근 기록 페이지</div>
            {/* 서버 시간 출력, 시:분:초만 표시, 24시간 형식 */}
            <div className={styles.serverTime}>현재 서버 시간: {serverTime ? serverTime.toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }) : '로딩 중...'}</div>
            <div className={styles.buttonContainer}>
                {isComplete ? (
                    <div>출퇴근 처리가 완료되었습니다.</div> // 출퇴근 완료 메시지
                ) : (
                    <>
                        <button onClick={handleCheckIn} disabled={isCheckedIn} className={styles.checkButton}>출근</button>
                        <button onClick={handleCheckOut} disabled={!isCheckedIn || hasCheckedOut} className={styles.checkButton}>퇴근</button>
                    </>
                )}
            </div>
            {errorMessage && <div className={styles.validationMessage}>{errorMessage}</div>} {/* 오류 메시지 출력 */}
            {/* 모달 컴포넌트 */}
            <Modal show={showModal} onClose={handleClose} onConfirm={handleConfirm} message={getModalMessage()} />
        </div>
    );
};

export default CommuteRecord;
