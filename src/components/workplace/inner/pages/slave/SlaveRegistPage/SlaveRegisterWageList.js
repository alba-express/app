import React, { useCallback, useEffect, useState } from 'react';
import { ToggleButton, ButtonGroup } from 'react-bootstrap';
import styles from './SlaveRegisterWageList.module.scss';
import SlaveRegisterWageInsurance from './SlaveRegisterWageInsurance';

const SlaveRegisterWageList = ({ onWages }) => {

  const initialWageList = [{ slaveWageType: null, slaveWageAmount: '', slaveWageInsurance: null }];
  const [wageList, setWageList] = useState(initialWageList);
  const [selectedWageType, setSelectedWageType] = useState('');

  const handleWageTypeChange = (type) => {
    if (type === selectedWageType) {
      setSelectedWageType(''); // 동일한 타입 클릭 시 선택 해제
      setWageList([{ ...wageList[0], slaveWageType: '', slaveWageAmount: '' }]);
    } else {
      setSelectedWageType(type);
      setWageList([{ ...wageList[0], slaveWageType: type === 'hourly', slaveWageAmount: '' }]);
    }
  };

  const wageAmountHandler = (e) => {
    if (selectedWageType !== '') {
      setWageList([{ ...wageList[0], slaveWageAmount: e.target.value }]);
    }
  };

  const applyInsurance = useCallback((updatedWageInsurance) => {
    setWageList(prev => [{ ...prev[0], slaveWageInsurance: updatedWageInsurance }]);
  }, []);

  useEffect(() => {
    onWages(wageList);
  }, [wageList, onWages]);

  const activeStyle = {
    backgroundColor: 'rgba(0, 139, 134, 0.8)',
    borderColor: 'rgba(0, 139, 134, 0.8)',
    color: 'white',
    boxShadow: 'inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)',
  };

  const inactiveStyle = {
    backgroundColor: 'rgba(65, 63, 63, 0.7)',
    borderColor: 'rgba(65, 63, 63, 1)',
    color: 'white',
    boxShadow: 'inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5), 7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1)',
  };

  return (
      <>
        <div className={styles['slaveRegistPageWage-box']}>
          <div className={styles['slaveRegistPageWage-title']}>급여정보</div>
          <div className={styles['slaveRegistPageWage-contentBox']}>
            <ButtonGroup className={styles['slaveRegistPageWage-content']}>
              <ToggleButton
                  type="radio"
                  value="hourly"
                  checked={selectedWageType === 'hourly'}
                  onClick={() => handleWageTypeChange('hourly')}
                  style={selectedWageType === 'hourly' ? activeStyle : inactiveStyle}
              >
                시급
              </ToggleButton>
              <ToggleButton
                  type="radio"
                  value="monthly"
                  checked={selectedWageType === 'monthly'}
                  onClick={() => handleWageTypeChange('monthly')}
                  style={selectedWageType === 'monthly' ? activeStyle : inactiveStyle}
              >
                월급
              </ToggleButton>
            </ButtonGroup>

            <div className={styles['slaveRegistPageWage-content']}>
              {selectedWageType === '' ? null : (
                  <label htmlFor={selectedWageType}>
                    {selectedWageType === 'hourly' ? '시급' : '월급'}
                    <input
                        id={selectedWageType}
                        className={styles['slaveRegistPageInputWage-input']}
                        onChange={wageAmountHandler}
                        value={wageList[0].slaveWageAmount}
                    />
                    원
                  </label>
              )}
            </div>
          </div>
        </div>
        <SlaveRegisterWageInsurance onApply={applyInsurance} />
      </>
  );
};

export default SlaveRegisterWageList;
