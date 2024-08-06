import React, {useEffect, useState} from "react";
import styles from "./NoticeRegistPage.module.scss"
import {Form, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {noticeActions} from "../../../../store/notice-slice";

const NoticeRegisterPage = () => {

    const [currentDate, setCurrentDate] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log('form 제출');

        const formData = new FormData(e.target);
        console.log('form: ', formData.get('title'));

        const payload = {
            title: formData.get('title'),
            content: formData.get('content'),
            date: currentDate,
        };

        console.log('payload: ', payload);

        const token = localStorage.getItem('token');

        const response = await fetch('http://localhost:8877/detail/notice-register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json();
            console.log('응답 데이터: ', data);
            dispatch(noticeActions.addNotice(data));

            navigate("/detail/notice");
        }
            throw new Error('네트워크 응답이 올바르지 않습니다.');

    };

    return (
        <Form method='POST' onSubmit={submitHandler} noValidate>
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

                <div className={styles.info}>
                    {/*<p className={styles.hidden}>*/}
                    {/*    <label htmlFor="workplaceId">{workplaceId}</label>*/}
                    {/*    <span>사업장명</span>*/}
                    {/*    /!*<span>{workplaceName}</span>*!/*/}
                    {/*    <input type="hidden" id="workplaceId" name="workplaceId" value={workplaceId}/>*/}
                    {/*    /!*<input type="hidden" id="workplace" name="workplace" value={workplaceName}/>*!/*/}
                    {/*</p>*/}
                    <p className={styles.hidden}>
                        <label htmlFor="date">작성일</label>
                        <span>{currentDate}</span>
                        <input type="hidden" id="date" name="date" value={currentDate}/>
                    </p>
                </div>

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
