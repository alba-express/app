import React, {useState} from "react";
import styles from "./NoticePage.module.scss"
import {useNavigate} from "react-router-dom";
import NoticeModal from "./NoticeModal";

const NoticePage = () => {

    const notices = [
        {id: 1, title: "공지사항 1", content: "공지사항 1 내용입니다.", date: "2024-07-27"},
        {id: 2, title: "공지사항 2", content: "공지사항 2 내용입니다.", date: "2024-07-26"},
        {id: 3, title: "공지사항 3", content: "공지사항 3 내용입니다.", date: "2024-07-25"},
    ];

    const [isModalOpen, setIsModalOpen] = useState(true);
    const [selectedNotice, setSelectedNotice] = useState(null);

    const navigate = useNavigate();

    const writeHandler = e => {
        navigate("/detail/notice-register");
    };


    const openModal = (notice) => {
        setSelectedNotice(notice);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNotice(null);
    };

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
                    {/*<li>*/}
                    {/*    <h2 className={styles.title}>글제목2</h2>*/}
                    {/*    <span className={styles.date}>2024.7.30.</span>*/}
                    {/*</li>*/}
                    {/*<li>*/}
                    {/*    <h2 className={styles.title}>글제목3</h2>*/}
                    {/*    <span className={styles.date}>2024.7.30.</span>*/}
                    {/*</li>*/}

                    <ul>
                        {notices.map(notice => (
                            <li key={notice.id} onClick={() => openModal(notice)} className="notice">
                                <h2>{notice.title}</h2>
                                <p>{notice.content}</p>
                                <span>{notice.date}</span>
                            </li>
                        ))}
                    </ul>

                </ul>


            </div>
            <div className={styles.actions}>
                <button type="button" onClick={writeHandler}>작성</button>
            </div>

            {selectedNotice && (
                <NoticeModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title={selectedNotice.title}
                    content={selectedNotice.content}
                    date={selectedNotice.date}
                />
            )}

        </>
    );
};

export default NoticePage;
