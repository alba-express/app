import React, { useEffect, useState } from "react";
import styles from './SlaveRegistPage.module.scss'
import { Link } from "react-router-dom";
import SlaveRegisterVariableDayModal from "./slave/SlaveRegisterVariableDayModal";
import SlaveRegisterFixedDayModal from "./slave/SlaveRegisterFixedDayModal";
import { format } from "date-fns";

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

        // 급여방식 시급(true, 1) or 월급(false, 2)
        slaveWageType: '',
        // 시급일 경우 시간당 금액, 월급일경우 월 급여 금액
        slaveWageMount: '',

        // 4대보험 적용여부
        slaveWageInsurance: '',

        // 근무시간타입 고정 or 변동
        slaveScheduleType: '',
        // 근무시간정보
        slaveScheduleList: [],

        // // 고정일경우 요일
        // scheduleDay: '',
        // // 근무 시작시간
        // scheduleStart: '',
        // // 근무 종료시간
        // scheduleEnd: ''
    });

    //-------------------------------------------------

    // 급여방식선택 --> 시급 or 월급 상태값 관리
    const [selectWageType, setSelectWageType] = useState('');

    // 급여방식선택에 따른 버튼 스타일 변경
    const getWageTypeClassName = (type) => {
        if (selectWageType === '') {
            return styles.slaveRegistPageInputWageType;
        } else if (type === 'hourly') {
            return selectWageType ? styles.wageType : styles.slaveRegistPageInputWageType;

        } else if (type === 'monthly') {
            return selectWageType ? styles.slaveRegistPageInputWageType : styles.wageType;
        }
    };

    // 시급 클릭이벤트
    const hourlyWageHandler = e => {

        // 이미 시급버튼이 클릭된 상태일 경우
        if (selectWageType === true) { 
            setSelectWageType('');
        } else {
            // 급여방식 - 시급은 true, 1
            setSelectWageType(true);
        }
    };

    // 월급 클릭이벤트
    const monthlyWageHandler = e => {

        // 이미 월급버튼이 클릭된 상태일 경우
        if (selectWageType === false) {
            setSelectWageType('');
        } else {
            // 급여방식 - 월급은 false, 2
            setSelectWageType(false);
        }
    };

    //-------------------------------------------------

    // 4대보험 적용여부선택 --> 적용 or 미적용 체크박스 상태값 관리
    const [insuranceApply, setInsuranceApply] = useState('');
    const [insuranceNotApply, setInsuranceNotApply] = useState('');

    // 4대보험 적용클릭이벤트
    const appliedHandler = e => {

        // 이미 체크된 경우
        if (insuranceApply) {
            setInsuranceApply(!insuranceApply);
        } else {
            // 체크되지 않았을 경우
            setInsuranceApply(true);
            setInsuranceNotApply(false);
        }
    };

    // 4대보험 미적용클릭이벤트
    const notAppliedHandler = e => {

        // 이미 체크된 경우
        if (insuranceNotApply) {
            setInsuranceNotApply(!insuranceNotApply);
        } else {
            // 체크되지 않았을 경우
            setInsuranceNotApply(true);
            setInsuranceApply(false);
        }
    };

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
        setSlaveRegistInput({...slaveRegistInput, slaveName: e.target.value});
    };

    // 전화번호 입력한 경우 input태그 상태창 변경하기
    const phoneNumberHandler = e => {
        setSlaveRegistInput({...slaveRegistInput, slavePhoneNumber: e.target.value});
    };

    // 생년월일 입력한 경우 input태그 상태창 변경하기
    const birthdayHandler = e => {
        setSlaveRegistInput({...slaveRegistInput, slaveBirthday: e.target.value});
    };

    // 직책 입력한 경우 input태그 상태창 변경하기
    const positionHandler = e => {
        setSlaveRegistInput({...slaveRegistInput, slavePosition: e.target.value});
    };

    // 시급 선택한 경우 input태그 상태창 변경하기
    const wageAmountHourlyHandler = e => {

        // console.log('시급: true, 월급: false', wageType);
        // console.log('입력금액', e.target.value);

        // 시급 선택 --> input태그 급여정보, 급여금액 변경하기
        if (selectWageType === true) {
            setSlaveRegistInput({...slaveRegistInput, slaveWageType: true, slaveWageMount: e.target.value});
        } else { // 기타 미입력, 시급이 아닌경우 기존 input태그 상태창 상태유지
            setSlaveRegistInput({...slaveRegistInput});
        }
    };

    // 월급 선택한 경우 input태그 상태창 변경하기
    const wageAmountMonthlyHandler = e => {

        // console.log('시급: true, 월급: false', wageType);
        // console.log('입력금액', e.target.value);

        // 월급 선택 --> input태그 급여정보, 급여금액 변경하기
        if (selectWageType === false) {
            setSlaveRegistInput({...slaveRegistInput, slaveWageType: false, slaveWageMount: e.target.value});
        } else { // 기타 미입력, 시급이 아닌경우 기존 input태그 상태창 상태유지
            setSlaveRegistInput({...slaveRegistInput});
        } 
    };

    // 4대보험 적용여부 체크박스 상태값이 업데이트될 때 마다 input태그 상태창 변경하기
    useEffect (() => {
        // console.log('4대보험적용상태', insuranceApply);
        // console.log('4대보험미적용상태', insuranceNotApply);

        // 적용이 true && 미적용이 false 인 경우
        if (insuranceApply && !insuranceNotApply) {
            setSlaveRegistInput((prev) => ({...prev, slaveWageInsurance: true})); // 4대보험 적용

            // 적용이 false && 미적용이 true 인 경우
        } else if (!insuranceApply && insuranceNotApply) {
            setSlaveRegistInput((prev) => ({...prev, slaveWageInsurance: false})); // 4대보험 미적용

            // 기타 4대보험 미선택한 경우
        } else {
            setSlaveRegistInput((prev) => ({...prev})); // 4대보험 미선택 상태 유지
        }
    }, [insuranceApply, insuranceNotApply]);

    // 함수를 통해 받아온 고정시간 정보 상태관리하기
    const [updatedFixedDay, setUpdatedFixedDay] = useState([]);

    // 고정시간 모달창으로 함수 내려보내 고정시간 정보 받아오기 & 상태관리하기
    const onFixedDay = (fixedDay) => {

        setUpdatedFixedDay(fixedDay);
    };

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

    const sendSlaveInputHandler = async (e) => {

        // 폼 태그 서버 전송 방지코드
        // e.preventDefault();

        // 현재시간
        const currentTime = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss");

        console.log(currentTime);
        

        // 새 객체 slaveInputListWithCreatedTime 를 만들어 기존 배열 slaveRegistInput 의 내용을 복사하고,
        // 직원생성시간을 현재시간으로 추가하기 
        const slaveInputListWithCreatedTime = {
            ...slaveRegistInput, slaveCreatedAt: currentTime
        };

        for (const [key, value] of Object.entries(slaveInputListWithCreatedTime)) {

            try {
                const response = await fetch(`http://localhost:8877/detail/registSlave`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(slaveInputListWithCreatedTime)
                });

                if (!response.ok) {
                    throw new Error ('서버로 전송되지 않았습니다.');
                }

                const result = await response.json();
                console.log('Success:', result);
                
            } catch (error) {
                console.error('Error', error);
            };


        //     if (value === '' || (Array.isArray(value) && value.length === 0)) {
        //         total += key + ', '
        //         return;
        //     } else { 
        //         try {
        //             const response = await fetch(`http://localhost:8877/api/auth/regist-slave`, {
        //                 method: 'POST',
        //                 header: {
        //                     'Content-Type': 'application/json'
        //                 },
        //                 body: JSON.stringify(slaveRegistInput)
        //             });

        //             if (!response.ok) {
        //                 throw new Error ('서버로 전송되지 않았습니다.');
        //             }

        //             const result = await response.json();
        //             console.log('Success:', result);
                    
        //         } catch (error) {
        //             console.error('Error', error);
        //         };

        //     }
        // }

        // alert(`${total} 를 입력해야 합니다.`);
        
    }
}


    // slaveRegistInput 에 빈칸이 있는경우 & 없는경우 서버로 보내기
    // const sendSlaveInput = async () => {
    //     for (const input of slaveInputList) {
    //         console.log('노예입력', input);
    //     }
    // }
    
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

                            <div className={styles['slaveRegistPageInput-box']} >
                                <div className={styles['slaveRegistPageInput-title']} > 급여정보 </div>
                                <div className={styles['slaveRegistPageInputWage-box']} >
                                    <div className={styles['slaveRegistPageInputWage-content']} >
                                        <label htmlFor="slaveWageTypeHourly" className={getWageTypeClassName('hourly')} >
                                            시급
                                            <input id="slaveWageTypeHourly" type="checkbox" style={{ display: 'none' }} onChange={hourlyWageHandler} />
                                        </label>

                                        <label htmlFor="slaveWageTypeMonthly" className={getWageTypeClassName('monthly')} >
                                            월급
                                            <input id="slaveWageTypeMonthly" type="checkbox" style={{ display: 'none' }} onChange={monthlyWageHandler} />
                                        </label>
                                    </div>

                                    <div className={styles['slaveRegistPageInputWage-content']} >
                                    {selectWageType === '' ? null : (selectWageType ? (
                                        <>
                                           <label htmlFor="hourly">
                                               시급
                                               <input id="hourly" className={styles['slaveRegistPageInputWage-input']} onChange={wageAmountHourlyHandler} />
                                               원
                                           </label>
                                        </>
                                        ) : (
                                        <>
                                           <label htmlFor="monthly">
                                               월급
                                               <input id="monthly" className={styles['slaveRegistPageInputWage-input']} onChange={wageAmountMonthlyHandler} />
                                               원
                                           </label>
                                        </>
                                    ))}
                                    </div>
                                </div>
                            </div>

                            <div className={styles['slaveRegistPageInput-box']} >
                                <div className={styles['slaveRegistPageInput-title']} > 4대보험여부 </div>

                                <div className={styles['slaveRegistPageInputTax-box']} >
                                    <label htmlFor="applied" className={styles['slaveRegistPageInputTax-content']} >
                                        <div className={styles['slaveRegistPageInputTax-title']} > 적용 </div>
                                        <input type="checkbox" checked={insuranceApply} className={styles['slaveRegistPageInputTax-input']} onChange={appliedHandler} />
                                    </label>

                                    <label htmlFor="notApplied" className={styles['slaveRegistPageInputTax-content']} >
                                        <div className={styles['slaveRegistPageInputTax-title']} > 적용안함 </div>
                                        <input type="checkbox" checked={insuranceNotApply} className={styles['slaveRegistPageInputTax-input']} onChange={notAppliedHandler} />
                                    </label>
                                </div>
                            </div>

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