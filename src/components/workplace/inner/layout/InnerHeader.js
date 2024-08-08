import React, {useEffect, useRef, useState} from "react";
import styles from './InnerHeader.module.scss';
import { Link, useNavigate } from "react-router-dom";
import { removeUserToken } from '../../../../utils/auth';
import {useDispatch, useSelector} from "react-redux";
import {noticeActions} from "../../../../store/notice-slice";

const InnerHeader = () => {

    const notices = useSelector(state => state.notice.noticeList);
    const [latestNoticeTitle, setLatestNoticeTitle] = useState('공지사항 없음');
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const handleLogout = () => {
        removeUserToken();
        navigate('/login');
    };

    const handleRetire = () => {
        navigate('/login/retire');
    };

    const NoticeModalHandler = e => {
        if(notices.length > 0) {
            dispatch(noticeActions.setSelectedNotice(notices[0]));
            dispatch(noticeActions.openModal());
        }
    };

    // 최신 공지사항 제목 가져오기
    useEffect(() => {
        if(notices.length > 0) {
            setLatestNoticeTitle(notices[0].title);
        }
    }, [notices]);

    return (
        <div className={styles['headerButton-box']} >
            <div className={styles['headerNotice']} >
                <img src={`${process.env.PUBLIC_URL}/images/master_notice.png`} alt="Example" />
                <p onClick={NoticeModalHandler}>{latestNoticeTitle}</p>
            </div>
            <Link to="/workplace" className={styles['link-text']}>
                <button className={styles['headerButton']}>사업장변경</button>
            </Link>
            <button className={styles['headerButton']} onClick={handleLogout}>로그아웃</button>
            <button className={styles['headerButton']} onClick={handleRetire}>회원 탈퇴</button>
        </div>
    );
};

export default InnerHeader;
