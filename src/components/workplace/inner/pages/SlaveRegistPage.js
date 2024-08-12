import React, { useCallback, useEffect, useState } from "react";
import styles from './SlaveRegistPage.module.scss'
import { Link, useNavigate } from "react-router-dom";
import SlaveRegisterVariableDayModal from "./slave/SlaveRegistPage/SlaveRegisterVariableDayModal";
import SlaveRegisterFixedDayModal from "./slave/SlaveRegistPage/SlaveRegisterFixedDayModal";
import SlaveRegisterWageModal from "./slave/SlaveRegistPage/SlaveRegisterWageList";

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

        // 근무시간타입 고정 or 변동
        slaveScheduleType: '',
        // 근무시간정보
        slaveScheduleList: [],
    });

    //-------------------------------------------------

    const navigate = useNavigate();

    //-------------------------------------------------

    // 근무방식선택 --> 고정시간 or 변동시간 상태값 관리
    const [selectScheduleType, setSelectScheduleType] = useState('');

    // 근무방식선택에 따른 버튼 스타일 변경
    const getScheduleTypeClassName = (type) => {


        if (selectScheduleType === '') {
            return styles.slaveRegistPageInputScheduleType;
        } else if (type === 'fixed') {
            return selectScheduleType ? styles.scheduleType : styles.slaveRegistPageInputScheduleType;

        } else if (type === 'variable') {
            return !selectScheduleType ? styles.scheduleType : styles.slaveRegistPageInputScheduleType;
        }
    };

    // 고정시간 클릭이벤트 
    const fixedDayHandler = e => {

        if (selectScheduleType === true) {
            setSelectScheduleType('');

        } else {
            // 근무방식 - 고정은 true, 1
            setSelectScheduleType(true);
        }
    };

    //-------------------------------------------------

    // 변동시간 클릭이벤트
    const variableDayHandler = e => {

        if (selectScheduleType === false) {
            setSelectScheduleType('');

        } else {
            // 근무방식 - 변동은 false, 0
            setSelectScheduleType(false);
        }
    };

    //-------------------------------------------------

    // 이름 입력한 경우 input태그 상태창 변경하기
    const nameHandler = e => {
        setSlaveRegistInput(prev => ({...slaveRegistInput, slaveName: e.target.value}));
    };

    // 전화번호 입력한 경우 input태그 상태창 변경하기
    const phoneNumberHandler = e => {
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

    // 함수를 통해 받아온 고정시간 정보 상태관리하기
    const [updatedFixedDay, setUpdatedFixedDay] = useState([]);

    // 고정시간 모달창으로 함수 내려보내 고정시간 정보 받아오기 & 상태관리하기
    const onFixedDay = useCallback((fixedDay) => {
        setUpdatedFixedDay(fixedDay);
    }, []);

    // 함수를 통해 받아온 변동시간 정보 상태관리하기
    const [updatedVariableDay, setUpdatedVariableDay] = useState([]);

    // 변동시간 모달창으로 함수 내려보내 변동시간 정보 받아오기 & 상태관리하기
    const onVariableDay = (variableDay) => {

        setUpdatedVariableDay(variableDay);
    };

    // scheduleType 에 따른 고정시간 정보 & 변동시간 정보 업데이트하기
    useEffect (() => {

        // console.log('근무타입', selectScheduleType);

        if (selectScheduleType === true) { // 근무타입 - 고정시간은 true, 1
            setSlaveRegistInput((prev) => ({...prev, slaveScheduleType: selectScheduleType, slaveScheduleList: updatedFixedDay}));
        } else if (selectScheduleType === false) { // 근무타입 - 변동시간은 false, 0
            setSlaveRegistInput((prev) => ({...prev, slaveScheduleType: selectScheduleType, slaveScheduleList: updatedVariableDay}));
        } else { // 근무방식 미선택
            setSlaveRegistInput((prev) => ({...prev}));
        }

    }, [selectScheduleType, updatedFixedDay, updatedVariableDay]);

    //-------------------------------------------------

    // 세션 스토리지에서 사업장 번호를 가져오기
    const getWorkPlace = () => {

        // 세션 스토리지에 사업장번호가 없기때문에 더미데이터 추가
        let dummyWorkPlace = {workPlaceNumber: 1};

        sessionStorage.setItem("item", JSON.stringify(dummyWorkPlace));


        // 세션스토리지에서 키를 통해 value 꺼내기
        const workPlaceBySession = sessionStorage.getItem('item');

        // JSON 형태의 value 를 변수로 꺼내기
        const workPlace = JSON.parse(workPlaceBySession);

        // 사업장이 있으면 꺼내오고 없으면 null
        return workPlace ? workPlace.workPlaceNumber : null;
    }

    // 
    useEffect(() => {
        const workPlaceNumber = getWorkPlace();

        if (workPlaceNumber) {
            setSlaveRegistInput(prev => ({...prev, workPlaceNumber}));
        }

    }, []);

    //-------------------------------------------------

    // 입력값 검증 함수
    const validateInputs = () => {
        const { slaveName, slavePhoneNumber, slaveBirthday, slavePosition, slaveWageList, slaveScheduleType, slaveScheduleList } = slaveRegistInput;
        if (!slaveName || !slavePhoneNumber || !slaveBirthday || !slavePosition || slaveWageList.length === 0 || slaveScheduleType === '' || slaveScheduleList.length === 0) {
            return false;
        }
        return true;
    };

    //-------------------------------------------------

    const sendSlaveInputHandler = async (e) => {

        console.log('slaveRegistInput', slaveRegistInput);
    
        e.preventDefault();

        if (!validateInputs()) {
            alert('모든 필드를 입력하지않으면 직원등록을 할 수 없습니다.');
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

                            {/* 급여 리스트 */}
                            <SlaveRegisterWageModal onWages={onWageList} />

                        </div>

                        <div className={styles['slaveRegistPageForm-middle']}></div>

                        <div className={styles['slaveRegistPageForm-right']}>

                            <div className={styles['slaveRegistPageSchedule-box']} >
                                <div className={styles['slaveRegistPageInput-title']} > 근무시간선택 </div>

                                <div className={styles['slaveRegistPageInputScheduleTitle-box']} >
                                    <label htmlFor="fixed" className={getScheduleTypeClassName('fixed')} >
                                        고정시간
                                        <input id="fixed" onClick={fixedDayHandler} type="checkbox" style={{ display: 'none' }} />
                                    </label>

                                    <label htmlFor="variable" className={getScheduleTypeClassName('variable')} >
                                        변동시간
                                        <input id="variable" onClick={variableDayHandler} type="checkbox" style={{ display: 'none' }} />
                                    </label>
                                </div>

                                <div className={styles['slaveRegistPageInputScheduleContent-box']} >
                                    {selectScheduleType === true && <SlaveRegisterFixedDayModal onFixed={onFixedDay} />}
                                    {selectScheduleType === false && <SlaveRegisterVariableDayModal onVariable={onVariableDay} />}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles['slaveRegistPageForm-bottom']} >
                        <div className={styles['slaveRegistPageButton-box']} >
                            <Link to="/detail/slave-manage" className={styles['link-text']} > 
                            <button className={styles['slaveRegistPage-button']} > 취소 </button>
                            </Link>
                            <button type="submit" className={styles['slaveRegistPage-button']} > 등록 </button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    );
};

export default SlaveRegistPage;