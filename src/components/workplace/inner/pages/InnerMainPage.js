import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import styles from "./InnerMainPage.module.scss";
import { useSelector } from "react-redux";
import { faL } from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InnerMainPage = () => {
    const [workplaceInfo, setWorkplaceInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // 현재 월 (1~12)
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear()); // 현재 연도
    const [selectedDate, setSelectedDate] = useState(new Date()); // 오늘 날짜로 초기화
  
    // const workplaceIdByStore = useSelector((state => state.workplace.workplaceId));

    // 로컬 스토리지에서 workplaceId 가져와 쓰기
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
            console.log('async:', workplaceIdByStore);

            try {
                const response = await axios.get(`http://localhost:8877/workplace/${workplaceIdByStore}`);
                const workplace = response.data;
                console.log('workplace: {}', workplace)

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
                // 데이터 로딩이 완료된 후 로컬 스토리지 삭제 시키기
                setLoading(false);
            }

        };

        if (workplaceIdByStore) {
            fetchWorkplaceInfo();
        } 
    }, [workplaceIdByStore]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

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
        // 여기서 날짜가 변경될 때 해당 날짜의 정보를 DB에서 가져오도록 추가할 수 있습니다.
    };

    const formattedMonth = `${currentYear}년 ${currentMonth}월`;

    return (
        <div className={styles.innerMainContainer}>
            <div className={styles.leftPanel}>
                <div className={styles.workplaceInfo}>
                    <h1 className={styles.workplaceName}>사업자명</h1>
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
                        <p className={styles.estimatedWages}>예상 급여 : 8,290,800 원</p>
                        <p className={styles.totalEmployees}>총 직원 수 : 6명</p>
                    </div>
                </div>

                <div className={styles.employeeSection}>
                    <p className={styles.employeeTitle}>직원별 월 급여</p>
                    <div className={styles.employeeWages}>
                        <div className={styles.employeeWage}>정재한 (매니저) : 2,280,500 원</div>
                        <div className={styles.employeeWage}>박성진 (직원) : 1,280,500 원</div>
                        <div className={styles.employeeWage}>이지효 (직원) : 1,780,500 원</div>
                        <div className={styles.employeeWage}>이수빈 (직원) : 2,080,500 원</div>
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
                            <p className={styles.columnTitle}>출근전 (2)</p>
                            <p className={styles.scheduleEntry}>정재한 (매니저) 11:00 출근예정</p>
                            <p className={styles.scheduleEntry}>이지효 (직원) 휴가</p>
                        </div>
                        <div className={styles.scheduleColumn}>
                            <p className={styles.columnTitle}>근무중 (2)</p>
                            <p className={styles.scheduleEntry}>박성진 (직원) 09:00 출근</p>
                            <p className={styles.scheduleEntry}>이수빈 (직원) 08:30 출근</p>
                        </div>
                        <div className={styles.scheduleColumn}>
                            <p className={styles.columnTitle}>퇴근 (1)</p>
                            <p className={styles.scheduleEntry}>강지혜 (직원) 10:00 퇴근</p>
                        </div>
                        <div className={styles.scheduleColumn}>
                            <p className={styles.columnTitle}>기타 (1)</p>
                            <p className={styles.scheduleEntry}>배윤정 (직원) 병가</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* 우측 하단 이미지 추가 */}
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
