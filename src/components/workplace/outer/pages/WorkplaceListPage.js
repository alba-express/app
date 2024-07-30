import React from "react";
import { Link } from "react-router-dom";

const WorkplaceListPage = () => {
    return (
        <>
            <p>업장리스트 페이지 구성</p>
            <Link to="modify">수정페이지 이동예시</Link>
            <Link to="regist">등록페이지 이동예시</Link>
        </>
    );
};

export default WorkplaceListPage;
