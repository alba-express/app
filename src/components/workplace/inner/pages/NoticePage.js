import React from "react";
import styles from "./NoticePage.module.scss"
import {useNavigate} from "react-router-dom";

const NoticePage = () => {

    const navigate = useNavigate();

    const writeHandler = e => {
        navigate("/detail/notice-register");
    };

    // const NoticeBoard = () => {
    //     const notices = [
    //         {id: 1, title: "공지사항 1", content: "공지사항 1 내용입니다.", date: "2024-07-27"},
    //         {id: 2, title: "공지사항 2", content: "공지사항 2 내용입니다.", date: "2024-07-26"},
    //         {id: 3, title: "공지사항 3", content: "공지사항 3 내용입니다.", date: "2024-07-25"},
    //     ];

    return (
        <>
            <div className={styles.noticeBoard}>
                <h1>공지사항</h1>
            </div>

            <div className={styles.noticeList}>
                <ul className={styles.noticeList}>
                    <li>
                        <h2 className={styles.title}>글제목1</h2>
                        <span className={styles.date}>2024.7.30.</span>
                    </li>
                    <li>
                        <h2 className={styles.title}>글제목2</h2>
                        <span className={styles.date}>2024.7.30.</span>
                    </li>
                    <li>
                        <h2 className={styles.title}>글제목3</h2>
                        <span className={styles.date}>2024.7.30.</span>
                    </li>

                    {/*<ul>*/}
                    {/*    {notices.map(notice => (*/}
                    {/*        <li key={notice.id} className="notice">*/}
                    {/*            <h2>{notice.title}</h2>*/}
                    {/*            <p>{notice.content}</p>*/}
                    {/*            <span>{notice.date}</span>*/}
                    {/*        </li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}

                </ul>


            </div>
            <div className={styles.actions}>
                <button type="button" onClick={writeHandler}>작성</button>
            </div>


        </>
    );
};

export default NoticePage;
