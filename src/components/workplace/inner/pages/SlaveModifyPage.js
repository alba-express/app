import React, { useCallback, useEffect, useState } from "react";
import styles from './SlaveModifyPage.module.scss';
import { Link, useNavigate, useParams } from "react-router-dom";
import SlaveModifyWageList from "./slave/SlaveModifyPage/SlaveModifyWageList";
import SlaveModifyScheduleList from "./slave/SlaveModifyPage/SlaveModifyScheduleList";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { slaveActions } from "../../../../store/slave-slice";


const SlaveModifyPage = () => {

    // redux store 에서 특정 직원 한 명의 정보를 표시하는 상태값 불러오기 (초기값: 특정 직원의 한 명의 정보를 넣을 빈 배열)
    const showOneSlaveInfo = useSelector((state) => state.slave.showOneSlaveInfo);

    // 가져온 직원 정보를 담을 로컬 기본 배열
    const [slaveModifyInput, setSlaveModifyInput] = useState(showOneSlaveInfo);

    // 가져오는 직원의 정보가 변화하면 로컬 배열도 변경
    useEffect(()=> {
        setSlaveModifyInput(showOneSlaveInfo)

        console.log("초기수정배열", showOneSlaveInfo);
        
    }, []);

    //-------------------------------------------------

    // 사업장 번호를 가져오기
    const workplaceIdByStore = localStorage.getItem('workplaceId');

    useEffect(() => {

        console.log("사업장?", workplaceIdByStore);
        
        if (workplaceIdByStore && slaveModifyInput.workPlaceNumber !== workplaceIdByStore) {
            setSlaveModifyInput(prev => ({...prev, workPlaceNumber: workplaceIdByStore}));
        }
    }, [workplaceIdByStore, setSlaveModifyInput]);

    // 이름 입력한 경우 input태그 상태창 변경하기
    const nameHandler = e => {
        setSlaveModifyInput(prev => ({...prev, slaveName: e.target.value}));
    };

    // 전화번호 입력한 경우 input태그 상태창 변경하기
    const phoneNumberHandler = e => {

        // 전화번호 입력 1초 후 입력한 전화번호를 서버로 전송해서 DB 에 등록된 전화번호인지 검증하기

        // 입력한 전화번호
        const inputPhoneNumber = e.target.value;

        // setTimeout(() => {}, 1000);

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

        setSlaveModifyInput(prev => ({...prev, slaveWageList: updatedWageList}));
    });

    // -------------------------------------------------

    // 근무정보 모달창으로 함수 내려보내 근무타입 & 근무요일 & 근무시간 정보 받아오기 & 상태관리하기
    const onScheduleList = ((updatedScheduleList) => {

        setSlaveModifyInput(prev => ({...prev, slaveScheduleList: updatedScheduleList}));
    });

    //-------------------------------------------------

    // 입력값 검증 함수
    const validateInputs = () => {
        const { slaveId, slaveName, slavePhoneNumber, slaveBirthday, slavePosition, wageList, slaveScheduleType, scheduleList, workPlaceNumber } = slaveModifyInput;
        if (!slaveName || !slavePhoneNumber || !slaveBirthday || !slavePosition || wageList.length === 0 || slaveScheduleType === '' || scheduleList.length === 0, !workPlaceNumber) {
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
    }, [slaveModifyInput]);

    useEffect(()=> {console.log('수정입력', slaveModifyInput);
    }, [slaveModifyInput]);

    //-------------------------------------------------

    const navigate = useNavigate();

    const sendSlaveInputHandler = async (e) => {

        console.log('slaveModifyInput', slaveModifyInput);
    
        e.preventDefault();

        if (!validateInputs()) {
            alert('모든 필드를 입력하지않으면 직원등록을 할 수 없습니다.');
            return;
        }

        // const payload = {
        //     ...slaveRegistInput,
        //     slaveWageList: Object.values(slaveRegistInput.slaveWageList),
        // };

            try {
                const response = await fetch(`http://localhost:8877/detail/modifySlave`, {
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
                    직원수정
                </div>

                <form className={styles['slaveRegistPageForm-box']} >
                    <div className={styles['slaveRegistPageForm-top']} >
                        <div className={styles['slaveRegistPageForm-left']} >

                            {/* 이름, 전화번호, 생년월일, 직책 */}
                            <label htmlFor="slaveName" className={styles['slaveRegistPageInput-box']} >
                                <div className={styles['slaveRegistPageInput-title']} > 이름 </div>
                                <input id="slaveName" onChange={nameHandler} className={styles['slaveRegistPageInput-input']} value={slaveModifyInput.slaveName}  />
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
                            <SlaveModifyWageList onWages={onWageList}  />

                        </div>

                        <div className={styles['slaveRegistPageForm-middle']}></div>

                        <div className={styles['slaveRegistPageForm-right']}>

                            {/* 근무정보리스트 */}
                            <SlaveModifyScheduleList onSchedules={onScheduleList}/>

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

export default SlaveModifyPage;
