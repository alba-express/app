import React, { useEffect, useState } from "react";
import styles from './SlaveModifyPage.module.scss';
import { Link, useNavigate } from "react-router-dom";
import SlaveModifyWageList from "./slave/SlaveModifyPage/SlaveModifyWageList";
import SlaveModifyScheduleList from "./slave/SlaveModifyPage/SlaveModifyScheduleList";


const SlaveModifyPage = () => {

    const getOneSlave = () => {

        // 선택된 직원 한 명이 없을경우 사용할 대체데이터
        const defaultOneSlave = {
            workPlaceNumber: 1,
            slaveId: 1,
            slaveName: '알바니',
            slavePosition: '직원',
            slavePhoneNumber: '000-0000-0000',
            slaveBirthday: '0000-01-01',
            slaveCreatedAt: '0000-01-01',
            wageList: [{ slaveWageType: "급여타입미정", slaveWageAmount: "급여금액미정", slaveWageInsurance: "4대보험미정" }],
            scheduleList: [{scheduleDay: "요일없음", scheduleStart: "00:00", scheduleEnd: "00:00"}],
        };

        // 해당 사업장의 직원 중 선택한 직원 한 명의 정보를 가져오기위해 로컬스토리지에서 oneSlave 데이터 가져오기
        let oneSlave = localStorage.getItem('oneSlave');

        // oneSlave가 존재하지 않을 경우 대체데이터를 로컬스토리지에 저장하기
        if (!oneSlave) {
            localStorage.setItem('oneSlave', JSON.stringify(defaultOneSlave));
            oneSlave = JSON.stringify(defaultOneSlave);
        } 

        // oneSlave가 있으면 oneSlave 사용하기
        try {
            return JSON.parse(oneSlave);
        } catch (e) {
            console.error("로컬스토리지의 oneSlave 에러", e);
            return defaultOneSlave;
        }
    };

    //-------------------------------------------------

    // 직원 수정을 위한 기본 객체
    const [slaveModifyInput, setSlaveModifyInput] = useState({
        workPlaceNumber: '',
        slaveId: '',
        slaveName: '',
        slavePhoneNumber: '',
        slavePosition: '',
        slaveBirthday: '',
        slaveCreatedAt: '',
        wageList: [],
        scheduleList: [],
    });

    useEffect(()=> {

        // oneSlave 정의하기
        const oneSlave = getOneSlave();

        // 선택한 직원의 정보를 직원 수정을 위한 기본 객체에 등록하기
        setSlaveModifyInput(oneSlave);
    }, []);

    //-------------------------------------------------

    // 이름 입력한 경우 input태그 상태창 변경하기
    const nameHandler = e => {
        setSlaveModifyInput(prev => ({...prev, slaveName: e.target.value}));
    };

    // 전화번호 입력한 경우 input태그 상태창 변경하기
    const phoneNumberHandler = e => {

        // 전화번호 입력 1초 후 입력한 전화번호를 서버로 전송해서 DB 에 등록된 전화번호인지 검증하기

        // 입력한 전화번호
        const inputPhoneNumber = e.target.value;

        // 해당 사업장
        const workPlaceId = slaveModifyInput.workPlaceNumber;

        setTimeout(async () => {
            try {
                const response = await fetch(`http://localhost:8877/detail/validPhoneNumber`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({inputPhoneNumber, workPlaceId})
                });
                const result = await response.json();
                if (result.isValid) {
                    // alert("사용가능한 전화번호입니다");
                    setSlaveModifyInput(prev => ({...prev, slavePhoneNumber: inputPhoneNumber}));
                } else {
                    // alert("이미 존재하는 전화번호입니다");
                    setSlaveModifyInput(prev => ({...prev, slavePhoneNumber: ''}));
                }
            } catch (error) {
                console.error("전화번호 검증 에러", error);
            }
        }, 2000);
    };

    // 생년월일 입력한 경우 input태그 상태창 변경하기
    const birthdayHandler = e => {

        setSlaveModifyInput(prev => ({...prev, slaveBirthday: e.target.value}));
    };

    // 직책 입력한 경우 input태그 상태창 변경하기
    const positionHandler = e => {

        setSlaveModifyInput(prev => ({...prev, slavePosition: e.target.value}));
    };

    // -------------------------------------------------

    // 급여정보 모달창으로 함수 내려보내 급여타입 & 급여금액 & 4대보험 적용여부 정보 받아오기 & 상태관리하기
    const onWageList = ((updatedWageList) => {

        setSlaveModifyInput(prev => ({...prev, wageList: updatedWageList}));
    });

    // -------------------------------------------------

    // 근무정보 모달창으로 함수 내려보내 근무타입 & 근무요일 & 근무시간 정보 받아오기 & 상태관리하기
    const onScheduleList = ((updatedScheduleList) => {

        setSlaveModifyInput(prev => ({...prev, scheduleList: updatedScheduleList}));
    });

    //-------------------------------------------------

    // 입력값 검증 함수
    const validateInputs = () => {
        const { slaveName, slavePhoneNumber, slaveBirthday, slavePosition, wageList, slaveScheduleType, scheduleList, workPlaceNumber } = slaveModifyInput;
        if (!slaveName || !slavePhoneNumber || !slaveBirthday || !slavePosition || wageList.length === 0 || slaveScheduleType === '' || scheduleList.length === 0, !workPlaceNumber) {
            return false;
        }
        return true;
    };

    // form태그에 입력한 값을 서버로 넘기는 button태그를 상태값으로 관리하기
    const [formButtonType, setFormButtonType] = useState('button');

    // useEffect(()=> {
    //     // 모든 입력값이 입력된 상태일 경우
    //     if (validateInputs()) {
    //         setFormButtonType('submit');

    //         // 입력값이 하나라도 빈 상태일 경우
    //     } else {
    //         setFormButtonType('button');
    //     }
    // }, [slaveModifyInput]);

    //-------------------------------------------------

    const navigate = useNavigate();

    const sendSlaveInputHandler = async (e) => {

        console.log('slaveModifyInput', slaveModifyInput);
    
        e.preventDefault();

        if (!validateInputs()) {
            alert('모든 필드를 입력하지않으면 직원등록을 할 수 없습니다.');
            return;
        }

        const payload = {
            ...slaveModifyInput,
            slaveWageList: Object.values(slaveModifyInput.slaveWageList),
        };

            try {
                const response = await fetch(`http://localhost:8877/detail/modifySlave`, {
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
                alert("직원이 수정되었습니다.")
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
                    직원수정
                </div>

                <form className={styles['slaveRegistPageForm-box']} >
                    <div className={styles['slaveRegistPageForm-top']} >
                        <div className={styles['slaveRegistPageForm-left']} >

                            {/* 이름, 전화번호, 생년월일, 직책 */}
                            <label htmlFor="slaveName" className={styles['slaveRegistPageInput-box']} >
                                <div className={styles['slaveRegistPageInput-title']} > 이름 </div>
                                <input id="slaveName" onChange={nameHandler} className={styles['slaveRegistPageInput-input']} value={slaveModifyInput.slaveName} disabled/>
                            </label>

                            <label htmlFor="slavePhoneNumber" className={styles['slaveRegistPageInput-box']} >
                                <div className={styles['slaveRegistPageInput-title']} > 전화번호 </div>
                                <input id="slavePhoneNumber" onChange={phoneNumberHandler} className={styles['slaveRegistPageInput-input']} value={slaveModifyInput.slavePhoneNumber} />
                            </label>

                            <label htmlFor="slaveBirthday" className={styles['slaveRegistPageInput-box']} >
                                <div className={styles['slaveRegistPageInput-title']} > 생년월일 </div>
                                <input id="slaveBirthday" type="date" onChange={birthdayHandler} className={styles['slaveRegistPageInput-input']} value={slaveModifyInput.slaveBirthday}/>
                            </label>

                            <label htmlFor="slavePosition" className={styles['slaveRegistPageInput-box']} >
                                <div className={styles['slaveRegistPageInput-title']} > 직책 </div>
                                <input id="slavePosition" onChange={positionHandler} className={styles['slaveRegistPageInput-input']} value={slaveModifyInput.slavePosition}/>
                            </label>

                            {/* 급여정보리스트 */}
                            <SlaveModifyWageList onWages={onWageList}  oneSlave={getOneSlave}/>

                        </div>

                        <div className={styles['slaveRegistPageForm-middle']}></div>

                        <div className={styles['slaveRegistPageForm-right']}>

                            {/* 근무정보리스트 */}
                            <SlaveModifyScheduleList onSchedules={onScheduleList} oneSlave={getOneSlave} modifyScheduleList={slaveModifyInput.slaveName}/>

                        </div>
                    </div>

                    <div className={styles['slaveRegistPageForm-bottom']} >
                        <div className={styles['slaveRegistPageButton-box']} >
                            <Link to="/detail/slave-manage" className={styles['link-text']} > 
                                <button className={styles['slaveRegistPage-button']} > 취소 </button>
                            </Link>
                            <button type="submit" className={styles['slaveRegistPage-nonButton']} > 등록 </button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    );
};

export default SlaveModifyPage;
