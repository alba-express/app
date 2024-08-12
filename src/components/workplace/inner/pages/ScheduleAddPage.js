import React, {useEffect, useState} from "react";
import styles from "./ScheduleAddPage.module.scss";
import ScheduleCalendarPage from "./ScheduleCalendarPage";
import {Form, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

const ScheduleAddPage = () => {

    const [selectedDate, setSelectedDate] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");

    const workplaceId = useSelector((state => state.workplace.workplaceId));

    // const employees =

    const navigate = useNavigate();


    const dateClickHandler = (day) => {
        if (day !== null) {
            const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
            const formattedDate = date.toLocaleDateString('en-CA');
            setSelectedDate(formattedDate);
        }
        console.log('클릭 날짜 : ', day);
    };

    const handleEmployeeChange = (e) => {
        setSelectedEmployee(e.target.value);
    };

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
    };

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
    };

    const cancelHandler = () => {
        navigate("/detail/schedule-manage")
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('일정 추가 버튼 클릭');

        const formData = new FormData(e.target);
        console.log('form: ', formData.get('startTime'));

        const payload = {
            employee: formData.get('employee'),
            date: selectedDate,
            startTime: formData.get('startTime'),
            endTime: formData.get('endTime'),
        }
        console.log('payload: ', payload);

        const response = await fetch('http://localhost:8877/detail/schedule-add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if(response.ok) {
            const data = await response.json();
            console.log('응답 데이터: ', data);

            navigate("/detail/schedule-manage");
        }

    };

    return (
        <Form method='POST' onSubmit={submitHandler}>
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
                        <select id="employeeSelect" name="employee"
                            value={selectedEmployee}
                            onChange={handleEmployeeChange}
                        >
                            <option value="">직원을 선택하세요</option>
                            {/*{employees.map((employee, index) => (*/}
                            {/*    <option key={index} value={employee}>{employee}</option>*/}
                            {/*))}*/}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="daySelect">추가 날짜:</label>
                        <div id="daySelect"  name="day">
                            {selectedDate ? selectedDate : "날짜를 선택하세요"}
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="startTime">시작 시간:</label>
                        <input type="time" id="startTime" name="startTime"
                            value={startTime}
                            onChange={handleStartTimeChange}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="endTime">종료 시간:</label>
                        <input type="time" id="endTime" name="endTime"
                            value={endTime}
                            onChange={handleEndTimeChange}
                        />
                    </div>

                    <div className={styles.button}>
                        <button className={styles.cancelButton} onClick={cancelHandler}>취소</button>
                        <button className={styles.addButton} >추가</button>
                    </div>

                </div>
            </div>
        </Form>
    );
};

export default ScheduleAddPage;
