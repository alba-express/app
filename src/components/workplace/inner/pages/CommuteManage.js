import React, { useState, useEffect } from "react";
import styles from './CommuteManage.module.scss'; // CSS 모듈 import
import { useNavigate } from "react-router-dom";

const CommuteManage = () => {
    const [inputValue, setInputValue] = useState("");
    const [validationMessage, setValidationMessage] = useState("");
    const [employees, setEmployees] = useState([]);
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

    return (
        <div>
            <div className={styles['title']}>출퇴근 관리</div>
            <div className={styles['content-box']}>
                <div className={styles['employee-list-container']}>
                    <div className={styles['employee-list']}>
                        <div className={styles['employee-item-header']}>
                            <div className={styles['employee-item-name']}>이름 & 직책</div>
                            <div className={styles['employee-item-time']}>근무시간</div>
                        </div>
                        {employees.length > 0 ? (
                            employees.map(employee => (
                                <div key={employee.id} className={styles['employee-item']}>
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
                    <div className={styles['input-section']}>
                        <div className={styles['input-label']}></div>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={handleInputChange}
                            placeholder="전화번호 입력"
                            className={styles['input-field']}
                        />
                        <button onClick={handleCheck} className={styles['check-button']}>확인</button>
                        {validationMessage && <div className={styles['validation-message']}>{validationMessage}</div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommuteManage;
