import React, {useEffect, useState} from "react";
import styles from "./NoticePage.module.scss"
import {useNavigate} from "react-router-dom";
import NoticeModal from "./NoticeModal";
import {useDispatch, useSelector} from "react-redux";
import {noticeActions} from "../../../../store/notice-slice";

const NoticePage = () => {

    // const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(true);
    const [selectedNotice, setSelectedNotice] = useState(null);

    const dispatch = useDispatch();
    const notices = useSelector((state) => state.notice.noticeList);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch('http://localhost:8877/detail/notice');
                if(!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다.');
                }
                const data = await response.json();
                dispatch(noticeActions.setNotices(data));
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchNotices();
    }, [dispatch]);

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

    if (loading) return <div>Loading...</div>;  // 로딩 중일 때 표시할 내용
    if (error) return <div>Error: {error}</div>;  // 오류 발생 시 표시할 내용

    return (
        <>
            <div className={styles.noticeBoard}>
                <h1 className={styles.notice}>공지사항</h1>
            </div>

            <div className={styles.noticeList}>
                <ul className={styles.noticeList}>
                    {notices.map(notice => (
                        <li key={notice.id} onClick={() => openModal(notice)} className="notice">
                            <h2 >{notice.title}</h2>
                            <span>{notice.date}</span>
                        </li>
                    ))}
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
