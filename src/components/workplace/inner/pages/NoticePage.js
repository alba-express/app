import React, {useEffect, useState} from "react";
import styles from "./NoticePage.module.scss"
import {useNavigate} from "react-router-dom";
import NoticeModal from "./NoticeModal";

const NoticePage = () => {

    // const notices = [
    //     {id: 1, title: "근태 출퇴근 버튼 미노출 현상", content: "6월 11일(화) 오전 8시부터 9시 40분까지 네이버웍스 근태 상품을 이용하는 일부 고객사 대상으로 출퇴근 버튼이 비활성화되고 ‘근무 시작 예정입니다.’ 문구만 노출되는 현상이 있었습니다.", date: "2024-07-27"},
    //     {id: 2, title: "결제 오류 ", content: "<상세 내용>\n- 오류 현상: 애플 앱스토어 결제 오류 현상", date: "2024-07-26"},
    //     {id: 3, title: "공지사항 3", content: "공지사항 3 내용입니다.", date: "2024-07-25"},
    //     {id: 3, title: "공지사항 4", content: "공지사항 4 내용입니다.", date: "2024-08-25"},
    //     {id: 3, title: "공지사항 5", content: "공지사항 5 내용입니다.", date: "2024-08-25"},
    //     // {id: 3, title: "공지사항 6", content: "공지사항 6 내용입니다.", date: "2024-08-25"},
    // ];

    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [isModalOpen, setIsModalOpen] = useState(true);
    const [selectedNotice, setSelectedNotice] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchNotices = async () => {
            try {
                const response = await fetch('http://localhost:8877/detail/notice');
                if(!response.ok) {
                    throw new Error('네트워크 응답이 올바르지 않습니다.');
                }
                const data = await response.json();
                setNotices(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };
        fetchNotices();
    }, []);

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
