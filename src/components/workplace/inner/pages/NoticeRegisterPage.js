import React, {useEffect, useState} from "react";
import styles from "./NoticeRegistPage.module.scss"
import {useNavigate} from "react-router-dom";

const NoticeRegisterPage = () => {

    const [currentDate, setCurrentDate] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        setCurrentDate(`${yyyy}-${mm}-${dd}`);
    }, []);

    const cancelHandler = e => {
        navigate("/detail/notice");
    };

    return (
        <>
            <div className={styles.notice}>
                <h1>공지사항 등록</h1>
            </div>
            <div className={styles.write}>
                <p>
                    <label htmlFor="title">제목</label>
                    <input id="title" type="text" name="title"/>
                </p>
                {/*<p>*/}
                {/*    <label htmlFor="date">작성일</label>*/}
                {/*    <span id="date" name="date" value={currentDate}></span>*/}
                {/*</p>*/}
                <p>
                    <label htmlFor="description">내용</label>
                    <textarea id="description" name="description" rows="5"/>
                </p>
            </div>
            <div className={styles.actions}>
                <button type="button" onClick={cancelHandler} > 취소 </button>
                {/*<button>{method === 'post' ? '등록' : '수정'}</button>*/}
                <button>등록</button>
            </div>


        </>
    );
};

export default NoticeRegisterPage;
