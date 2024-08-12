import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { faL } from "@fortawesome/free-solid-svg-icons";

const InnerMainPage = () => {
    const [workplaceInfo, setWorkplaceInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // const workplaceIdByStore = useSelector((state => state.workplace.workplaceId));

    // 로컬 스토리지에서 workplaceId 가져와 쓰기
    const workplaceIdByStore = localStorage.getItem('workplaceId'); 

    useEffect(() => {
        const fetchWorkplaceInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8877/workplace/${workplaceIdByStore}`);
                const workplace = response.data;

                if (workplace) {
                    setWorkplaceInfo(workplace);
                } else {
                    console.error('No data found for the given ID');
                    alert('업장 정보를 가져오는데 실패했습니다.');
                }
            } catch (error) {
                console.error('Error fetching workplace data:', error);
                alert('업장 정보를 가져오는데 실패했습니다.');
            } finally {
                // 데이터 로딩이 완료된 후 로컬 스토리지 삭제 시키기
                setLoading(false);
            }
        };

        if (workplaceIdByStore) {
            fetchWorkplaceInfo();
        } 
    }, [workplaceIdByStore]);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    if (!workplaceInfo) {
        return <div>사업장 정보를 가져오는데 실패했습니다.</div>;
    }

    return (
        <>
            <h1>업장관리페이지시작점</h1>
            <h2>해당 사업장 정보들</h2>
            <p>업장 ID: {workplaceIdByStore}</p>
            <p>사업장명: {workplaceInfo.workplaceName}</p>
            <p>사업자 등록번호: {workplaceInfo.businessNo}</p>
            <p>주소: {`${workplaceInfo.workplaceAddressStreet} ${workplaceInfo.workplaceAddressDetail}`}</p>
            <p>간편비밀번호: {workplaceInfo.workplacePassword}</p>
            <p>사업장 규모: {workplaceInfo.workplaceSize ? '5인 이상' : '5인 미만'}</p>
        </>
    );
};

export default InnerMainPage;
