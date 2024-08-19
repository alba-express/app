import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

const SlaveRegisterVariableDayModal = ({ onVariable }) => {
    const initialVariableDays = [
        { scheduleDay: 1, value: '월', select: false, startSchedule: '', endSchedule: '' },
        { scheduleDay: 2, value: '화', select: false, startSchedule: '', endSchedule: '' },
        { scheduleDay: 3, value: '수', select: false, startSchedule: '', endSchedule: '' },
        { scheduleDay: 4, value: '목', select: false, startSchedule: '', endSchedule: '' },
        { scheduleDay: 5, value: '금', select: false, startSchedule: '', endSchedule: '' },
        { scheduleDay: 6, value: '토', select: false, startSchedule: '', endSchedule: '' },
        { scheduleDay: 0, value: '일', select: false, startSchedule: '', endSchedule: '' },
    ];

    const [variableDays, setVariableDays] = useState(initialVariableDays);

    const selectDayHandler = (e) => {
        const selectDays = variableDays.map((day) =>
            day.value === e.target.value ? { ...day, select: !day.select } : { ...day }
        );
        setVariableDays(selectDays);
    };

    const startTimeHandler = (label, value) => {
        const inputStartTime = variableDays.map((day) =>
            day.scheduleDay === label ? { ...day, startSchedule: value } : { ...day }
        );
        setVariableDays(inputStartTime);
    };

    const endTimeHandler = (label, value) => {
        const inputEndTime = variableDays.map((day) =>
            day.scheduleDay === label ? { ...day, endSchedule: value } : { ...day }
        );
        setVariableDays(inputEndTime);
    };

    useEffect(() => {
        const updatedVariableDays = variableDays.filter((day) => day.select);
        console.log('최종 변동시간', updatedVariableDays);
        onVariable(updatedVariableDays);
    }, [variableDays]);

    return (
        <>
            <div style={{ fontSize: '18px' }}>요일을 선택해주세요</div>

            {variableDays.map((day) => (
                <div
                    key={day.scheduleDay}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '10px 0 20px 0',
                    }}
                >
                    <Button
                        value={day.value}
                        onClick={selectDayHandler}
                        style={{
                            width: '2.5rem',
                            height: '2.5rem',
                            margin: '0 14.5px 0 0',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            fontWeight: '600',
                            color: '#fff',
                            cursor: 'pointer',
                            backgroundColor: day.select ? 'rgba(0, 139, 134, 0.7)' : 'rgba(65, 63, 63, 0.7)',
                            border: day.select ? '1px solid rgba(0, 139, 134, 0.8)' : '1px solid rgba(65, 63, 63, 1)',
                            boxShadow: day.select
                                ? 'inset -4px -4px 6px 0 rgba(255,255,255,.2), inset 4px 4px 6px 0 rgba(0, 0, 0, .4)'
                                : 'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',
                        }}
                    >
                        {day.value}
                    </Button>

                    <label htmlFor={`${day.scheduleDay}-startTime`} style={{ marginRight: '10px' }}>
                        <input
                            type="time"
                            id={`${day.scheduleDay}-startTime`}
                            value={day.startSchedule}
                            style={{
                                width: '10rem',
                                height: '2.2rem',
                                margin: '10px 10px 0 10px',
                            }}
                            onChange={(e) => {
                                startTimeHandler(day.scheduleDay, e.target.value);
                            }}
                        />
                        부터
                    </label>

                    <label htmlFor={`${day.scheduleDay}-EndTime`} style={{ marginRight: '10px' }}>
                        <input
                            type="time"
                            id={`${day.scheduleDay}-EndTime`}
                            value={day.endSchedule}
                            style={{
                                width: '10rem',
                                height: '2.2rem',
                                margin: '10px 10px 0 10px',
                            }}
                            onChange={(e) => {
                                endTimeHandler(day.scheduleDay, e.target.value);
                            }}
                        />
                        까지
                    </label>
                </div>
            ))}
        </>
    );
};

export default SlaveRegisterVariableDayModal;
