import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useWorkplaceId from "../../../../hooks/useWorkplaceId";
import { useSelector } from "react-redux";

const InnerMainPage = () => {
    // const workplaceId = useWorkplaceId();

    // 사업장 아이디 가져가서 쓰기
    const workplaceIdByStore = useSelector((state) => state.workplace.workplaceId);
    console.log("스토어에서 셀렉터로 꺼내온 아아디:", workplaceIdByStore)

    const [workplaceInfo, setWorkplaceInfo] = useState(null);

    useEffect(() => {
        const fetchWorkplaceInfo = async () => {
            console.log('async:', workplaceIdByStore);
            
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
            }
        };

        if (workplaceIdByStore) {
            fetchWorkplaceInfo();
        }
    }, [workplaceIdByStore]);

    if (!workplaceInfo) {
        return <div>Loading...</div>;
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
