import React, {useEffect, useState} from "react";
import styles from "./ScheduleAddPage.module.scss";
import ScheduleCalendarPage from "./ScheduleCalendarPage";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ScheduleAddPage = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const workplaceId = useSelector((state => state.workplace.workplaceId));

    const navigate = useNavigate();


    const dateClickHandler = (day) => {
        if (day !== null) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const formattedDate = date.toLocaleDateString('en-CA');
            setSelectedDate(formattedDate);
        }
        console.log('클릭 날짜 : ', day);
    };

    const cancelHandler = () => {
        navigate("/detail/schedule-manage")
    };

    const addScheduleHandler = () => {
        console.log('일정 추가 버튼 클릭');
    };

    return (
        <>
            <div className={styles.scheduleTitle}>
                <h1>일정관리</h1>
            </div>
            <div className={styles.schedule}>
                <ScheduleCalendarPage selectedDate={selectedDate}
                                      setSelectedDate={setSelectedDate}
                                      dateClick={dateClickHandler}/>

                <div className={styles.modifySchedule}>
                    <h3>일정 추가</h3>

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
                        <label htmlFor="daySelect">날짜:</label>
                        <div id="daySelect" className={styles.selectedDate}>
                            {selectedDate ? selectedDate : "날짜를 선택하세요"}
                        </div>

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
                        <button className={styles.cancelButton} onClick={cancelHandler}>취소</button>
                        <button className={styles.addButton} onClick={addScheduleHandler} >추가</button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default ScheduleAddPage;
