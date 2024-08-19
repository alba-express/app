import React, { useCallback, useEffect, useState } from "react";
import styles from './SlaveModifyPage.module.scss';
import { Link, useLocation, useNavigate } from "react-router-dom";
import SlaveModifyWageList from "./slave/SlaveModifyPage/SlaveModifyWageList";
import SlaveModifyScheduleList from "./slave/SlaveModifyPage/SlaveModifyScheduleList";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { slaveActions } from "../../../../store/slave-slice";


const SlaveModifyPage = () => {

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

    // SlaveManagePageSlaveStatusList 에서 useNavigate 를 통해 이동할 때 같이 전달한 state 받기
    // useLocation Hook 변수에 저장하기
    const location = useLocation();

    // useLocation 를 통해 state 꺼내기
    const slaveId = location.state.slaveId;

    // console.log('location으로 전달받은 state에 들어있는 내가 클릭한 직원의 id', slaveId);

    //-------------------------------------------------

    // useDispatch Hook 변수에 저장하기
    const dispatch = useDispatch();

    // redux store 에서 특정 직원 한 명의 정보를 표시하는 상태값 불러오기 (초기값: 특정 직원의 한 명의 정보를 넣을 빈 배열)
    const showOneSlaveInfo = useSelector((state) => state.slave.showOneSlaveInfo);

    // 에러 상태값으로 관리
    const [error, setError] = useState(null);

    //-------------------------------------------------

    // 전달받은 직원의 id 를 서버로 전달해 해당 직원의 정보를 받아 redux store 에 저장하기
    useEffect(() => {

        const fetchSlaveInfo = async () => {
            // 이 직원의 아이디를 서버로 전달하여 일치하는 id를 가진 직원을 찾기
            try {
                const response = await axios.get(`http://localhost:8877/detail/slave-info/${slaveId}`);

                // redux store 에 직원정보 저장하기
                dispatch(slaveActions.setShowOneSlaveInfo(response.data));

            } catch (error) {
                  setError(error.message);
                  console.error('Error:', error);
            }
        }; 

        if (slaveId !== null) {
            fetchSlaveInfo();
          } else {
            setError('직원 ID가 전달되지 않았습니다.');
        }

        // console.log(showOneSlaveInfo);

    }, [slaveId]);

    useEffect(() => {
        console.log(showOneSlaveInfo);
    }, [showOneSlaveInfo]);

    if (error) {
      return <div>Error: {error}</div>;
    }

    //-------------------------------------------------


    //-------------------------------------------------

    // const navigate = useNavigate();

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
    const onWageList = ((updatedWageList) => {

        setSlaveRegistInput(prev => ({ ...prev, slaveWageList: updatedWageList }));
    });

    //-------------------------------------------------

    // 근무정보 모달창으로 함수 내려보내 근무타입 & 근무요일 & 근무시간 정보 받아오기 & 상태관리하기
    const onScheduleList = ((updatedScheduleList) => {

        setSlaveRegistInput(prev => ({ ...prev, slaveScheduleList: updatedScheduleList }));
    });

    //-------------------------------------------------

    // 사업장 번호를 가져오기
    const workplaceIdByStore = localStorage.getItem('workplaceId');

    // useEffect(() => {
    //     if (workplaceIdByStore) {
    //         setSlaveRegistInput(prev => ({ ...prev, workPlaceNumber: workplaceIdByStore }));
    //     }
    // }, [workplaceIdByStore]);

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
    // const [formButtonType, setFormButtonType] = useState('button');

    // useEffect(()=> {
    //     // 모든 입력값이 입력된 상태일 경우
    //     if (validateInputs()) {
    //         setFormButtonType('submit');

    //         // 입력값이 하나라도 빈 상태일 경우
    //     } else {
    //         setFormButtonType('button');
    //     }
    // }, [slaveRegistInput]);

    //-------------------------------------------------

    // const sendSlaveInputHandler = async (e) => {

    //     console.log('slaveRegistInput', slaveRegistInput);
    
    //     e.preventDefault();

    //     if (!validateInputs()) {
    //         alert('모든 필드를 입력하지않으면 직원등록을 할 수 없습니다.');
    //         return;
    //     }

    //     const payload = {
    //         ...slaveRegistInput,
    //         slaveWageList: Object.values(slaveRegistInput.slaveWageList),
    //     };

    //         try {
    //             const response = await fetch(`http://localhost:8877/detail/registSlave`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json'
    //                 },
    //                 body: JSON.stringify(payload),
    //             });

    //             if (!response.ok) {
    //                 throw new Error ('서버로 전송되지 않았습니다.');
    //             }

    //             const result = await response.json();
    //             console.log('Success:', result);
    //             alert("직원이 등록되었습니다.")
    //             navigate("/detail/slave-manage");

                
    //         } catch (error) {
    //             console.error('Error', error);
    //         };
    // };

    //-------------------------------------------------
    
    return (
        <>
            <div className={styles['slaveRegistPage']} >

                <div className={styles['slaveRegistPageHeader-box']} >
                    직원등록
                </div>

                <form className={styles['slaveRegistPageForm-box']} >
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
                            <SlaveModifyWageList onWages={onWageList} />

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
                            {/* <button type={formButtonType} className={styles['slaveRegistPage-nonButton']} > 등록 </button> */}
                        </div>
                    </div>
                </form>

            </div>
        </>
    );
};

export default SlaveModifyPage;
