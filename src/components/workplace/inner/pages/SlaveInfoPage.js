import React, { useEffect } from 'react'
import styles from './SlaveInfoPage.module.scss';
import { useNavigate } from "react-router-dom";
import SlaveInfoPageCommuteList from './slave/SlaveInfoPageCommuteList';

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

    // oneSlave 정의하기
    const oneSlave = getOneSlave();

    //-------------------------------------------------

    // showOneSlaveInfo가 로드되지 않았을 때 로딩 상태를 표시하거나 에러를 처리

    useEffect(() => {console.log("나오니?", oneSlave);
    }, [oneSlave]);

    // 페이지를 이동시킬때 사용하는 useNavigate 생성하기
    const navigate = useNavigate();

    // 직원수정버튼을 클릭했을 때 해당 직원의 정보수정페이지로 이동하기
    const thisSlaveModifyHandler = async () => {

      // 상세정보페이지로 이동, 해당 직원의 id를 상태로 전달하기
      navigate(`/detail/slave-modify`);
    };

    //-------------------------------------------------

  return (
    <>
        <div className={styles['content-box']}>
            <div className={styles['slaveInfoPage-HeaderBox']} >
                <div className={styles['slaveInfoPage-HeaderTitle']} > 직원상세정보 </div>
                <div className={styles['headerButton']} onClick={thisSlaveModifyHandler} > 직원수정 </div>
            </div>
            <div className={styles['slaveInfoPage-MiddleBox']}>
                <div>
                    <div className={styles['slaveInfoPage-SlaveInfoBox']}>
                        <div className={styles['slaveInfoPage-SlaveInfoTitle']}> 개인정보 </div>
                        <div className={styles['slaveInfoPage-SlaveInfoContentBox']}>
                            <div className={styles['slaveInfoPage-SlaveInfoContentTitle']}>
                                <div> 이름 : </div>
                                <div> 직책 : </div>
                                <div> 전화번호 : </div>
                                <div> 생년월일 : </div>
                                <div> 입사일 : </div>
                            </div>
                            <div className={styles['slaveInfoPage-SlaveInfoContentContent']}>
                                <div>{oneSlave.slaveName}</div>
                                <div>{oneSlave.slavePosition}</div>
                                <div>{oneSlave.slavePhoneNumber}</div>
                                <div>{oneSlave.slaveBirthday}</div>
                                <div>{oneSlave.slaveCreatedAt}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['slaveInfoPage-SlaveWageBox']}>
                        <div className={styles['slaveInfoPage-SlaveWageTitle']}> 급여타입 / 금액 </div>
                        {oneSlave.wageList.map((wage, index) => (
                                <div key={index} className={styles['slaveInfoPage-SlaveInfoContentBox']}>
                                    {wage.slaveWageType}, {wage.slaveWageAmount}
                                </div>
                            ))}
                        
                    </div>
                </div>
                <div>
                    <div className={styles['slaveInfoPage-SlaveScheduleBox']}>
                        <div className={styles['slaveInfoPage-SlaveScheduleTitle']}> 고정근무시간 </div>
                        <div className={styles['slaveInfoPage-SlaveScheduleContentBox']} >
                            <div>요일 /  시간</div>
                            {oneSlave.scheduleList.map((schedule, index) => (
                                <div key={index}> {schedule.scheduleDay} : {schedule.scheduleStart} ~ {schedule.scheduleEnd} </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className={styles['slaveInfoPage-SlaveNothingBox']}>
                        <div className={styles['slaveInfoPage-SlaveNothingTitle']}> 임시제목 </div>
                        <div className={styles['slaveInfoPage-SlaveNothingContentBox']}> 임시내용 </div>
                    </div>
                </div>
            </div>
            <div className={styles['slaveInfoPage-BottomBox']} >
                <div className={styles['slaveInfoPage-BottomTitle']}> 근태정보 </div>
                <SlaveInfoPageCommuteList />
            </div>
        </div>
    </>
  )
}

export default SlaveInfoPage
