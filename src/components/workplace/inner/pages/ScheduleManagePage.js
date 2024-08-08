import React, {useEffect, useState} from "react";
import styles from "./ScheduleManagePage.module.scss";
import {useNavigate} from "react-router-dom";

const ScheduleManagePage = () => {

    const [currentDate, setCurrentDate] = useState(new Date());
    const [days, setDays] = useState([]);

    const navigate = useNavigate();

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

    return (
        <>
            <div className={styles.scheduleTitle}>
                <h1>일정관리</h1>
            </div>
            <div className={styles.schedule}>
                <button className={styles.addSchedulebutton} onClick={addScheduleHandler}>일정 추가</button>

                <div className={styles.calendar}>
                    <div className={styles.calendarHeader}>
                        <button onClick={handlePrevMonth}> ◀ </button>
                        <h2>{monthName} {year}</h2>
                        <button onClick={handleNextMonth}> ▶ </button>
                    </div>
                    <div className={styles.calendarBody}>
                        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
                            <div key={day} className={styles.day}>{day}</div>
                        ))}
                        {days.map((day, index) => (
                            <div key={index} className={styles.day}>
                                {day}
                            </div>
                        ))}
                    </div>
                </div>


                <div className={styles.todaySchedule}>
                    <h2>오늘의 근무자</h2>
                    <p>총 5명</p>

                </div>
            </div>
        </>
    );
};

export default ScheduleManagePage;
