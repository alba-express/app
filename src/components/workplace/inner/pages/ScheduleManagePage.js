import React, {useEffect, useState} from "react";
import styles from "./ScheduleManagePage.module.scss";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ScheduleCalendarPage from "./ScheduleCalendarPage";
import {useSelector} from "react-redux";

const ScheduleManagePage = () => {

    const addedSchedule = useSelector(state => state.schedule.addedSchedule);

    const [scheduleData, setScheduleData] = useState([]);
    const [extraScheduleData, setExtraScheduleData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [fetching, setFetching] = useState(false);
    const workplaceId = useSelector((state => state.workplace.workplaceId));

    const navigate = useNavigate();

    useEffect(() => {
        const fetchSchedule = async () => {
            if (!selectedDate) return;

            setFetching(true);

            const date = selectedDate;
            const dayOfWeek = new Date(date).getDay();

            const payload = {
                workplaceId: workplaceId,
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
                const data1 = await response.json();
                console.log("data1: ", data1);
                setScheduleData(data1);
            } catch (error) {
                console.error('Error: ', error);
            }
        };
        fetchSchedule();
    }, [selectedDate]);

    useEffect(() => {
        if (addedSchedule) {
            console.log('addedSchedule: ', addedSchedule);
            // Redux 상태에서 가져온 값을 사용하여 데이터를 fetch
            const {slaveId, startTime, endTime} = addedSchedule;

            const fetchExtraSchedule = async () => {
                if (!selectedDate) return;

                setFetching(true);

                const date = selectedDate;
                const payload = {
                    slaveId: slaveId,
                    date: selectedDate,
                    startTime: startTime,
                    endTime: endTime
                };

                console.log('payload: ', payload);

                try {
                    const response = await fetch(
                        `http://localhost:8877/detail/extraschedule-manage?slaveId=${slaveId}&date=${date}&startTime=${startTime}&endTime=${endTime}`);
                    if (!response.ok) {

                        throw new Error('네트워크 응답이 올바르지 않습니다.');

                    }
                    const data2 = await response.json();
                    console.log("추가근무 확인: ", data2);
                    setExtraScheduleData(data2);
                } catch (error) {
                    console.error('Error: ', error);
                }
            };
            fetchExtraSchedule();
        }
    }, [addedSchedule]);


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
                                      setSelectedDate={setSelectedDate}/>
                <Link to="/detail/schedule-add">
                    <button className={styles.addSchedulebutton}>일정 추가</button>
                </Link>

                <div className={styles.todaySchedule}>
                    <h2>오늘 근무자 ({selectedDate})</h2>
                    <p>총 {scheduleData.length}명</p>
                    {scheduleData.length === 0 ? "오늘 근무자가 없습니다."
                        : <div className={styles.scheduleList}>
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
                        </div>}
                </div>

                <div className={styles.todaySchedule}>
                    <h2>추가 근무자 ({selectedDate})</h2>
                    <p>총 {extraScheduleData.length}명</p>

                    {extraScheduleData.length === 0 ? "오늘 추가 근무자가 없습니다."
                        : <div className={styles.scheduleList}>
                            {extraScheduleData.map(extraSchedule => (
                                <div key={extraSchedule.slaveId} className={styles.scheduleItem}>
                                    <div className={styles.scheduleItemName}>
                                        {extraSchedule.slaveName} ({extraSchedule.slavePosition})
                                    </div>
                                    <div className={styles.scheduleItemTime}>
                                        {formatTime(extraSchedule.scheduleStart)} ~ {formatTime(extraSchedule.scheduleEnd)}
                                    </div>
                                </div>
                            ))}
                        </div>}
                </div>

            </div>
        </>
    );
};

export default ScheduleManagePage;
