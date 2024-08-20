import React, { useCallback, useEffect, useState } from "react";
import styles from './SlaveRegistPage.module.scss'
import { Link, useNavigate } from "react-router-dom";
import SlaveRegisterWageList from "./slave/SlaveRegistPage/SlaveRegisterWageList";
import SlaveRegisterScheduleList from "./slave/SlaveRegistPage/SlaveRegisterScheduleList";

const SlaveRegistPage = () => {

    // input태그에 입력한 값을 상태값으로 한번에 관리하기
    const [slaveRegistInput, setSlaveRegistInput] = useState({
        // 직원 이름
        slaveName: '',
        // 직원 전화번호
        slavePhoneNumber: '',
        // 직원 생년월일
        slaveBirthday: '',
        // 직원 직책
        slavePosition: '',
        // 직원 급여리스트 (급여방식(시급 (true, 1), 월급 (false, 0)), 급여금액, 4대보험여부)
        slaveWageList: [],
        // 직원 근무리스트 (근무방식(고정시간 (true, 1), 변동시간 (false, 0), 근무요일, 근무시작시간, 근무종료시간))
        slaveScheduleList: [],
        // 사업장번호
        workPlaceNumber: ''
    });

    //-------------------------------------------------

    const navigate = useNavigate();

    //-------------------------------------------------

    // 이름 입력한 경우 input태그 상태창 변경하기
    const nameHandler = e => {
        setSlaveRegistInput(prev => ({...slaveRegistInput, slaveName: e.target.value}));
    };

    // 전화번호 입력한 경우 input태그 상태창 변경하기
    const phoneNumberHandler = e => {

        // 전화번호 입력 1초 후 입력한 전화번호를 서버로 전송해서 DB 에 등록된 전화번호인지 검증하기

        // 입력한 전화번호
        const inputPhoneNumber = e.target.value;

        // setTimeout(() => {}, 1000);

        setSlaveRegistInput(prev => ({...slaveRegistInput, slavePhoneNumber: e.target.value}));
    };

    // 생년월일 입력한 경우 input태그 상태창 변경하기
    const birthdayHandler = e => {
        setSlaveRegistInput(prev => ({...slaveRegistInput, slaveBirthday: e.target.value}));
    };

    // 직책 입력한 경우 input태그 상태창 변경하기
    const positionHandler = e => {
        setSlaveRegistInput(prev => ({...slaveRegistInput, slavePosition: e.target.value}));
    };

    //-------------------------------------------------

    // 급여정보 모달창으로 함수 내려보내 급여타입 & 급여금액 & 4대보험 적용여부 정보 받아오기 & 상태관리하기
    const onWageList = useCallback((updatedWageList) => {

        setSlaveRegistInput(prev => ({ ...prev, slaveWageList: updatedWageList }));
    }, []);

    //-------------------------------------------------

    // 근무정보 모달창으로 함수 내려보내 근무타입 & 근무요일 & 근무시간 정보 받아오기 & 상태관리하기
    const onScheduleList = useCallback ((updatedScheduleList) => {

        setSlaveRegistInput(prev => ({ ...prev, slaveScheduleList: updatedScheduleList }));
    }, []);

    //-------------------------------------------------

    // 사업장 번호를 가져오기
    const workplaceIdByStore = localStorage.getItem('workplaceId');

    useEffect(() => {
        if (workplaceIdByStore) {
            setSlaveRegistInput(prev => ({ ...prev, workPlaceNumber: workplaceIdByStore }));
        }
    }, [workplaceIdByStore]);

    //-------------------------------------------------

    // 입력값 검증 함수
    const validateInputs = () => {
        const { slaveName, slavePhoneNumber, slaveBirthday, slavePosition, slaveWageList, slaveScheduleType, slaveScheduleList, workPlaceNumber } = slaveRegistInput;
        if (!slaveName || !slavePhoneNumber || !slaveBirthday || !slavePosition || slaveWageList.length === 0 || slaveScheduleType === '' || slaveScheduleList.length === 0, !workPlaceNumber) {
            return false;
        }
        return true;
    };

    // form태그에 입력한 값을 서버로 넘기는 button태그를 상태값으로 관리하기
    const [formButtonType, setFormButtonType] = useState('button');

    useEffect(()=> {
        // 모든 입력값이 입력된 상태일 경우
        if (validateInputs()) {
            setFormButtonType('submit');

            // 입력값이 하나라도 빈 상태일 경우
        } else {
            setFormButtonType('button');
        }

        console.log('버튼타입', formButtonType);
        
    }, [slaveRegistInput]);

    //-------------------------------------------------

    const sendSlaveInputHandler = async (e) => {

        console.log('slaveRegistInput', slaveRegistInput);
    
        e.preventDefault();

        if (!validateInputs()) {
            alert('모든 필드를 입력하지않으면 직원등록을 할 수 없습니다.');
            return;
        }


            try {
                const response = await fetch(`http://localhost:8877/detail/registSlave`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(slaveRegistInput),
                });

                if (!response.ok) {
                    throw new Error ('서버로 전송되지 않았습니다.');
                }

                const result = await response.json();
                console.log('Success:', result);
                alert("직원이 등록되었습니다.")
                navigate("/detail/slave-manage");

                
            } catch (error) {
                console.error('Error', error);
            };
    };

    //-------------------------------------------------

    return (
        <>
            <div className={styles['slaveRegistPage']} >

                <div className={styles['slaveRegistPageHeader-box']} >
                    직원등록
                </div>

                <form onSubmit={sendSlaveInputHandler} className={styles['slaveRegistPageForm-box']} >
                    <div className={styles['slaveRegistPageForm-top']} >
                        <div className={styles['slaveRegistPageForm-left']} >

                            {/* 이름, 전화번호, 생년월일, 직책 */}
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

                            {/* 급여정보리스트 */}
                            <SlaveRegisterWageList onWages={onWageList} />

                        </div>

                        <div className={styles['slaveRegistPageForm-middle']}></div>

                        <div className={styles['slaveRegistPageForm-right']}>

                            {/* 근무정보리스트 */}
                            <SlaveRegisterScheduleList onSchedules={onScheduleList}/>

                        </div>
                    </div>

                    <div className={styles['slaveRegistPageForm-bottom']} >
                        <div className={styles['slaveRegistPageButton-box']} >
                            <Link to="/detail/slave-manage" className={styles['link-text']} > 
                                <button className={styles['slaveRegistPage-button']} > 취소 </button>
                            </Link>
                            <button type={formButtonType} className={styles['slaveRegistPage-nonButton']} > 등록 </button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    );
};

export default SlaveRegistPage;