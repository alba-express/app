import React, {useEffect, useState} from "react";
import styles from "./NoticeRegistPage.module.scss"
import {Form, useNavigate} from "react-router-dom";
import {DETAIL_URL} from "../../../../config/host-config";

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

    const submitHandler = e => {
        e.preventDefault();
        console.log('form 제출');

        const formData = new FormData(e.target);
        console.log('form: ', formData.get('title'));

        const payload = {
            title: formData.get('title'),
            content: formData.get('content'),
            date: currentDate
        };

        console.log('payload: ', payload);

        (async () => {
            const response = await fetch('http://localhost:8877/detail/notice-register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            navigate("/detail/notice");
        }) ();
    };

    return (
        <Form method='POST' onSubmit={submitHandler}>
            <div className={styles.notice}>
                <h1>공지사항 등록</h1>
            </div>
            <div className={styles.write}>
                <p>
                    <label htmlFor="title">제목</label>
                    <input id="title" type="text" name="title"/>
                </p>
                <p>
                    <label htmlFor="content">내용</label>
                    <textarea id="content" name="content" rows="5"/>
                </p>

                {/*<p>*/}
                {/*    <label htmlFor="workplace">작성자</label>*/}
                {/*    <input id="workplace" name="workplace"/>*/}
                {/*</p>*/}
                {/*<p>*/}
                {/*    <label htmlFor="date">작성일</label>*/}
                {/*    <span id="date" name="date" value={currentDate}></span>*/}
                {/*</p>*/}

            </div>
            <div className={styles.actions}>
                <button type="button" onClick={cancelHandler}> 취소</button>
                {/*<button>{method === 'post' ? '등록' : '수정'}</button>*/}
                <button>등록</button>
            </div>
        </Form>
    );
};

export default NoticeRegisterPage;
