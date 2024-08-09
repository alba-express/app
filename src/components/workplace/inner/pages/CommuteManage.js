import React, { useState, useEffect, useRef } from "react";
import styles from './CommuteManage.module.scss'; // CSS 모듈 import
import { useNavigate } from "react-router-dom";

const CommuteManage = () => {
    const [inputValue, setInputValue] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const [employees, setEmployees] = useState([]);
    const [showInput, setShowInput] = useState(false); // 인풋창 표시 여부 상태
    const inputTimeoutRef = useRef(null); // 타이머를 저장할 ref
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch("http://localhost:8877/schedule/employees");
                const data = await response.json();
                setEmployees(data);
            } catch (error) {
                console.error("Failed to fetch employees:", error);
                setValidationMessage("서버와의 통신 중 오류가 발생했습니다.");
            }
        };

        fetchEmployees();
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);

        // 인풋창이 사라지지 않도록 타이머 리셋
        if (inputTimeoutRef.current) {
            clearTimeout(inputTimeoutRef.current);
        }
    };

    const handleCheck = async () => {
        if (!inputValue.trim()) {
            setValidationMessage("전화번호를 입력해 주세요.");
            return;
        }

        const workplaceId = 1;
        try {
            const response = await fetch(`http://localhost:8877/schedule/verify-phone-number?phoneNumber=${inputValue}&workplaceId=${workplaceId}`);
            const data = await response.text();

            if (response.ok) {
                setValidationMessage("검증 성공!");
                navigate('/detail/commute-record', { state: { slaveId: data } });
            } else {
                setValidationMessage(data);
            }
        } catch (error) {
            setValidationMessage("서버와의 통신 중 오류가 발생했습니다.");
        }
    };

    const handleEmployeeClick = () => {
        setShowInput(true); // 인풋창 표시

        // 인풋창을 5초 후에 숨기지만, 기존 타이머는 리셋
        if (inputTimeoutRef.current) {
            clearTimeout(inputTimeoutRef.current);
        }

        inputTimeoutRef.current = setTimeout(() => {
            setShowInput(false);
        }, 5000);
    };

    const handleInputFocus = () => {
        // 인풋 필드에 포커스하면 타이머를 멈춤
        if (inputTimeoutRef.current) {
            clearTimeout(inputTimeoutRef.current);
        }
    };

    const handleInputBlur = () => {
        // 인풋 필드에서 포커스가 벗어나면 타이머 재시작
        inputTimeoutRef.current = setTimeout(() => {
            setShowInput(false);
        }, 5000);
    };

    return (
        <div>
            <div className={styles['title']}>출퇴근 관리</div>
            <div className={styles['content-box']}>
                <div className={styles['employee-list-title']}>직원목록</div> {/* 스타일이 적용된 제목 */}
                <div className={styles['employee-list-container']}>
                    <div className={styles['employee-list']}>
                        <div className={styles['employee-item-header']}>
                            <div className={styles['employee-item-name']}>이름 & 직책</div>
                            <div className={styles['employee-item-time']}>근무시간</div>
                        </div>
                        {employees.length > 0 ? (
                            employees.map(employee => (
                                <div 
                                    key={employee.id} 
                                    className={styles['employee-item']}
                                    onClick={handleEmployeeClick} // 클릭 이벤트 핸들러
                                >
                                    <div className={styles['employee-item-name']}>
                                        {employee.slaveName} ({employee.slavePosition})
                                    </div>
                                    <div className={styles['employee-item-time']}>
                                        {employee.scheduleStart} ~ {employee.scheduleEnd}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>근무자 정보가 없습니다.</div>
                        )}
                    </div>
                    {showInput && ( // showInput 상태에 따라 인풋창을 조건부로 렌더링
                        <div className={styles['input-section']}>
                            <div className={styles['input-label']}></div>
                            <input
                                type="text"
                                value={inputValue}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus} // 포커스 시 타이머 중지
                                onBlur={handleInputBlur} // 포커스 해제 시 타이머 재시작
                                placeholder="전화번호 입력"
                                className={styles['input-field']}
                            />
                            <button onClick={handleCheck} className={styles['check-button']}>확인</button>
                            {validationMessage && <div className={styles['validation-message']}>{validationMessage}</div>}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommuteManage;
