import React, {useEffect, useState} from 'react';
import styles from "./NoticeRegistPage.module.scss";
import {Form, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {noticeActions} from "../../../../store/notice-slice";
import NoticeModal from "./NoticeModal";

const NoticeEditPage = () => {

    const currentNotice = useSelector(state => state.notice.currentNotice);
    const [title, setTitle] = useState(currentNotice?.title || "");
    const [content, setContent] = useState(currentNotice?.content || "");

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
        console.log('form 수정 제출');

        const payload = {
            id: currentNotice.id,
            title,
            content,
            date: currentDate
        };

        console.log('payload: ', payload);

        const response = await fetch('http://localhost:8877/detail/notice/${currentNotice.id}', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if(response.ok) {
            const updateNotice = await response.json();
            dispatch(noticeActions.updateNotice(updateNotice));
            navigate("/detail/notice");
        } else {
            console.error('수정 실패');
        }

    };

    return (
        <Form method='PATCH' onSubmit={submitHandler} noValidate>
            <div className={styles.notice}>
                <h1>공지사항 수정</h1>
            </div>
            <div className={styles.write}>
                <p>
                    <label htmlFor="title">제목</label>
                    <input id="title" type="text" name="title"
                    value={title} onChange={(e) => setTitle(e.target.value)}/>
                </p>
                <p>
                    <label htmlFor="content">내용</label>
                    <textarea id="content" name="content" rows="5"
                    value={content} onChange={(e) => setContent(e.target.value)}/>
                </p>

                <div className={styles.info}>

                    <p className={styles.hidden}>
                        <label htmlFor="date">작성일</label>
                        <span>{currentDate}</span>
                        <input type="hidden" id="date" name="date" value={currentDate}/>
                    </p>
                </div>

            </div>
            <div className={styles.actions}>
                <button type="button" onClick={cancelHandler}> 취소</button>
                <button>수정</button>
            </div>
        </Form>
    );
};

export default NoticeEditPage;