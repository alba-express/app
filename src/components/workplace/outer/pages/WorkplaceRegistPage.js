import React, { useState, useEffect } from "react";
import axios from "axios";
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
    const [postalCode, setPostalCode] = useState(''); // 우편번호 상태 추가

    const userId = useAuth();

    const changeHandler = (setter) => (event) => {
        setter(event.target.value);
    };

    const cancelHandler = () => {
        window.location.href = '/workplace'; 
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        try {
            const newWorkplace = {
                businessNo,
                workplaceName,
                workplaceAddressCity,
                workplaceAddressStreet,
                workplaceAddressDetail,
                workplacePassword,
                workplaceSize,
                postalCode, // 우편번호 추가
                masterId: userId // 예시로 사용한 masterId
            };

            await axios.post('http://localhost:8877/workplace/register', newWorkplace);
            window.location.href = '/workplace'; // 예시로 사용한 이동
        } catch (error) {
            console.error('Error registering workplace:', error);
            alert('등록에 실패했습니다. 다시 시도해 주세요.');
        }
    };

    useEffect(() => {
        // Load the Kakao Postcode script
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
                    // Update postal code and address fields
                    setPostalCode(data.zonecode); // 우편번호 업데이트
                    setWorkplaceAddressCity(data.sido); // 시도
                    setWorkplaceAddressStreet(data.roadAddress); // 도로명 주소
                    setWorkplaceAddressDetail(''); // 상세주소 초기화

                    // Focus on the detail address input
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
                        onChange={changeHandler(setBusinessNo)}
                        required
                    />
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
