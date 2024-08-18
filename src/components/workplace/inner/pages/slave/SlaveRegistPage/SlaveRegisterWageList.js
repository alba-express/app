import React, { useCallback, useEffect, useState } from 'react';
import styles from './SlaveRegisterWageList.module.scss';
import SlaveRegisterWageInsurance from './SlaveRegisterWageInsurance';

const SlaveRegisterWageList = ({ onWages }) => {
  
  // 급여정보리스트 기본 배열 설정하기
  // 급여타입(wageType): 1 --> 시급 / 0 --> 월급
  // 4대보험 적용여부(wageInsurance): true, 1 --> 적용 / false, 0 --> 미적용
                            // 급여타입, 급여금액,       4대보험적용여부
  const initialWageList = [{slaveWageType: '', slaveWageAmount: '', slaveWageInsurance: ''}];

  // 급여리스트 상태값으로 관리하기
  const [wageList, setWageList] = useState(initialWageList);

  // 급여방식선택에 따른 버튼 스타일 변경
  const getWageTypeClassName = (type) => {

    // 급여타입이 없는경우
    if (type === '') {
      return styles.nonWageType;

      // 급여타입이 'hourly'인 버튼 --> 급여리스트의 급여타입이 시급(true) 여부에 따라 스타일 변경하기
    } else if (type === 'hourly') {
      return wageList[0].slaveWageType === true ? styles.wageType : styles.nonWageType;

      // 급여타입이 'monthly'인 버튼 --> 급여리스트의 급여타입이 월급(false) 여부에 따라 스타일 변경하기
    } else if (type === 'monthly') {
      return wageList[0].slaveWageType === false ? styles.wageType : styles.nonWageType;
    }
  };

  //-------------------------------------------------

  // 시급 버튼 클릭이벤트
  const hourlyWageHandler = e => {

    // 이미 시급(true)이 클릭된 상태인 경우 재클릭이기 때문에 선택 초기화 (급여타입, 급여금액)
    if (wageList[0].slaveWageType === true) {
      setWageList([{ ...wageList[0], slaveWageType: '', slaveWageAmount: '' }]);

      // 아무것도 클릭을 안했었거나, 월급이 클릭됐었던 경우 급여타입 시급(true) 으로 변경, 급여금액 초기화
    } else {
      setWageList([{ ...wageList[0], slaveWageType: true, slaveWageAmount: '' }]);
    }
  };

  // 월급 버튼 클릭이벤트
  const monthlyWageHandler = e => {

    // 이미 월급(false)이 클릭된 상태인 경우 재클릭이기 때문에 선택 초기화 (급여타입, 급여금액)
    if (wageList[0].slaveWageType === false) {
      setWageList([{ ...wageList[0], slaveWageType: '', slaveWageAmount: '' }]);

      // 아무것도 클릭을 안했었거나, 시급이 클릭됐었던 경우 급여타입 월급(false) 으로 변경, 급여금액 초기화
    } else {
      setWageList([{ ...wageList[0], slaveWageType: false, slaveWageAmount: '' }]);
    }
  };

  //-------------------------------------------------

  // 시급 선택한 경우 시급input태그 입력내용을 급여리스트 상태에 반영하기
  const wageAmountHourlyHandler = e => {

    // 급여타입이 시급(true) 이면서 시급의 금액 입력창이 빈 것이 아닐경우
    if (wageList[0].slaveWageType === true && e.target.value !== '') {

      setWageList([{ ...wageList[0], slaveWageAmount: e.target.value }]);
    };
  };

  // 월급 선택한 경우 월급input태그 입력내용을 급여리스트 상태에 반영하기
  const wageAmountMonthlyHandler = e => {

    // 급여타입이 월급(false) 이면서 월급의 금액 입력창이 빈 것이 아닐경우
    if (wageList[0].slaveWageType === false && e.target.value !== '') {

      setWageList([{ ...wageList[0], slaveWageAmount: e.target.value }]);
    };
  };

  //-------------------------------------------------

  // 4대보험 컴포넌트로  함수 내려보내 4대보험 적용여부 받아오기
  const applyInsurance = useCallback((updatedWageInsurance) => {
    setWageList(prev => [{ ...prev[0], slaveWageInsurance: updatedWageInsurance }]);
  }, []);

  //-------------------------------------------------

  // 직원등록에서 내려온 함수에 급여리스트 담아서 올려보내기
  useEffect(() => {

    onWages(wageList);
    
  }, [wageList, onWages]);

  //-------------------------------------------------

  return (
    <>
      <div className={styles['slaveRegistPageWage-box']} >
        <div className={styles['slaveRegistPageWage-title']} > 급여정보 </div>

        <div className={styles['slaveRegistPageWage-contentBox']} >
          <div className={styles['slaveRegistPageWage-content']} >
            <label htmlFor="slaveWageTypeHourly" className={getWageTypeClassName('hourly')} >
              시급
              <input id="slaveWageTypeHourly" type="checkbox" style={{ display: 'none' }} onChange={hourlyWageHandler} />
            </label>

            <label htmlFor="slaveWageTypeMonthly" className={getWageTypeClassName('monthly')} >
              월급
              <input id="slaveWageTypeMonthly" type="checkbox" style={{ display: 'none' }} onChange={monthlyWageHandler} />
            </label>
          </div>

          <div className={styles['slaveRegistPageWage-content']} >
            {wageList[0].slaveWageType === '' ? null : (wageList[0].slaveWageType ? (
              <>
                <label htmlFor="hourly">
                  시급
                  <input id="hourly" className={styles['slaveRegistPageInputWage-input']} onChange={wageAmountHourlyHandler} value={wageList[0].slaveWageAmount}/>
                  원
                </label>
              </>
            ) : (
              <>
                <label htmlFor="monthly">
                  월급
                  <input id="monthly" className={styles['slaveRegistPageInputWage-input']} onChange={wageAmountMonthlyHandler} value={wageList[0].slaveWageAmount} />
                  원
                </label>
              </>
            ))}
          </div>
        </div>
      </div>

      {/* 4대보험 적용여부 */}
      <SlaveRegisterWageInsurance onApply={applyInsurance} />
    </>
  );
};

export default SlaveRegisterWageList;