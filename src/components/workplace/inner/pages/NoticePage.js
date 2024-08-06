import React, {useEffect, useState} from "react";
import styles from "./NoticePage.module.scss"
import {useNavigate} from "react-router-dom";
import NoticeModal from "./NoticeModal";
import {useDispatch, useSelector} from "react-redux";
import {noticeActions} from "../../../../store/notice-slice";
import useAuth from "../../../../hooks/useAuth";

const NoticePage = () => {

    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedNotice, setSelectedNotice] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [workplaceId, setWorkplaceId] = useState("123");

    const dispatch = useDispatch();
    const notices = useSelector((state) => state.notice.noticeList);

    const navigate = useNavigate();
    const userId = useAuth();

    useEffect(() => {
        const fetchNotices = async () => {

            try {
                const response = await fetch(`http://localhost:8877/detail/notice?workplaceId=${workplaceId}&page=${currentPage}`);
                if (!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다.');
                }
                const data = await response.json();
                console.log("data:", data);
                dispatch(noticeActions.setNotices(data.noticeList));
                console.log("Fetched data:", data.noticeList);
            } catch (error) {
                setError(error.message);
            }
        };
        fetchNotices();
    }, [dispatch, currentPage, workplaceId]);

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

    if (error) return <div>Error: {error}</div>;  // 오류 발생 시 표시할 내용

    return (
        <>
            <div className={styles.noticeBoard}>
                <h1 className={styles.notice}>공지사항</h1>
            </div>

            <div className={styles.noticeList}>
                <ul>
                    {notices.map(notice => (
                        <li key={notice.id} onClick={() => openModal(notice)} className="notice">
                            <h2>{notice.title}</h2>
                            <span>{notice.date}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.actions}>
                {userId && <button type="button" onClick={writeHandler}>작성</button>}
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
