import React, { useEffect, useState } from 'react'
import styles from './SlaveRegisterFixedDayModal.module.scss';
import { Button } from 'react-bootstrap';

const SlaveRegisterFixedDayModal = ({ onFixed }) => {
    const initialFixedDays = [
        { scheduleDay: 1, value: '월', select: false, startSchedule: '', endSchedule: '' },
        { scheduleDay: 2, value: '화', select: false, startSchedule: '', endSchedule: '' },
        { scheduleDay: 3, value: '수', select: false, startSchedule: '', endSchedule: '' },
        { scheduleDay: 4, value: '목', select: false, startSchedule: '', endSchedule: '' },
        { scheduleDay: 5, value: '금', select: false, startSchedule: '', endSchedule: '' },
        { scheduleDay: 6, value: '토', select: false, startSchedule: '', endSchedule: '' },
        { scheduleDay: 0, value: '일', select: false, startSchedule: '', endSchedule: '' },
    ];

    const [fixedDays, setFixedDays] = useState(initialFixedDays);

    const selectDayHandler = (e) => {
        setFixedDays((prev) =>
            prev.map((prevDay) =>
                prevDay.value === e.target.value ? { ...prevDay, select: !prevDay.select } : { ...prevDay }
            )
        );
    };

    const startTimeHandler = (e) => {
        const startTime = e.target.value;
        setFixedDays((prev) => prev.map((day) => ({ ...day, startSchedule: startTime })));
    };

    const endTimeHandler = (e) => {
        const endTime = e.target.value;
        setFixedDays((prev) => prev.map((day) => ({ ...day, endSchedule: endTime })));
    };

    useEffect(() => {
        const updatedFixedDays = fixedDays.filter((day) => day.select);
        console.log('최종 고정시간', updatedFixedDays);
        onFixed(updatedFixedDays);
    }, [fixedDays]);

    return (
        <>
            <div style={{ fontSize: '18px' }}>요일을 선택해주세요</div>

            <div style={{ display: 'flex', alignItems: 'center', margin: '10px 0 20px 0' }}>
                {fixedDays.map((day) => (
                    <Button
                        key={day.scheduleDay}
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
                            backgroundColor: day.select ? '#ff8803' : '#ccc',
                            border: '0',
                            // boxShadow: day.select
                            //     ? 'inset -4px -4px 6px 0 rgba(255,255,255,.2), inset 4px 4px 6px 0 rgba(0, 0, 0, .4)'
                            //     : 'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',
                        }}
                    >
                        {day.value}
                    </Button>
                ))}
            </div>

            <div style={{ fontSize: '18px' }}>시간선택</div>

            <div style={{ display: 'flex', width: '40rem', height: '2.2rem', fontSize: '18px', marginLeft: '-10px' }}>
                <label>
                    <input
                        type="time"
                        style={{ width: '10rem', height: '2.2rem', margin: '10px 10px 0 10px' }}
                        onChange={startTimeHandler}
                    />
                    부터
                </label>

                <label>
                    <input
                        type="time"
                        style={{ width: '10rem', height: '2.2rem', margin: '10px 10px 0 10px' }}
                        onChange={endTimeHandler}
                    />
                    까지
                </label>
            </div>
        </>
    );
};

export default SlaveRegisterFixedDayModal;
