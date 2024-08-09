import React, {useEffect, useState} from "react";
import styles from "./ScheduleManagePage.module.scss";
import {useNavigate} from "react-router-dom";

const ScheduleManagePage = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);
    const [scheduleData, setScheduleData] = useState([]);

    const [selectedDate, setSelectedDate] = useState(null);
    const [fetching, setFetching] = useState(false);


    const navigate = useNavigate();

    // 페이지 로드 시 오늘 날짜의 스케줄을 가져옵니다.
    useEffect(() => {
        const today = new Date();
        const todayFormatted = today.toISOString().split('T')[0];
        setSelectedDate(todayFormatted); // 기본값으로 오늘 날짜 설정
    }, []);

    useEffect(() => {
        const fetchSchedule = async () => {
            if (!selectedDate) return;

            setFetching(true);

            const date = selectedDate;
            const dayOfWeek = new Date(date).getDay();
            const workplaceId = "1";

            const payload = {
                workplaceId: "1",
                date: selectedDate,
                dayOfWeek: dayOfWeek
            };

            console.log('payload: ', payload);

            try {
                const response = await fetch(
                    `http://localhost:8877/detail/schedule-manage?workplaceId=${workplaceId}&date=${date}&dayOfWeek=${dayOfWeek}`);
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다.');
                }
                const data = await response.json();
                console.log(data);
                setScheduleData(data);
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        fetchSchedule();
    }, [selectedDate]);

    useEffect(() => {
        createCalendar(currentDate);
    }, [currentDate]);

    const createCalendar = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

        const daysArray = [];
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push(null);
        }
        for (let date = 1; date <= lastDayOfMonth; date++) {
            daysArray.push(date);
        }
        setDays(daysArray);
    };

    const handlePrevMonth = (e) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    const handleNextMonth = (e) => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    const monthName = currentDate.toLocaleString('default', {month: 'long'});
    const year = currentDate.getFullYear();

    const addScheduleHandler = e => {
        navigate("/detail/schedule-add");
    };

    // 시간 포맷팅 함수
    const formatTime = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };

    const dateClickHandler = (day) => {
        if (day !== null) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const formattedDate = date.toLocaleDateString('en-CA');
            setSelectedDate(formattedDate);
        }
        console.log('클릭 날짜 : ', day);
    };

    return (
        <>
            <div className={styles.scheduleTitle}>
                <h1>일정관리</h1>
            </div>
            <div className={styles.schedule}>
                <button className={styles.addSchedulebutton} onClick={addScheduleHandler}>일정 추가</button>

                <div className={styles.calendar}>
                    <div className={styles.calendarHeader}>
                        <button onClick={handlePrevMonth}> ◀</button>
                        <h2>{monthName} {year}</h2>
                        <button onClick={handleNextMonth}> ▶</button>
                    </div>
                    <div className={styles.calendarBody}>
                        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                            <div key={day} className={styles.day}>{day}</div>
                        ))}
                        {days.map((day, index) => (
                            <div
                                key={index}
                                className={`${styles.day} ${day === new Date(selectedDate).getDate() ? styles.daySelected : ''}`}
                                onClick={() => dateClickHandler(day)}>
                                {day}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.todaySchedule}>
                    <h2>오늘의 근무자</h2>
                    <p>총 {scheduleData.length}명</p>
                    <div className={styles.scheduleList}>
                        {scheduleData.map(schedule => (
                            <div key={schedule.slaveId} className={styles.scheduleItem}>
                                <div className={styles.scheduleItemName}>
                                    {schedule.slaveName} ({schedule.slavePosition})
                                </div>
                                <div className={styles.scheduleItemTime}>
                                    {formatTime(schedule.scheduleStart)} ~ {formatTime(schedule.scheduleEnd)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ScheduleManagePage;
