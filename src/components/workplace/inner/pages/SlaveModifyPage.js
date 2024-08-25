import React, { useEffect, useState } from "react";
import styles from './SlaveModifyPage.module.scss';
import { Link, useNavigate } from "react-router-dom";
import SlaveModifyWageList from "./slave/SlaveModifyPage/SlaveModifyWageList";
import SlaveModifyScheduleList from "./slave/SlaveModifyPage/SlaveModifyScheduleList";
import {BASE_URL} from "../../../../config/host-config";


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
            slaveWageList: [{ slaveWageType: "급여타입미정", slaveWageAmount: "급여금액미정", slaveWageInsurance: "4대보험미정" }],
            slaveScheduleList: [{scheduleDay: "요일없음", scheduleStart: "00:00", scheduleEnd: "00:00"}],
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

    // 직원 수정을 위한 기본 객체 상태값으로 관리하기
    const [slaveModifyInput, setSlaveModifyInput] = useState({
        slaveId: '',
        slaveName: '',
        slavePhoneNumber: '',
        slaveBirthday: '',
        slavePosition: '',
        slaveWageList: [],
        slaveScheduleList: [],
        workPlaceNumber: ''
    });

    useEffect(()=> {

        // oneSlave 정의하기
        const oneSlave = getOneSlave();

        // 선택한 직원의 정보를 직원 수정을 위한 기본 객체에 등록하기
        setSlaveModifyInput({
            slaveId: oneSlave.slaveId,
            slaveName: oneSlave.slaveName,
            slavePhoneNumber: oneSlave.slavePhoneNumber,
            slaveBirthday: oneSlave.slaveBirthday,
            slavePosition: oneSlave.slavePosition,
            slaveWageList: oneSlave.slaveWageList,
            slaveScheduleList: oneSlave.slaveScheduleList,
            workPlaceNumber: oneSlave.workPlaceNumber
        });
    }, []);

    //-------------------------------------------------

    const navigate = useNavigate();

    // 생년월일을 오늘 이전날짜만 입력 가능하게 하기 위한 오늘 날짜를 "YYYY-MM-DD" 형식으로 포맷팅
    const today = new Date().toISOString().split('T')[0];

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
                const response = await fetch(`${BASE_URL}/detail/validPhoneNumber`, {
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

        setSlaveModifyInput(prev => ({...prev, slavePhoneNumber: e.target.value}));
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

        setSlaveModifyInput(prev => ({...prev,  slaveWageList: updatedWageList}));
    });

    // -------------------------------------------------

    // 근무정보 모달창으로 함수 내려보내 근무타입 & 근무요일 & 근무시간 정보 받아오기 & 상태관리하기
    const onScheduleList = ((updatedScheduleList) => {

        setSlaveModifyInput(prev => ({...prev, slaveScheduleList: updatedScheduleList}));
    });

    // -------------------------------------------------

    // 사업장 번호를 가져오기
    const workplaceIdByStore = localStorage.getItem('workplaceId');

    useEffect(() => {
        if (workplaceIdByStore) {
            setSlaveModifyInput(prev => ({ ...prev, workPlaceNumber: workplaceIdByStore }));
        }
    }, [workplaceIdByStore]);

    //-------------------------------------------------

    // 입력값 검증 함수
    const isValidInput = () => {
        const { 
            slaveName, 
            slavePhoneNumber, 
            slaveBirthday, 
            slavePosition, 
            slaveWageList, 
            slaveScheduleList, 
            workPlaceNumber 
        } = slaveModifyInput;
    
        // 값이 빈 문자열, undefined, 또는 null이 아닌지 확인
        const isNotEmpty = value => value !== '' && value !== undefined && value !== null;
        
        // 급여리스트의 모든 객체가 빈 문자열이 아닌지 확인
        const areWagesValid = Array.isArray(slaveWageList) &&
            slaveWageList.every(wage =>
                isNotEmpty(wage.slaveWageType) &&
                isNotEmpty(wage.slaveWageAmount) &&
                isNotEmpty(wage.slaveWageInsurance)
            );
    
        // 근무리스트의 모든 객체가 빈 문자열이 아닌지 확인
        const areSchedulesValid = Array.isArray(slaveScheduleList) &&
            slaveScheduleList.every(schedule =>
                isNotEmpty(schedule.slaveScheduleType) &&
                Array.isArray(schedule.slaveScheduleList) &&
                schedule.slaveScheduleList.some(daySchedule =>
                    daySchedule.select === true &&
                    isNotEmpty(daySchedule.startSchedule) &&
                    isNotEmpty(daySchedule.endSchedule)
        )
    );
    
        return (
            isNotEmpty(slaveName) &&
            isNotEmpty(slavePhoneNumber) &&
            isNotEmpty(slaveBirthday) &&
            isNotEmpty(slavePosition) &&
            areWagesValid &&
            areSchedulesValid &&
            isNotEmpty(workPlaceNumber)
        );
    };

    // form태그에 입력한 값을 서버로 넘기는 button태그를 상태값으로 관리하기
    const [formButtonType, setFormButtonType] = useState('button'); // 버튼의 type 관리
    const [formButtonStyle, setFormButtonStyle] = useState(styles['slaveRegistPage-nonButton']); // 버튼의 className(스타일) 관리


    useEffect(()=> {
        // 모든 입력값이 입력된 상태일 경우
        if (isValidInput()) {
            setFormButtonType('submit');
            setFormButtonStyle(styles['slaveRegistPage-button']);

            // 입력값이 하나라도 빈 상태일 경우
        } else {
            setFormButtonType('button');
            setFormButtonStyle(styles['slaveRegistPage-nonButton']);
        }

        console.log('버튼타입', formButtonType);
        
    }, [slaveModifyInput]);

    useEffect(()=> {console.log("모두입력", slaveModifyInput);
    }, [])

    //-------------------------------------------------

    const sendSlaveInputHandler = async (e) => {

        console.log('slaveModifyInput', slaveModifyInput);
    
        e.preventDefault();

        if (!isValidInput()) {
            alert('모든 필드를 입력하지않으면 직원수정을 할 수 없습니다.');
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/detail/slave-modify/modifySlave`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(slaveModifyInput),
            });

            if (!response.ok) {
                throw new Error ('서버로 전송되지 않았습니다.');
            }

            const result = await response.json();
            console.log('Success:', result);
            alert("직원이 수정되었습니다.")
            localStorage.removeItem('oneSlave');
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
                    <h1 className={styles['slaveRegistPageHeader-title']}> 직원수정 </h1>
                </div>

                <form onSubmit={sendSlaveInputHandler} className={styles['slaveRegistPageForm-box']} >
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
                                <input id="slaveBirthday" type="date" max={today} onChange={birthdayHandler} className={styles['slaveRegistPageInput-input']} value={slaveModifyInput.slaveBirthday}/>
                            </label>

                            <label htmlFor="slavePosition" className={styles['slaveRegistPageInput-box']} >
                                <div className={styles['slaveRegistPageInput-title']} > 직책 </div>
                                <input id="slavePosition" onChange={positionHandler} className={styles['slaveRegistPageInput-input']} value={slaveModifyInput.slavePosition}/>
                            </label>

                            {/* 급여정보리스트 */}
                            <SlaveModifyWageList onWages={onWageList}  oneSlave={getOneSlave}/>

                        </div>

                        <div className={styles['slaveRegistPageForm-right']}>

                            {/* 근무정보리스트 */}
                            <SlaveModifyScheduleList onSchedules={onScheduleList} oneSlave={getOneSlave} modifyScheduleList={slaveModifyInput.slaveName}/>

                        </div>
                    </div>

                    <div className={styles['slaveRegistPageForm-notice']}>
                        * 모든 입력창을 입력하지 않으면 직원 수정이 되지 않습니다.
                    </div>
                    
                    <div className={styles['slaveRegistPageForm-bottom']} >
                        <div className={styles['slaveRegistPageButton-box']} >
                            <Link to="/detail/slave-info" className={styles['link-text']} > 
                                <button className={styles['slaveRegistPage-button']} > 취소 </button>
                            </Link>
                        </div>

                        <div className={styles['slaveRegistPageButton-box']} >
                            <button type={formButtonType} className={styles['formButtonStyle']} > 수정 </button>
                        </div>
                    </div>
                </form>

            </div>
        </>
    );
};

export default SlaveModifyPage;