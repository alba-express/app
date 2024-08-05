import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const WorkplaceRegistPage = () => {
    const [businessNo, setBusinessNo] = useState('');
    const [workplaceName, setWorkplaceName] = useState('');
    const [workplaceAddressCity, setWorkplaceAddressCity] = useState('');
    const [workplacePassword, setWorkplacePassword] = useState('');

    const navigation = useNavigate();

    const changeHandler = (setter) => (event) => {
        setter(event.target.value)
    };

    const cancelHandler = () => {
        navigation('/workplace')
    };
    const submitHandler = () => {
        navigation('/workplace')
    };

    return (
        // <p>업장 등록 페이지 구성</p>
<>
        <form>
            <div>
                <label htmlFor="businessNo">사업자 등록번호: </label>
                <input
                type="businessNo"
                id="businessNo"
                value={businessNo}
                onChange={changeHandler(setBusinessNo)}
                required/>
            </div>
            <div>
                <label htmlFor="workplaceName">상호명: </label>
                <input
                type="workplaceName"
                id="workplaceName"
                value={workplaceName}
                onChange={changeHandler(setWorkplaceName)}
                required/>
            </div>
            <div>
                <label htmlFor="workplaceAddressCity">주소: </label>
                <input
                type="workplaceAddressCity"
                id="workplaceAddressCity"
                value={workplaceAddressCity}
                onChange={changeHandler(setWorkplaceAddressCity)}
                required/>
            </div>
            <div>
                <label htmlFor="workplacePassword">간편비밀번호: </label>
                <input
                type="workplacePassword"
                id="workplacePassword"
                value={workplacePassword}
                onChange={changeHandler(setWorkplacePassword)}
                required/>
            </div>
        </form>
            
              <button onClick={cancelHandler}>취소</button>
              <button onClick={submitHandler}>등록</button>
            
        
</>
    );
};

export default WorkplaceRegistPage;
