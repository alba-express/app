import React from "react";
import { Link } from "react-router-dom";

const InnerNavi = () => {
    return (
        <div
            style={{
                "background-color": "tomato",
                width: "20%",
                height: "100%",
                display: "inline-block",
            }}
        >
            <ul>
                <li><Link to="/detail">HOME!!</Link></li>
                <li><Link to="slave-manage">직원관리</Link></li>
                <li><Link to="wage-manage">급여관리</Link></li>
                <li><Link to="schedule-manage">일정관리</Link></li>
                <li><Link to="notice">공지사항</Link></li>
                <li><Link to="commute-manage">출퇴근관리</Link></li>
            </ul>
        </div>
    );
};

export default InnerNavi;
