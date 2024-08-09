import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainHeader from "../app-layout/MainHeader";
import { getUserId } from "../../utils/auth"; // auth 유틸리티 함수 가져오기

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const userId = getUserId();
        if (userId) {
            // 로그인된 상태라면 /workplace로 리다이렉트
            navigate('/workplace');
        }
    }, [navigate]);

    return (
        <>
            <MainHeader isHome={true}/>
            <p>설명충 페이지</p>
        </>
    );
};

export default Home;
