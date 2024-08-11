import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './WorkplaceRegistPage.module.scss';
import useAuth from '../../../../hooks/useAuth';

const WorkplaceRegistPage = () => {
    const [businessNo, setBusinessNo] = useState('');
    const [workplaceName, setWorkplaceName] = useState('');
    const [workplaceAddressCity, setWorkplaceAddressCity] = useState('');
    const [workplaceAddressStreet, setWorkplaceAddressStreet] = useState('');
    const [workplaceAddressDetail, setWorkplaceAddressDetail] = useState('');
    const [workplacePassword, setWorkplacePassword] = useState('');
    const [workplaceSize, setWorkplaceSize] = useState(false);
    const [postalCode, setPostalCode] = useState('');
    const [error, setError] = useState('');
    
    const userId = useAuth();

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

    const changeHandler = (setter) => (event) => {
        setter(event.target.value);
    };

    const businessNoChangeHandler = (event) => {
        const value = event.target.value;
        setBusinessNo(formatBusinessNo(value));
        checkBusinessNoDuplicate(value);
    };

    const checkBusinessNoDuplicate = async (businessNo) => {
        console.log(businessNo);
        
        const normalizedBusinessNo = businessNo.replace(/-/g, '');
        
        try {
            const response = await axios.get(`http://localhost:8877/workplace/checkBusinessNo/${normalizedBusinessNo}`);
            if (response.data.exists) {
                setError('이미 등록된 사업장 등록번호입니다.');
            } else {
                setError('');
            }
        } catch (error) {
            console.error('Error checking business number:', error);
            setError('사업장 등록번호 검토 중 오류가 발생했습니다.');
        }
    };    

    const cancelHandler = () => {
        window.location.href = '/workplace'; 
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (error) {
            alert('사업장 등록번호가 중복됩니다.');
            return;
        }

        try {
            const newWorkplace = {
                businessNo,
                workplaceName,
                workplaceAddressCity,
                workplaceAddressStreet,
                workplaceAddressDetail,
                workplacePassword,
                workplaceSize,
                postalCode,
                masterId: userId
            };

            await axios.post('http://localhost:8877/workplace/register', newWorkplace);
            window.location.href = '/workplace';
        } catch (error) {
            console.error('Error registering workplace:', error);
            alert('등록에 실패했습니다. 다시 시도해 주세요.');
        }
    };

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
            <form onSubmit={submitHandler} className={styles.form}>
                <div className={styles.formHeader}>
                    <h1>사업장 등록</h1>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="businessNo">사업자 등록번호:</label>
                    <input
                        type="text"
                        id="businessNo"
                        value={businessNo}
                        onChange={businessNoChangeHandler}
                        maxLength={12}
                        placeholder="10자리 숫자만 입력하세요."
                        required
                    />
                    {error && <p className={styles.error}>{error}</p>}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="workplaceName">상호명:</label>
                    <input
                        type="text"
                        id="workplaceName"
                        value={workplaceName}
                        onChange={changeHandler(setWorkplaceName)}
                        required
                    />
                </div>
                <div className={styles.addressSection}>
                    <label className={styles.addressLabel} htmlFor="sample6_address">주소:</label>
                    <input 
                        type="text"
                        id="sample6_address"
                        placeholder="주소"
                        value={workplaceAddressStreet}
                        readOnly
                        className={styles.addressInput}
                    />
                    <button type="button" className={styles.searchButton} onClick={openAddressSearch}>
                        주소 찾기
                    </button>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="sample6_detailAddress">상세주소:</label>
                    <input
                        type="text"
                        id="sample6_detailAddress"
                        placeholder="상세주소"
                        value={workplaceAddressDetail}
                        onChange={changeHandler(setWorkplaceAddressDetail)}
                        required
                    />
                </div>
                <div className={styles.sizeSection}>
                    <div className={styles.formGroup}>
                        <label htmlFor="workplacePassword">간편비밀번호:</label>
                        <input
                            type="text"
                            id="workplacePassword"
                            value={workplacePassword}
                            onChange={changeHandler(setWorkplacePassword)}
                            maxLength={4}
                            placeholder="4자리 숫자로 입력하세요."
                            required
                        />
                    </div>
                    <div className={styles.sizeDropdown}>
                        <label className={styles.sizeLabel} htmlFor="workplaceSize">사업장 규모:</label>
                        <select
                            id="workplaceSize"
                            value={workplaceSize}
                            onChange={e => setWorkplaceSize(e.target.value === 'true')}
                        >
                            <option value={false}>5인 미만</option>
                            <option value={true}>5인 이상</option>
                        </select>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button type="button" className={styles.cancelButton} onClick={cancelHandler}>
                        취소
                    </button>
                    <button type="submit" className={styles.submitButton}>
                        등록
                    </button>
                </div>
            </form>
        </div>
    );
};

export default WorkplaceRegistPage;
