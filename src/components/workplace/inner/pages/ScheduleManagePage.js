import React, {useEffect, useState} from "react";
import styles from "./ScheduleManagePage.module.scss";
import {useNavigate} from "react-router-dom";
import ScheduleCalendarPage from "./ScheduleCalendarPage";

const ScheduleManagePage = () => {

    const [scheduleData, setScheduleData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [fetching, setFetching] = useState(false);

    const navigate = useNavigate();

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






    const addScheduleHandler = e => {
        navigate("/detail/schedule-add");
    };

    // 시간 포맷팅 함수
    const formatTime = (time) => {
        if (!time) return '';
        const [hours, minutes] = time.split(':');
        return `${hours}:${minutes}`;
    };




    return (
        <>
            <div className={styles.scheduleTitle}>
                <h1>일정관리</h1>
            </div>
            <div className={styles.schedule}>
                <ScheduleCalendarPage selectedDate={selectedDate}
                                      setSelectedDate={setSelectedDate} />
                <button className={styles.addSchedulebutton} onClick={addScheduleHandler}>일정 추가</button>


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
