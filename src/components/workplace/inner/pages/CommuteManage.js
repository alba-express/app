import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CommuteManage = () => {
    const [inputValue, setInputValue] = useState(""); // 입력된 값을 저장할 상태
    const [validationMessage, setValidationMessage] = useState(""); // 검증 결과 메시지를 저장할 상태
    const [employees, setEmployees] = useState([]); // 근무자 목록 상태
    const navigate = useNavigate(); // 내비게이션 훅

    useEffect(() => {
        // 근무자 목록을 가져오는 함수
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8877/schedule/employees');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json(); // JSON으로 응답을 처리합니다.
                setEmployees(data);
            } catch (error) {
                console.error('서버와의 통신 중 오류가 발생했습니다.', error);
                setValidationMessage("서버와의 통신 중 오류가 발생했습니다.");
            }
        };

        fetchEmployees(); // 컴포넌트가 마운트될 때 호출
    }, []);

    const handleInputChange = (event) => {
        setInputValue(event.target.value); // 입력 값을 상태에 저장
    };

    const handleCheck = async () => {
        const workplaceId = 1;
        try {
            const response = await fetch(`http://localhost:8877/schedule/verify-phone-number?phoneNumber=${inputValue}&workplaceId=${workplaceId}`);
            const data = await response.text(); // 문자열로 응답을 처리합니다.

            if (response.ok) {
                setValidationMessage("검증 성공!");
                navigate('/detail/commute-record', { state: { slaveId: data } }); // 상태 전달
            } else {
                setValidationMessage(data); // 실패 시 메시지 설정
            }
        } catch (error) {
            setValidationMessage("서버와의 통신 중 오류가 발생했습니다."); // 서버 오류 처리
        }
    };

    return (
        <>
            <div>출퇴근관리
                <div>금일 근무자
                    {employees.length > 0 ? (
                        employees.map(employee => (
                            <div key={employee.id}>
                                {employee.slaveName} - {employee.slavePosition}
                            </div>
                        ))
                    ) : (
                        <div>근무자 정보가 없습니다.</div>
                    )}
                </div>
                <div>전화번호
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="전화번호 입력"
                    />
                    <button onClick={handleCheck}>확인</button>
                </div>
                {validationMessage && <div>{validationMessage}</div>} {/* 검증 메시지 표시 */}
            </div>
        </>
    );
};

export default CommuteManage;
