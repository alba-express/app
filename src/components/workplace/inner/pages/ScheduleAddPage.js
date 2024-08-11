import React, {useEffect, useState} from "react";
import styles from "./ScheduleAddPage.module.scss";
import ScheduleCalendarPage from "./ScheduleCalendarPage";
import {useNavigate} from "react-router-dom";

const ScheduleAddPage = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const navigate = useNavigate();



    const cancelHandler = () => {
        navigate("/detail/schedule-manage")
    };

    return (
        <>
            <div className={styles.scheduleTitle}>
                <h1>일정관리</h1>
            </div>
            <div className={styles.schedule}>
                <ScheduleCalendarPage selectedDate={selectedDate}
                                      setSelectedDate={setSelectedDate}/>

                <div className={styles.modifySchedule}>
                    <h2>일정 추가</h2>

                    <div className={styles.formGroup}>
                        <label htmlFor="employeeSelect">직원 선택:</label>
                        <select id="employeeSelect"
                                // value={selectedEmployee}
                                // onChange={handleEmployeeChange}
                        >
                            <option value="">직원을 선택하세요</option>
                            {/*{employees.map((employee, index) => (*/}
                            {/*    <option key={index} value={employee}>{employee}</option>*/}
                            {/*))}*/}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="daySelect">요일 선택:</label>
                        <select id="daySelect"
                                // value={selectedDay}
                                // onChange={handleDayChange}
                        >
                            <option value="">요일을 선택하세요</option>
                            {/*{daysOfWeek.map((day, index) => (*/}
                            {/*    <option key={index} value={day}>{day}</option>*/}
                            {/*))}*/}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="startTime">시작 시간:</label>
                        <input type="time" id="startTime"
                               // value={startTime}
                               // onChange={handleStartTimeChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="endTime">종료 시간:</label>
                        <input type="time" id="endTime"
                               // value={endTime}
                               // onChange={handleEndTimeChange}
                        />
                    </div>

                    <div className={styles.button}>
                        <button onClick={cancelHandler}>취소</button>
                        <button>추가</button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ScheduleAddPage;
