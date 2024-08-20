import React, { useEffect } from "react";
import styles from './InnerHeader.module.scss';
import { Link, useNavigate } from "react-router-dom";
import { removeUserToken } from '../../../../utils/auth';
import { useDispatch, useSelector } from "react-redux";
import NoticeModal from "../pages/NoticeModal";
import { noticeActions } from "../../../../store/notice-slice";

const InnerHeader = () => {
  const latestNoticeTitle = useSelector(state => state.notice.latestNoticeTitle || '공지사항 없음'); // 공지사항 제목 상태
  const fixedNotices = useSelector(state => state.notice.fixedNotices); // 사업장별 고정된 공지사항 가져오기
  const isModalOpen = useSelector(state => state.notice.isModalOpen);
  const notices = useSelector(state => state.notice.noticeList);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const workplaceId = localStorage.getItem('workplaceId');

  useEffect(() => {
    const fixedNotice = fixedNotices[workplaceId];
    if (fixedNotice) {
      dispatch(noticeActions.setLatestNoticeTitle(fixedNotice.title));
    } else if (notices.length > 0) {
      dispatch(noticeActions.setLatestNoticeTitle(notices[0].title));
    }
  }, [notices, fixedNotices, workplaceId, dispatch]);

  const handleLogout = () => {
    removeUserToken();
    navigate('/login');
  };

  const NoticeModalHandler = () => {
    const fixedNotice = fixedNotices[workplaceId] || notices[0];
    if (fixedNotice) {
      dispatch(noticeActions.setSelectedNotice(fixedNotice));
      dispatch(noticeActions.openModal());
    }
  };

  const handleCloseModal = () => {
    dispatch(noticeActions.closeModal()); // 모달 닫기
  };

  return (
    <div className={styles['headerButton-box']}>
      <div className={styles['headerNotice']}>
        <img className={styles['headerNoticeImg']} src={`${process.env.PUBLIC_URL}/images/master_notice.png`} alt="Example" />
        <p className={styles['headerNoticeText']} onClick={NoticeModalHandler}>{latestNoticeTitle}</p>
      </div>
      <Link to="/workplace" className={styles['link-text']}>
        <button className={styles['headerButton']}>사업장변경</button>
      </Link>
      <button className={styles['headerButton']} onClick={handleLogout}>로그아웃</button>

      {isModalOpen && (
        <NoticeModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          id={fixedNotices[workplaceId] ? fixedNotices[workplaceId].id : notices[0]?.id}
          title={fixedNotices[workplaceId] ? fixedNotices[workplaceId].title : notices[0]?.title}
          content={fixedNotices[workplaceId] ? fixedNotices[workplaceId].content : notices[0]?.content}
          date={fixedNotices[workplaceId] ? fixedNotices[workplaceId].date : notices[0]?.date}
          refreshNotices={() => {}}
        />
      )}
    </div>
  );
};

export default InnerHeader;
