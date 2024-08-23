import React, { useEffect, useState } from 'react'
import styles from './SlaveInfoPage.module.scss';
import { useNavigate } from "react-router-dom";
import SlaveInfoPageCommuteList from './slave/SlaveInfoPage/SlaveInfoPageCommuteList';
import { useDispatch, useSelector } from 'react-redux';
import { slaveActions } from '../../../../store/slave-slice';

const SlaveInfoPage = () => {

    // 선택된 직원 한 명이 없을경우 사용할 대체데이터
    const defaultOneSlave = {
        slaveName: '알바니',
        slavePosition: '직원',
        slavePhoneNumber: '000-0000-0000',
        slaveBirthday: '0000-01-01',
        slaveCreatedAt: '0000-01-01',
        wageList: [{ slaveWageType: "급여타입미정", slaveWageAmount: "급여금액미정" }],
        scheduleList: [{scheduleDay: "요일없음", scheduleStart: "00:00", scheduleEnd: "00:00"}],
        scheduleLogList: ["근태정보없음"]
    };

    const getOneSlave = () => {
        // 해당 사업장의 직원 중 선택한 직원 한 명의 정보를 가져오기위해 로컬스토리지에서 oneSlave 데이터 가져오기
        const oneSlave = localStorage.getItem('oneSlave');

        // oneSlave가 존재하지 않을 경우 대체데이터 사용하기
        if (!oneSlave) {
            return oneSlave = defaultOneSlave;
        } 

        // oneSlave가 있으면 oneSlave 사용하기
        try {
            return JSON.parse(oneSlave);
        } catch (e) {
            console.error("로컬스토리지의 oneSlave 에러", e);
            return defaultOneSlave;
        }
    };

    useEffect(()=> {console.log("한명보여줘", oneSlave);
    }, [])

    //-------------------------------------------------

    // 근무정보리스트의 내역을 scheduleType (고정시간 -> true, 변동시간 -> false) 에 따라 렌더링 태그 변경하기

    const isScheduleType = () => {
        const scheduleTypeIsTrue = oneSlave.scheduleList.filter(schedule => schedule.scheduleType === true);

        const scheduleTypeIsFalse = oneSlave.scheduleList.filter(schedule => schedule.scheduleType === false);

        if (scheduleTypeIsTrue) {
            return true;
        } else if (scheduleTypeIsFalse || null) {
            return false;
        }
    }


    // const isScheduleTypeTrue = oneSlave.scheduleList.some(schedule => schedule.scheduleType === true);

    //-------------------------------------------------

    // 페이지를 이동시킬때 사용하는 useNavigate 생성하기
    const navigate = useNavigate();

    // 직원수정버튼을 클릭했을 때 해당 직원의 정보수정페이지로 이동하기
    const thisSlaveModifyHandler = async () => {

      navigate(`/detail/slave-modify`);
    };

    // 직원퇴사버튼을 클릭했을 때 해당 직원 퇴사시키기
    const thisSlaveFiredHandler = async (slaveId) => {

        try {
            // 서버로 요청 보내기
            const response = await fetch(`http://localhost:8877/detail/slave-fired/${slaveId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
      
            // 응답 처리
            if (response.ok) {
              alert("직원의 탈퇴 요청이 성공적으로 처리되었습니다.");
              // 해당 직원 상세페이지로 이동하기
              navigate(`/detail/slave-manage`);

            } else {
                console.error('탈퇴 요청 처리 실패:', response.statusText);
            }
          } catch (error) {
              console.error('서버 요청 오류:', error);
          }
        
    };

    //-------------------------------------------------

    // oneSlave 정의하기
  const oneSlave = getOneSlave();

  //-------------------------------------------------

  // redux store 에서 상태값 변경하는 action hook 불러오기
  const dispatch = useDispatch();

  // 에러 상태값으로 관리
  const [error, setError] = useState(null);

  // redux store 에서 선택한 직원 한 명의 정보를 표시하는 상태값 불러오기
  const showOneSlaveScheduleLogInfo = useSelector((state) => state.slave.showOneSlaveScheduleLogInfo);

  //-------------------------------------------------

  return (
    <>
        <div className={styles['content-box']}>

            <div className={styles['slaveInfoPage-HeaderBox']} >
                <div className={styles['slaveInfoPage-HeaderTitle']} > 직원상세정보 </div>
                <div className={styles['headerButton']} onClick={thisSlaveModifyHandler} > 직원수정 </div>
                <div className={styles['headerButton']} onClick={() => thisSlaveFiredHandler(oneSlave.slaveId)} > 직원퇴사 </div>
            </div>
            
            <div className={styles['slaveInfoPage-MiddleBox']}>
                <div className={styles['slaveInfoPage-leftBox']}>

                    <div className={styles['slaveInfoPage-leftSlaveInfo']}>
                        <div className={styles['slaveInfoPage-leftSlaveInfoTitle']}>
                            개인정보
                        </div>
                        <div className={styles['slaveInfoPage-leftSlaveInfoBox']}>
                            <div className={styles['slaveInfoPage-slaveInfoSubTitleBox']}>
                                <div> 이름 : </div>
                                <div> 직책 : </div>
                                <div> 전화번호 : </div>
                                <div> 생년월일 : </div>
                                <div> 입사일 : </div>
                            </div>
                            <div className={styles['slaveInfoPage-slaveInfoContentBox']}>
                                <div>{oneSlave.slaveName}</div>
                                <div>{oneSlave.slavePosition}</div>
                                <div>{oneSlave.slavePhoneNumber}</div>
                                <div>{oneSlave.slaveBirthday}</div>
                                <div>{oneSlave.slaveCreatedAt}</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles['slaveInfoPage-leftSlaveWage']}>
                        <div className={styles['slaveInfoPage-leftSlaveWageTitle']}>
                            급여정보
                        </div>
                        <div className={styles['slaveInfoPage-leftSlaveWageBox']}>
                            <div className={styles['slaveInfoPage-slaveWageTitleBox']}>
                                <div> 급여타입 : </div>
                                <div> 금액 : </div>
                            </div>
                            <div>
                                {oneSlave.wageList.filter(wage => !wage.wageEndDate) // wageEndDate가 없는 항목만 필터링
                                    .map((wage, index) => (
                                        <div key={index} className={styles['slaveInfoPage-SlaveInfoContentBox']}>
                                            {wage.slaveWageType}
                                        </div>
                                    ))
                                }

                                {oneSlave.wageList.filter(wage => !wage.wageEndDate) // wageEndDate가 없는 항목만 필터링
                                    .map((wage, index) => (
                                        <div key={index} className={styles['slaveInfoPage-SlaveInfoContentBox']}>
                                            {wage.slaveWageAmount}원
                                        </div>
                                    ))
                                }

                            </div>
                        </div>
                    </div>

                    <div className={styles['slaveInfoPage-leftSlaveSchedule']}>
                        <div className={styles['slaveInfoPage-leftSlaveScheduleTitle']}>
                            근무정보
                        </div>

                        <div className={styles['slaveInfoPage-leftSlaveScheduleBox']}>
                            <div className={styles['slaveInfoPage-slaveScheduleTitleBox']}>
                                <div> 근무타입 / </div>
                                <div> 요일 / </div>
                                <div> 출근시간 / </div>
                                <div> 퇴근시간 / </div>
                            </div>

                            <div>
                                {oneSlave.scheduleList.filter(schedule => schedule.scheduleEndDate === null) // scheduleEndDate가 null인 항목만 필터링
                                    .map((schedule, index) => (
                                        <div key={index}>
                                            {schedule.scheduleDay} : {schedule.scheduleStart} ~ {schedule.scheduleEnd}
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles['slaveInfoPage-rightBox']}>
                    <div className={styles['slaveInfoPage-rightSlaveScheduleLog']}>

                        <div className={styles['slaveInfoPage-rightSlaveScheduleLogTitle']}>
                            근무현황
                        </div>

                        <div className={styles['slaveInfoPage-rightSlaveScheduleLogBox']}>
                            
                            <SlaveInfoPageCommuteList commuteList={oneSlave.scheduleLogList} />
                            
                        </div>

                    </div>

                </div>
            </div>
        </div> 
    </>
  )
}

export default SlaveInfoPage
