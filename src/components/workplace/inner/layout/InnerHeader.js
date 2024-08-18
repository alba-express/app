import React, {useEffect, useRef, useState} from "react";
import styles from './InnerHeader.module.scss';
import { Link, useNavigate } from "react-router-dom";
import { removeUserToken } from '../../../../utils/auth';
import {useDispatch, useSelector} from "react-redux";
import {noticeActions} from "../../../../store/notice-slice";
import NoticeModal from "../pages/NoticeModal";

const InnerHeader = () => {

    const notices = useSelector(state => state.notice.noticeList);
    const isModalOpen = useSelector(state => state.notice.isModalOpen);
    // const latestNoticeTitle = useSelector(state => state.notice.latestNoticeTitle);

    const [latestNoticeTitle, setLatestNoticeTitle] = useState('공지사항 없음');
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const workplaceId = localStorage.getItem('workplaceId');

    // 최신 공지사항 제목 가져오기
    useEffect(() => {
        const fetchNotice = async () => {
            const response = await fetch(`http://localhost:8877/detail?workplaceId=${workplaceId}`);
            if (!response.ok) {
                throw new Error('네트워크 응답이 올바르지 않습니다.');
            }
            const data = await response.json();
            console.log("data:", data);
            setLatestNoticeTitle(data.title);
        }
        // if(notices.length > 0) {
        //     setLatestNoticeTitle(notices[0].title);
        // }
        fetchNotice();
    }, [workplaceId, notices]);

    const handleLogout = () => {
        removeUserToken();
        navigate('/login');
    };

    const NoticeModalHandler = e => {
        console.log('최근 공지 클릭');
        if(notices.length > 0) {
            dispatch(noticeActions.setSelectedNotice(notices[0]));
            dispatch(noticeActions.openModal());
        }
    };

    const handleCloseModal = () => {
        dispatch(noticeActions.closeModal()); // 모달 닫기
    };


    return (
        <div className={styles['headerButton-box']} >
            <div className={styles['headerNotice']} >
                <img className={styles['headerNoticeImg']} src={`${process.env.PUBLIC_URL}/images/master_notice.png`} alt="Example" />
                <p className={styles['headerNoticeText']} onClick={NoticeModalHandler}>{latestNoticeTitle}</p>
            </div>
            <Link to="/workplace" className={styles['link-text']}>
                <button className={styles['headerButton']}>사업장변경</button>
            </Link>
            <button className={styles['headerButton']} onClick={handleLogout}>로그아웃</button>

            {/* 모달 컴포넌트 추가 */}
            {isModalOpen && (
                <NoticeModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    id={notices[0].id}
                    title={notices[0].title}
                    content={notices[0].content}
                    date={notices[0].date}
                    refreshNotices={() => {}}
                />
            )}

        </div>
    );
};

export default InnerHeader;
