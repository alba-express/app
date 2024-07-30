import React from "react";
import { Link } from "react-router-dom";

const MainHeader = ({isHome}) => {
    return (
        <>
            <p>메인헤더</p>
            {isHome && <Link to="/login">로그인페이지 이동</Link>}
            
        </>
    );
};

export default MainHeader;
