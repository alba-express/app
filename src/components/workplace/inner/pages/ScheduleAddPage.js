import React, {useEffect, useState} from "react";
import styles from "./ScheduleAddPage.module.scss";
import ScheduleCalendarPage from "./ScheduleCalendarPage";

const ScheduleAddPage = () => {

    const [selectedDate, setSelectedDate] = useState(null);


    return (
        <>
            <div className={styles.scheduleTitle}>
                <h1>일정관리</h1>
            </div>
            <div className={styles.schedule}>
                <ScheduleCalendarPage selectedDate={selectedDate}
                                      setSelectedDate={setSelectedDate}/>

                <div className={styles.modifySchedule}>
                    <h2>일정 수정</h2>

                </div>
            </div>
        </>
    );
};

export default ScheduleAddPage;
