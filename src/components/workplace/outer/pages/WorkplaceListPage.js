import React from "react";
import { Link, useNavigate } from "react-router-dom";
import MainHeader from "../../../app-layout/MainHeader";
import { removeUserToken } from "../../../../utils/auth";

const WorkplaceListPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // JWT 토큰 삭제
        removeUserToken();
        // 로그인 페이지로 리다이렉트
        navigate("/login");
    };

    return (
        <>
            <MainHeader isHome={false} />
            <p>업장리스트 페이지 구성</p>
            <Link to="modify">수정페이지 이동예시</Link>
            <Link to="regist">등록페이지 이동예시</Link>
            <button onClick={handleLogout}>
                로그아웃
            </button>
        </>
    );
};

export default WorkplaceListPage;
