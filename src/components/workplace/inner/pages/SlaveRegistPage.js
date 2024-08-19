import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SlaveRegisterWageList from "./slave/SlaveRegistPage/SlaveRegisterWageList";
import SlaveRegisterScheduleList from "./slave/SlaveRegistPage/SlaveRegisterScheduleList";
import { Button } from 'react-bootstrap'; // 부트스트랩 버튼 컴포넌트 임포트
import styles from './SlaveRegistPage.module.scss';

const SlaveRegistPage = () => {
    const [slaveRegistInput, setSlaveRegistInput] = useState({
        slaveName: '',
        slavePhoneNumber: '',
        slaveBirthday: '',
        slavePosition: '',
        slaveWageList: [],
        slaveScheduleList: [],
        workPlaceNumber: ''
    });

    const navigate = useNavigate();

    const nameHandler = e => {
        setSlaveRegistInput(prev => ({...slaveRegistInput, slaveName: e.target.value}));
    };

    const phoneNumberHandler = e => {
        setSlaveRegistInput(prev => ({...slaveRegistInput, slavePhoneNumber: e.target.value}));
    };

    const birthdayHandler = e => {
        setSlaveRegistInput(prev => ({...slaveRegistInput, slaveBirthday: e.target.value}));
    };

    const positionHandler = e => {
        setSlaveRegistInput(prev => ({...slaveRegistInput, slavePosition: e.target.value}));
    };

    const onWageList = useCallback((updatedWageList) => {
        setSlaveRegistInput(prev => ({ ...prev, slaveWageList: updatedWageList }));
    }, []);

    const onScheduleList = useCallback ((updatedScheduleList) => {
        setSlaveRegistInput(prev => ({ ...prev, slaveScheduleList: updatedScheduleList }));
    }, []);

    const workplaceIdByStore = localStorage.getItem('workplaceId');

    useEffect(() => {
        if (workplaceIdByStore) {
            setSlaveRegistInput(prev => ({ ...prev, workPlaceNumber: workplaceIdByStore }));
        }
    }, [workplaceIdByStore]);

    const validateInputs = () => {
        const { slaveName, slavePhoneNumber, slaveBirthday, slavePosition, slaveWageList, slaveScheduleList, workPlaceNumber } = slaveRegistInput;
        if (!slaveName || !slavePhoneNumber || !slaveBirthday || !slavePosition || slaveWageList.length === 0 || slaveScheduleList.length === 0 || !workPlaceNumber) {
            return false;
        }
        return true;
    };

    const [formButtonType, setFormButtonType] = useState('button');

    useEffect(()=> {
        if (validateInputs()) {
            setFormButtonType('submit');
        } else {
            setFormButtonType('button');
        }
    }, [slaveRegistInput]);

    const sendSlaveInputHandler = async (e) => {
        e.preventDefault();

        if (!validateInputs()) {
            alert('모든 필드를 입력하지 않으면 직원 등록을 할 수 없습니다.');
            return;
        }

        const payload = {
            ...slaveRegistInput,
            slaveWageList: Object.values(slaveRegistInput.slaveWageList),
        };

        try {
            const response = await fetch(`http://localhost:8877/detail/registSlave`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error ('서버로 전송되지 않았습니다.');
            }

            const result = await response.json();
            console.log('Success:', result);
            alert("직원이 등록되었습니다.");
            navigate("/detail/slave-manage");

        } catch (error) {
            console.error('Error', error);
        }
    };

    return (
        <div className={styles['slaveRegistPage']} >
            <div className={styles['slaveRegistPageHeader-box']} >
                직원등록
            </div>
            <form onSubmit={sendSlaveInputHandler} className={styles['slaveRegistPageForm-box']} >
                <div className={styles['slaveRegistPageForm-top']} >
                    <div className={styles['slaveRegistPageForm-left']} >

                        <label htmlFor="slaveName" className={styles['slaveRegistPageInput-box']} >
                            <div className={styles['slaveRegistPageInput-title']} > 이름 </div>
                            <input id="slaveName" onChange={nameHandler} className={styles['slaveRegistPageInput-input']} />
                        </label>

                        <label htmlFor="slavePhoneNumber" className={styles['slaveRegistPageInput-box']} >
                            <div className={styles['slaveRegistPageInput-title']} > 전화번호 </div>
                            <input id="slavePhoneNumber" onChange={phoneNumberHandler} className={styles['slaveRegistPageInput-input']} />
                        </label>

                        <label htmlFor="slaveBirthday" className={styles['slaveRegistPageInput-box']} >
                            <div className={styles['slaveRegistPageInput-title']} > 생년월일 </div>
                            <input id="slaveBirthday" type="date" onChange={birthdayHandler} className={styles['slaveRegistPageInput-input']} />
                        </label>

                        <label htmlFor="slavePosition" className={styles['slaveRegistPageInput-box']} >
                            <div className={styles['slaveRegistPageInput-title']} > 직책 </div>
                            <input id="slavePosition" onChange={positionHandler} className={styles['slaveRegistPageInput-input']} />
                        </label>

                        <SlaveRegisterWageList onWages={onWageList} />

                    </div>

                    <div className={styles['slaveRegistPageForm-middle']}></div>

                    <div className={styles['slaveRegistPageForm-right']}>

                        <SlaveRegisterScheduleList onSchedules={onScheduleList}/>

                    </div>
                </div>

                <div className={styles['slaveRegistPageForm-bottom']} >
                    <div className={styles['slaveRegistPageButton-box']} >
                        <Link to="/detail/slave-manage" className={styles['link-text']} >
                            <Button className={`${styles['slaveRegistPage-button']} btn`} variant="primary">취소</Button>
                        </Link>
                        <Button type={formButtonType} className={`${styles['slaveRegistPage-button']} btn`} variant="primary">등록</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SlaveRegistPage;
