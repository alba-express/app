import React, { useEffect, useState } from 'react'
import styles from './SlaveInfoPage.module.scss';
import { Link, useLocation } from "react-router-dom";
import SlaveInfoPageCommuteList from './slave/SlaveInfoPageCommuteList';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { slaveActions } from '../../../../store/slave-slice';

const SlaveInfoPage = () => {

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

        if (slaveId) {
            fetchSlaveInfo();
          } else {
            setError('직원 ID가 전달되지 않았습니다.');
        }

        // console.log(showOneSlaveInfo);

    }, [slaveId, dispatch]);

    if (error) {
      return <div>Error: {error}</div>;
    }

    //-------------------------------------------------

  return (
    <>
        <div className={styles['content-box']}>
            <div className={styles['slaveInfoPage-HeaderBox']} >
                <div className={styles['slaveInfoPage-HeaderTitle']} > 직원상세정보 </div>
                <Link to="/detail/slave-modify" className={styles['link-text']}> 
                    <button className={styles['headerButton']} > 직원수정 </button>
                </Link>
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
                                <div>{showOneSlaveInfo.slaveName}</div>
                                <div>{showOneSlaveInfo.slavePosition}</div>
                                <div>{showOneSlaveInfo.slavePhoneNumber}</div>
                                <div>{showOneSlaveInfo.slaveBirthday}</div>
                                <div>{showOneSlaveInfo.slaveCreatedAt}</div>
                            </div>
                        </div>
                    </div>
                    <div className={styles['slaveInfoPage-SlaveWageBox']}>
                        <div className={styles['slaveInfoPage-SlaveWageTitle']}> 급여타입 / 금액 </div>
                        <div className={styles['slaveInfoPage-SlaveInfoContentBox']} > 시급 10000원 </div>
                    </div>
                </div>
                <div>
                    <div className={styles['slaveInfoPage-SlaveScheduleBox']}>
                        <div className={styles['slaveInfoPage-SlaveScheduleTitle']}> 고정근무시간 </div>
                        <div className={styles['slaveInfoPage-SlaveScheduleContentBox']} >
                            <div>요일 /  시간</div>
                            <div>월 : 09:00 ~ 18:00</div>
                            <div>화 : 09:00 ~ 18:00</div>
                            <div>수 : 09:00 ~ 18:00</div>
                            <div>목 : 09:00 ~ 18:00</div>
                            <div>금 : 09:00 ~ 18:00</div>
                            <div>토 : 09:00 ~ 18:00</div>
                            <div>일 : 09:00 ~ 18:00</div>
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
