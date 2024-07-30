import React from "react";
import { Link } from "react-router-dom";

const MainHeader = ({isHome}) => {
    return (
        <>
            {isHome && <Link to="/login">로그인페이지 이동</Link>}
            <p>메인헤더</p>
        </>
    );
};

export default MainHeader;
