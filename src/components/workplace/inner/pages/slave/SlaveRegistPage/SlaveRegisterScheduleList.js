import React, { useCallback, useEffect, useState } from 'react';
import styles from './SlaveRegisterScheduleList.module.scss';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import SlaveRegisterFixedDayModal from './SlaveRegisterFixedDayModal';
import SlaveRegisterVariableDayModal from './SlaveRegisterVariableDayModal';

const SlaveRegisterScheduleList = ({ onSchedules }) => {
    const initialScheduleList = { slaveScheduleType: null, slaveScheduleList: [] };

    const [scheduleList, setScheduleList] = useState(initialScheduleList);
    const [selectedScheduleType, setSelectedScheduleType] = useState('');

    const handleScheduleTypeChange = (type) => {
        if (type === selectedScheduleType) {
            setSelectedScheduleType(''); // 동일한 타입 클릭 시 선택 해제
            setScheduleList(initialScheduleList);
        } else {
            setSelectedScheduleType(type);
            setScheduleList({ ...scheduleList, slaveScheduleType: type === 'fixed' });
        }
    };

    const onFixedDay = useCallback((fixedDay) => {
        setScheduleList(prev => ({ ...prev, slaveScheduleList: fixedDay }));
    }, []);

    const onVariableDay = useCallback((variableDay) => {
        setScheduleList(prev => ({ ...prev, slaveScheduleList: variableDay }));
    }, []);

    useEffect(() => {
        onSchedules(scheduleList);
    }, [scheduleList, onSchedules]);

    const activeStyle = {
        backgroundColor: '#ff8803',
        color: '#fff',
        border: '0',
        // boxShadow: 'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',
        width: '10.8rem',
        height: '2.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '600',
    };

    const inactiveStyle = {
        backgroundColor: '#ccc',
        color: '#fff',
        border: '0',
        // boxShadow: 'inset 2px 2px 2px 0px rgba(255,255,255,.5), 7px 7px 20px 0px rgba(0,0,0,.1), 4px 4px 5px 0px rgba(0,0,0,.1)',
        width: '10.8rem',
        height: '2.5rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: '600',
    };

    return (
        <>
            <div className={styles['slaveRegistPageSchedule-box']}>
                <div className={styles['slaveRegistPageInput-title']}>근무시간선택</div>
                <div className={styles['slaveRegistPageInputScheduleTitle-box']}>
                    <ButtonGroup toggle className={styles['slaveRegistPageScheduleButtonGroup']}>
                        <ToggleButton
                            type="radio"
                            style={selectedScheduleType === 'fixed' ? activeStyle : inactiveStyle}
                            checked={selectedScheduleType === 'fixed'}
                            value="fixed"
                            onClick={() => handleScheduleTypeChange('fixed')}
                            className={styles['slaveRegistPage-toggle-button']}
                        >
                            고정시간
                        </ToggleButton>
                        <ToggleButton
                            type="radio"
                            style={selectedScheduleType === 'variable' ? activeStyle : inactiveStyle}
                            checked={selectedScheduleType === 'variable'}
                            value="variable"
                            onClick={() => handleScheduleTypeChange('variable')}
                            className={styles['slaveRegistPage-toggle-button']}
                        >
                            변동시간
                        </ToggleButton>
                    </ButtonGroup>
                </div>
                <div className={styles['slaveRegistPageInputScheduleContent-box']}>
                    {scheduleList.slaveScheduleType === true && <SlaveRegisterFixedDayModal onFixed={onFixedDay} />}
                    {scheduleList.slaveScheduleType === false && <SlaveRegisterVariableDayModal onVariable={onVariableDay} />}
                </div>
            </div>
        </>
    );
};

export default SlaveRegisterScheduleList;
