import React, { useState, useEffect, useRef } from "react";
import styles from "./InnerMainPage.module.scss";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InnerMainPage = () => {
    const [workplaceInfo, setWorkplaceInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // 현재 월 (1~12)
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // 현재 연도
    const [selectedDate, setSelectedDate] = useState(new Date()); // 오늘 날짜로 초기화
    const [workingEmployees, setWorkingEmployees] = useState([]);
    const [notStartedEmployees, setNotStartedEmployees] = useState([]);
    const [offDutyEmployees, setOffDutyEmployees] = useState([]);
    const [miscEmployees, setMiscEmployees] = useState([]); // 기타 직원
    const [estimatedWages, setEstimatedWages] = useState(0); // 총 급여
    const [employeeWages, setEmployeeWages] = useState([]); // 직원별 급여
    const workplaceIdByStore = localStorage.getItem('workplaceId');

    // 날짜 포맷 함수
    const formatDate = (date) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric', weekday: 'long' };
        return date.toLocaleDateString('ko-KR', options);
    };

    // DatePicker의 ref 생성
    const datePickerRef = useRef(null);

    useEffect(() => {
        const fetchWorkplaceInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8877/workplace/${workplaceIdByStore}`);
                const workplace = response.data;
                if (workplace) {
                    setWorkplaceInfo(workplace);
                } else {
                    console.error('업장 아이디를 찾지 못함.');
                    alert('업장 정보를 가져오는데 실패했습니다.');
                }
            } catch (error) {
                console.error('사업장 정보 페치 오류:', error);
                alert('업장 정보를 가져오는데 실패했습니다.');
            } finally {
                setLoading(false);
            }
        };

        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`http://localhost:8877/schedule/employees?workplaceId=${workplaceIdByStore}`);
                const employees = response.data;
                const currentTime = new Date(); // 현재 시간

                const working = [];
                const notStarted = [];
                const offDuty = [];
                const misc = [];

                for (const employee of employees) {
                    const logResponse = await axios.get(`http://localhost:8877/schedule/current-log?slaveId=${employee.id}`);
                    const log = logResponse.data;

                    const startTime = new Date(`${selectedDate.toDateString()} ${employee.scheduleStart}`);
                    const endTime = new Date(`${selectedDate.toDateString()} ${employee.scheduleEnd}`);

                    if (log && log.scheduleLogStart && !log.scheduleLogEnd) {
                        // 출근 로그가 있고, 퇴근 로그가 없는 경우: 근무중
                        working.push(employee);
                    } else if (!log.scheduleLogStart && currentTime < startTime) {
                        // 출근 로그가 없고, 출근 예정 시간보다 현재 시간이 이전인 경우: 출근 전
                        notStarted.push(employee);
                    } else if (log.scheduleLogEnd && new Date(log.scheduleLogEnd) < endTime) {
                        // 퇴근 로그가 있고, 로그의 퇴근 시간이 스케줄의 퇴근 시간보다 빠른 경우: 조퇴
                        misc.push({ ...employee, status: '조퇴' });
                    } else if (log.scheduleLogEnd) {
                        // 퇴근 로그가 있는 경우: 퇴근
                        offDuty.push(employee);
                    } else if (!log.scheduleLogStart) {
                        // 스케줄이 있지만, 출근 로그와 퇴근 로그가 모두 없는 경우: 결근
                        misc.push({ ...employee, status: '결근' });
                    }
                }

                setWorkingEmployees(working);
                setNotStartedEmployees(notStarted);
                setOffDutyEmployees(offDuty);
                setMiscEmployees(misc);
            } catch (error) {
                console.error('직원 정보 페치 오류:', error);
                alert('직원 정보를 가져오는데 실패했습니다.');
            }
        };

        const fetchWageData = async () => {
            const payload = {
                workplaceId: workplaceIdByStore,
                ym: `${currentYear}-${currentMonth < 10 ? "0" + currentMonth : currentMonth}`,
            };
            try {
                const res = await fetch(`http://localhost:8877/wage/workplace`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                });

                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }

                const json = await res.json();
                setEstimatedWages(json.salaryAmount);
                setEmployeeWages(json.logList);
            } catch (error) {
                console.error("Error fetching wage data:", error);
            }
        };

        if (workplaceIdByStore) {
            fetchWorkplaceInfo();
            fetchEmployees();
            fetchWageData();
        }
    }, [workplaceIdByStore, selectedDate, currentMonth, currentYear]);

    if (!workplaceInfo) {
        return <div>사업장 정보를 가져오는데 실패했습니다.</div>;
    }

    const handleNextMonth = () => {
        if (currentMonth === 12) {
            setCurrentMonth(1);
            setCurrentYear((prevYear) => prevYear + 1);
        } else {
            setCurrentMonth((prevMonth) => prevMonth + 1);
        }
    };

    const handlePrevMonth = () => {
        if (currentMonth === 1) {
            setCurrentMonth(12);
            setCurrentYear((prevYear) => prevYear - 1);
        } else {
            setCurrentMonth((prevMonth) => prevMonth - 1);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    const formattedMonth = `${currentYear}년 ${currentMonth}월`;

    return (
        <div className={styles.innerMainContainer}>
            <div className={styles.leftPanel}>
                <div className={styles.workplaceInfo}>
                    <div className={styles.monthNavigation}>
                        <img src={`${process.env.PUBLIC_URL}/images/left-arrow.png`}
                             alt={"좌측화살표"}
                             className={styles.arrowButton}
                             onClick={handlePrevMonth}></img>
                        <span className={styles.monthText}>{formattedMonth}</span>
                        <img src={`${process.env.PUBLIC_URL}/images/right-arrow.png`}
                             className={styles.arrowButton}
                             onClick={handleNextMonth}></img>
                    </div>
                    <div className={styles.monthDetails}>
                        <p className={styles.estimatedWages}>예상 급여 : {estimatedWages.toLocaleString()} 원</p>
                        <p className={styles.totalEmployees}>총 직원 수 : {workingEmployees.length + notStartedEmployees.length + offDutyEmployees.length + miscEmployees.length}명</p>
                    </div>
                </div>

                <div className={styles.employeeSection}>
                    <p className={styles.employeeTitle}>직원별 월 급여</p>
                    <div className={styles.employeeWages}>
                        {employeeWages.map((employee) => (
                            <div key={employee.slaveId} className={styles.employeeWage}>
                                {employee.slaveName} ({employee.slavePosition}) : {employee.totalAmount.toLocaleString()} 원
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.scroll}></div>
            </div>

            <div className={styles.rightPanel}>
                <div className={styles.scheduleSection}>
                    <div className={styles.datePickerContainer}>
                        <img
                            src={`${process.env.PUBLIC_URL}/images/calendar-icon.png`}
                            alt="달력 아이콘"
                            className={styles.calendarIcon}
                            onClick={() => datePickerRef.current.setOpen(true)} // 달력 아이콘 클릭 시 DatePicker 열기
                        />
                        <DatePicker
                            ref={datePickerRef}
                            selected={selectedDate}
                            onChange={handleDateChange}
                            dateFormat="yyyy년 MM월 dd일"
                            customInput={<h2 className={styles.dateText}>{formatDate(selectedDate)}</h2>}
                        />
                    </div>
                    <div className={styles.scheduleTable}>
                        <div className={styles.scheduleColumn}>
                            <p className={styles.columnTitle}>출근전 ({notStartedEmployees.length})</p>
                            {notStartedEmployees.map(employee => (
                                <p key={employee.id} className={styles.scheduleEntry}>
                                    {employee.slaveName} ({employee.slavePosition}) {employee.scheduleStart} 출근 예정
                                </p>
                            ))}
                        </div>
                        <div className={styles.scheduleColumn}>
                            <p className={styles.columnTitle}>근무중 ({workingEmployees.length})</p>
                            {workingEmployees.map(employee => (
                                <p key={employee.id} className={styles.scheduleEntry}>
                                    {employee.slaveName} ({employee.slavePosition}) {employee.scheduleStart} 출근
                                </p>
                            ))}
                        </div>
                        <div className={styles.scheduleColumn}>
                            <p className={styles.columnTitle}>퇴근 ({offDutyEmployees.length})</p>
                            {offDutyEmployees.map(employee => (
                                <p key={employee.id} className={styles.scheduleEntry}>
                                    {employee.slaveName} ({employee.slavePosition}) {employee.scheduleEnd} 퇴근
                                </p>
                            ))}
                        </div>
                        <div className={styles.scheduleColumn}>
                            <p className={styles.columnTitle}>기타 ({miscEmployees.length})</p>
                            {miscEmployees.map(employee => (
                                <p key={employee.id} className={styles.scheduleEntry}>
                                    {employee.slaveName} ({employee.slavePosition}) {employee.scheduleStart}  <span style={{ color: 'red' }}>{employee.status}</span>
                                </p>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div
                className={styles.backgroundImage}
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/images/background.png)`,
                }}
            ></div>
        </div>
    );
};

export default InnerMainPage;
