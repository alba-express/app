import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from './WorkplaceModifyPage.module.scss'
import { useSelector } from "react-redux";

const WorkplaceModifyPage = () => {
  const [businessNo, setBusinessNo] = useState('');
  const [workplaceName, setWorkplaceName] = useState('');
  const [workplaceAddressCity, setWorkplaceAddressCity] = useState('');
  const [workplaceAddressStreet, setWorkplaceAddressStreet] = useState('');
  const [workplaceAddressDetail, setWorkplaceAddressDetail] = useState('');
  const [workplacePassword, setWorkplacePassword] = useState('');
  const [workplaceSize, setWorkplaceSize] = useState(false);
  const [postalCode, setPostalCode] = useState('');

  const navigate = useNavigate();
  // const { id } = useParams(); // 업장 ID param

  const workplaceIdByStore = useSelector((state) => state.workplace.workplaceId);

  useEffect(() => {
    // console.log(id);
    
    const fetchWorkplace = async (id) => {
        // console.log('async:', id);
        
        try {
            const response = await axios.get(`http://localhost:8877/workplace/${workplaceIdByStore}`);
            const workplace = response.data;

            if (workplace) {
                setBusinessNo(workplace.businessNo || '');
                setWorkplaceName(workplace.workplaceName || '');
                setWorkplaceAddressCity(workplace.workplaceAddressCity || '');
                setWorkplaceAddressStreet(workplace.workplaceAddressStreet || '');
                setWorkplaceAddressDetail(workplace.workplaceAddressDetail || '');
                setWorkplacePassword(workplace.workplacePassword || '');
                setWorkplaceSize(workplace.workplaceSize || false);
                setPostalCode(workplace.postalCode || '');
            } else {
                console.error('No data found for the given ID');
                alert('업장 정보를 가져오는데 실패했습니다.');
            }
        } catch (error) {
            console.error('Error fetching workplace data:', error);
            alert('업장 정보를 가져오는데 실패했습니다.');
        }
    };

    fetchWorkplace(workplaceIdByStore);
  }, [workplaceIdByStore]);

  const changeHandler = (setter) => (event) => {
    setter(event.target.value);
  };

  const cancelHandler = () => {
    navigate('/workplace');
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
        const updatedWorkplace = {
            workplaceIdByStore,
            businessNo,
            workplaceName,
            workplaceAddressCity,
            workplaceAddressStreet,
            workplaceAddressDetail,
            workplacePassword,
            workplaceSize,
            postalCode
        };

        await axios.put(`http://localhost:8877/workplace/modify/${workplaceIdByStore}`, updatedWorkplace);
        navigate('/workplace');
    } catch (error) {
        console.error('Error updating workplace:', error);
        alert('업장 정보를 수정하는데 실패했습니다.');
    }
};

  const openAddressSearch = () => {
    if (window.daum && window.daum.Postcode) {
      new window.daum.Postcode({
        oncomplete: function(data) {
          setPostalCode(data.zonecode);
          setWorkplaceAddressCity(data.sido);
          setWorkplaceAddressStreet(data.roadAddress);
          setWorkplaceAddressDetail('');

          document.getElementById("sample6_detailAddress").focus();
        }
      }).open();
    } else {
      console.error("Kakao Postcode script not loaded.");
    }
  };

  return (
    <div className={styles.container}>
      <h1>사업장 수정</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="businessNo">사업자 등록번호: </label>
          <input
            type="text"
            id="businessNo"
            value={businessNo}
            onChange={changeHandler(setBusinessNo)}
            required
          />
        </div>
        <div>
          <label htmlFor="workplaceName">상호명: </label>
          <input
            type="text"
            id="workplaceName"
            value={workplaceName}
            onChange={changeHandler(setWorkplaceName)}
            required
          />
        </div>
        <div className={styles.addressGroup}>
          <div>
            <label htmlFor="sample6_address">주소: </label>
            <input
              type="text"
              id="sample6_address"
              placeholder="주소"
              value={workplaceAddressStreet}
              readOnly
            />
          </div>
          <input
            type="button"
            onClick={openAddressSearch}
            value="주소 찾기"
          />
        </div>
        <div>
          <label htmlFor="sample6_detailAddress">상세주소: </label>
          <input
            type="text"
            id="sample6_detailAddress"
            placeholder="상세주소"
            value={workplaceAddressDetail}
            onChange={changeHandler(setWorkplaceAddressDetail)}
            required
          />
        </div>
        <div className={styles.pwd}>
          <label htmlFor="workplacePassword">간편비밀번호: </label>
          <input
            type="text"
            id="workplacePassword"
            value={workplacePassword}
            onChange={changeHandler(setWorkplacePassword)}
            required
          />
        </div>
        <div>
          <label htmlFor="workplaceSize">사업장 규모: </label>
          <select
            id="workplaceSize"
            value={workplaceSize}
            onChange={e => setWorkplaceSize(e.target.value === 'true')}
          >
            <option value={false}>5인 미만</option>
            <option value={true}>5인 이상</option>
          </select>
        </div>
        <div className={styles.buttonGroup}>
          <button type="button" onClick={cancelHandler}>취소</button>
          <button type="submit">수정</button>
        </div>
      </form>
    </div>
  );
};

export default WorkplaceModifyPage;
