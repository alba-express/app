import React, { useEffect, useState } from "react";
import styles from './SlaveRegistPage.module.scss'
import { Link } from "react-router-dom";
import SlaveRegisterVariableDayModal from "./slave/SlaveRegisterVariableDayModal";
import SlaveRegisterFixedDayModal from "./slave/SlaveRegisterFixedDayModal";

const SlaveRegistPage = () => {

    // input태그에 입력한 값을 상태값으로 한번에 관리하기
    const [slaveRegistInput, setSlaveRegistInput] = useState({
        // 직원 이름
        name: '',
        // 직원 전화번호
        phoneNumber: '',
        // 직원 생일
        birthday: '',
        // 직원 직책
        position: '',

        // 급여방식 시급(true, 1) or 월급(false, 2)
        wageType: '',
        // 시급일 경우 시간당 금액, 월급일경우 월 급여 금액
        wageAmount: '',

        // 4대보험 적용여부
        wageInsurance: '',

        // 근무시간정보 고정 or 변동
        scheduleType: '',
        // 고정일경우 요일
        scheduleDay: '',
        // 근무 시작시간
        scheduleStart: '',
        // 근무 종료시간
        scheduleEnd: ''
    });

    //-------------------------------------------------

    // 급여방식선택 --> 시급 or 월급 상태값 관리
    const [wageType, setWageType] = useState('');

    // 급여방식선택에 따른 버튼 스타일 변경
    const getWageTypeClassName = (type) => {
        if (wageType === '') {
            return styles.slaveRegistPageInputWageType;
        } else if (type === 'hourly') {
            return wageType ? styles.wageType : styles.slaveRegistPageInputWageType;

        } else if (type === 'monthly') {
            return wageType ? styles.slaveRegistPageInputWageType : styles.wageType;
        }
    };

    // 시급 클릭이벤트
    const hourlyWageHandler = e => {
        // 급여방식 - 시급은 true, 1
        setWageType(true);
    }

    // 월급 클릭이벤트
    const monthlyWageHandler = e => {
        // 급여방식 - 월급은 false, 2
        setWageType(false);
    }

    //-------------------------------------------------

    // 4대보험 적용여부선택 --> 적용 or 미적용 상태값 관리
    const [wageInsurance, setWageInsurance] = useState('');

    // 4대보험 적용 or 미적용 체크박스 상태값 관리
    const [insuranceApply, setInsuranceApply] = useState('');
    const [insuranceNotApply, setInsuranceNotApply] = useState('');

    // 적용 & 미적용 체크박스 상태값이 업데이트될 때 마다 4대보험 적용여부 업데이트하기
    useEffect (() => {
        // console.log('4대보험적용상태', insuranceApply);
        // console.log('4대보험미적용상태', insuranceNotApply);

        // 적용이 true && 미적용이 false 인 경우
        if (insuranceApply && !insuranceNotApply) {
            setWageInsurance(true); // 4대보험 적용

            // 적용이 false && 미적용이 true 인 경우
        } else if (!insuranceApply && insuranceNotApply) {
            setWageInsurance(false); // 4대보험 미적용

            // 기타 4대보험 미선택
        } else {
            setWageInsurance('');
        }
    }, [insuranceApply, insuranceNotApply]);

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
    }

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
    }

    //-------------------------------------------------

    // 근무방식선택 --> 고정시간 or 변동시간 상태값 관리
    const [scheduleType, setScheduleType] = useState('');

    // 근무시간선택 --> 고정시간을 선택한 경우 고정시간 선택 모달창 생성 상태값 관리
    const [fixedDay, setFixedDay] = useState('');
    // 근무시간선택 --> 변동시간을 선택한 경우 변동시간 선택 모달창 생성 상태값 관리
    const [variableDay, setVariableDay] = useState('');

    // 근무방식선택에 따른 버튼 스타일 변경
    const getScheduleTypeClassName = (type) => {
        if (scheduleType === '') {
            return styles.slaveRegistPageInputScheduleType;
        } else if (type === 'fixed') {
            return scheduleType ? styles.scheduleType : styles.slaveRegistPageInputScheduleType;

        } else if (type === 'variable') {
            return scheduleType ? styles.slaveRegistPageInputScheduleType : styles.scheduleType;
        }
    };

    // 고정시간 클릭이벤트 
    const fixedDayHandler = e => {

        // 근무방식 - 고정은 true, 1
        setScheduleType(true);

        // 고정시간 선택 모달창 생성
        setVariableDay(false);
        setFixedDay(!fixedDay);
    }

    //-------------------------------------------------

    // 변동시간 클릭이벤트
    const variableDayHandler = e => {

        // 근무방식 - 변동은 false, 0
        setScheduleType(false);

        // 변동시간 선택 모달창 생성
        setFixedDay(false);
        setVariableDay(!variableDay);
    }

    //-------------------------------------------------

    return (
        <>
            <div className={styles['slaveRegistPage']}>

                <div className={styles['slaveRegistPageHeader-box']}>
                    직원등록
                </div>

                <form className={styles['slaveRegistPageForm-box']}>

                    <div className={styles['slaveRegistPageForm-top']}>
                        
                        <div className={styles['slaveRegistPageForm-left']}>
                            <div className={styles['slaveRegistPageInput-box']}>
                                <div className={styles['slaveRegistPageInput-title']}>이름</div>
                                <input className={styles['slaveRegistPageInput-input']} value={slaveRegistInput.name}/>
                            </div>
                            <div className={styles['slaveRegistPageInput-box']}>
                                <div className={styles['slaveRegistPageInput-title']}>전화번호</div>
                                <input className={styles['slaveRegistPageInput-input']} value={slaveRegistInput.phoneNumber}/>
                            </div>
                            <div className={styles['slaveRegistPageInput-box']}>
                                <div className={styles['slaveRegistPageInput-title']}>생년월일</div>
                                <input type="date" className={styles['slaveRegistPageInput-input']} value={slaveRegistInput.birthday}/>
                            </div>

                            <div className={styles['slaveRegistPageInput-box']}>
                                <div className={styles['slaveRegistPageInput-title']}>직책</div>
                                <input className={styles['slaveRegistPageInput-input']} value={slaveRegistInput.position}/>
                            </div>

                            <div className={`${styles['slaveRegistPageInput-box']} ${styles.slaveRegistDown}`}>
                                <div className={styles['slaveRegistPageInput-title']}>급여정보</div>
                                <div className={styles['slaveRegistPageInputWage-box']} >
                                    <div className={styles['slaveRegistPageInputWage-content']} >
                                        <div className={getWageTypeClassName('hourly')} onClick={hourlyWageHandler}>시급</div>
                                        <div className={getWageTypeClassName('monthly')} onClick={monthlyWageHandler}>월급</div>

                                        <input type="checkbox" style={{ display: 'none' }} value={slaveRegistInput.wageType}/>
                                    </div>

                                    <div className={styles['slaveRegistPageInputWage-content']} >
                                        {wageType === '' ? null : (wageType ? (
                                                                                 <>
                                                                                     <div>시급</div>
                                                                                     <input className={styles['slaveRegistPageInputWage-input']} value={slaveRegistInput.wageAmount} />
                                                                                     <div>원</div> 
                                                                                 </>
                                                                              ) : (
                                                                                 <>
                                                                                     <div>월급</div>
                                                                                     <input className={styles['slaveRegistPageInputWage-input']} value={slaveRegistInput.wageAmount} />
                                                                                     <div>원</div> 
                                                                                 </>
                                                                              ))}
                                    </div>
                                </div>
                            </div>

                            <div className={styles['slaveRegistPageInput-box']}>
                                <div className={styles['slaveRegistPageInput-title']}>4대보험여부</div>

                                <div className={styles['slaveRegistPageInputTax-box']} >
                                    <div className={styles['slaveRegistPageInputTax-content']} >
                                        <div className={styles['slaveRegistPageInputTax-title']}>적용</div>
                                        <input type="checkbox" checked={insuranceApply} className={styles['slaveRegistPageInputTax-input']} onClick={appliedHandler}/>
                                    </div>
                                    <div className={styles['slaveRegistPageInputTax-content']} >
                                        <div className={styles['slaveRegistPageInputTax-title']}>적용안함</div>
                                        <input type="checkbox" checked={insuranceNotApply} className={styles['slaveRegistPageInputTax-input']} onClick={notAppliedHandler}/>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div className={styles['slaveRegistPageForm-middle']}></div>

                        <div className={styles['slaveRegistPageForm-right']}>

                            <div className={`${styles['slaveRegistPageSchedule-box']} ${styles.slaveRegistDown}`}>
                                <div className={styles['slaveRegistPageInput-title']}>근무시간선택</div>
                                <div className={styles['slaveRegistPageInputScheduleTitle-box']} >

                                    <div onClick={fixedDayHandler} className={getScheduleTypeClassName('fixed')}>고정시간</div>
                                    <input onClick={fixedDayHandler} type="checkbox" style={{ display: 'none' }}/>
                                    <div onClick={variableDayHandler} className={getScheduleTypeClassName('variable')}>변동시간</div>
                                    <input type="checkbox" style={{ display: 'none' }}/>
                                </div>


                                {fixedDay && <SlaveRegisterFixedDayModal />}
                                {variableDay && <SlaveRegisterVariableDayModal />}
                            </div>


                            
                            
                        </div>
                    </div>

                    <div className={styles['slaveRegistPageForm-bottom']}>
                        <div className={styles['slaveRegistPageButton-box']}>
                            <Link to="/detail/slave-manage" className={styles['link-text']}> 
                            <button className={styles['slaveRegistPage-button']} > 취소 </button>
                            </Link>
                            <button className={styles['slaveRegistPage-button']}>등록</button>
                        </div>
                    </div>

                </form>

                
            </div>
        </>
    );
};

export default SlaveRegistPage;