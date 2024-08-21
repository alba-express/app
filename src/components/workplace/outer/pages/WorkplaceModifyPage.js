import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from './WorkplaceModifyPage.module.scss';
import useAuth from "../../../../hooks/useAuth";

const WorkplaceModifyPage = () => {
  const [businessNo, setBusinessNo] = useState('');
  const [workplaceName, setWorkplaceName] = useState('');
  const [workplaceAddressCity, setWorkplaceAddressCity] = useState('');
  const [workplaceAddressStreet, setWorkplaceAddressStreet] = useState('');
  const [workplaceAddressDetail, setWorkplaceAddressDetail] = useState('');
  const [workplacePassword, setWorkplacePassword] = useState('');
  const [workplaceSize, setWorkplaceSize] = useState(false);
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState('');

  const [isBusinessNoValid, setIsBusinessNoValid] = useState(true);
  const [isDuplicate, setIsDuplicate] = useState(false); // 중복 여부 관리

  const userId = useAuth();

  const navigate = useNavigate();
  const workplaceIdByStore = localStorage.getItem('workplaceId');

  useEffect(() => {
    // 사업장 아이디로 업장 정보 가져오기
    const fetchWorkplace = async (id) => {

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
          alert('업장 정보를 가져오는데 실패했습니다.');
        }
      } catch (error) {
        alert('업장 정보를 가져오는데 실패했습니다.');
      }
    };

    fetchWorkplace(workplaceIdByStore);
  }, [workplaceIdByStore]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
        if (window.daum && window.daum.Postcode) {
            window.daum.Postcode = window.daum.Postcode || {};
        }
    };
    document.body.appendChild(script);

    return () => {
        document.body.removeChild(script);
    };
}, []);

  const formatBusinessNo = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 3) {
      return numbers;
    } else if (numbers.length <= 5) {
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
    } else {
      return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 10)}`;
    }
  };

  const businessNoChangeHandler = async (event) => {
    const value = event.target.value;
    setBusinessNo(formatBusinessNo(value));
    checkBusinessNoDuplicate(value);
  };

  const checkBusinessNoDuplicate = async (normalizedBusinessNo) => {
    console.log('Checking business number:', normalizedBusinessNo);

    if (normalizedBusinessNo.length !== 12) {
        setIsBusinessNoValid(false);
        setError('사업장 등록번호는 10자리여야 합니다.');
        return;
    }
    setIsBusinessNoValid(true);

    try {
        const response = await axios.get(`http://localhost:8877/workplace/checkBusinessNo/${userId}/${normalizedBusinessNo}`);
        if (response.data.exists) {
            setIsDuplicate(true); // 중복 상태 설정
            setError('이미 등록된 사업장 등록번호입니다.');
        } else {
            setIsDuplicate(false); // 중복 상태 해제
            setError('');
        }
    } catch (error) {
        console.error('Error checking business number:', error.response || error);
        setError('사업장 등록번호 검토 중 오류가 발생했습니다.');
    }
};

  const changeHandler = (setter) => (event) => {
    setter(event.target.value);
  };

  const cancelHandler = () => {
    navigate('/workplace', {replace: true});
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (error) {
      alert('사업장 등록번호가 중복됩니다.');
      return;
    }

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

      // 수정 완료 후 WorkplaceListPage로 이동, 히스토리 스택을 대체하여 중간 페이지 제거함
      navigate('/workplace', { replace: true });
    } catch (error) {
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

  const errorStyle = (message) => {
    if (message === '이미 등록된 사업장 등록번호입니다.') {
        return styles.errorRed;
    }
    return styles.error;
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
            onChange={businessNoChangeHandler}
            maxLength={12}
            minLength={12}
            placeholder="10자리 숫자만 입력하세요."
            required
          />
          {error && <p className={errorStyle(error)}>{error}</p>}
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
            <button type="button" className={styles.searchButton} onClick={openAddressSearch}>
                주소 찾기
            </button>
            <input
              type="text"
              id="sample6_address"
              placeholder="주소"
              value={workplaceAddressStreet}
              readOnly
              className={styles.addressInput}
            />
          </div>
          {/* <input
            type="button"
            onClick={openAddressSearch}
            value="주소 찾기"
          /> */}
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
            minLength={4}
            placeholder="4자리 숫자를 입력하세요."
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
          <button type="submit">수정</button>
          <button type="submit" onClick={cancelHandler}>취소</button>
        </div>
      </form>
    </div>
  );
};

export default WorkplaceModifyPage;
