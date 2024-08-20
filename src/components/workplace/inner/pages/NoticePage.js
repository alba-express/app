import React, { useCallback, useEffect, useState } from "react";
import styles from "./NoticePage.module.scss";
import { Link } from "react-router-dom";
import NoticeModal from "./NoticeModal";
import { useDispatch, useSelector } from "react-redux";
import { noticeActions } from "../../../../store/notice-slice";
import useAuth from "../../../../hooks/useAuth";

const NoticePage = () => {
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const notices = useSelector((state) => state.notice.noticeList || []);

  const fixedNotices = useSelector((state) => state.notice.fixedNotices); // 셀렉터로 사업장별 고정된 공지사항 가져오기
  const workplaceId = localStorage.getItem("workplaceId");

  const fetchNotices = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8877/detail/notice?workplaceId=${workplaceId}&page=${currentPage}`);
      if (!response.ok) {
        throw new Error("네트워크 응답이 올바르지 않습니다.");
      }
      const data = await response.json();
      dispatch(noticeActions.setNotices(data.noticeList));
      setTotalPages(data.totalPages);

      // 고정된 공지사항이 삭제된 경우 -> 가장 최근 공지사항이 박히도록
      const fixedNotice = fixedNotices[workplaceId];
      if (fixedNotice && !data.noticeList.some(notice => notice.id === fixedNotice.id)) {
        dispatch(noticeActions.setFixedNotice({ workplaceId, notice: null }));
      }

    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [dispatch, currentPage, workplaceId, fixedNotices]);

  useEffect(() => {
    fetchNotices();
  }, [fetchNotices]);

  useEffect(() => {
    if (notices.length === 0) {
      dispatch(noticeActions.setLatestNoticeTitle('공지사항 없음'));
    }
  }, [notices, dispatch]);

  const openModal = (notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNotice(null);
  };

  // 슬라이스에 만들어둔 로컬스토리지에 저장한 setFixedNotice -> dispatch ! 
  const handleFixNotice = (notice) => {
    dispatch(noticeActions.setFixedNotice({ workplaceId, notice }));
  };

  const truncateTitle = (title, maxLength) => {
    if (title.length > maxLength) {
      return title.slice(0, maxLength) + ' · · ·';
    }
    return title;
  };

  if (error) return <div>Error: {error}</div>;

  const handlePageChange = (newPage) => {
    if(newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <>
      <div className={styles.noticeBoard}>
        <h1 className={styles.notice}>공지사항</h1>
      </div>

      <div className={styles.actions}>
        <Link to="/detail/notice-register">
          <button type="button">작성</button>
        </Link>
      </div>

      <div className={styles.noticeList}>
        {!isLoading && (
          <ul>
            {notices.length > 0 ? (
              notices.map((notice) => (
                <li key={notice.id} className="notice">
                  <h3 className={styles.title} onClick={() => openModal(notice)}>
                    {truncateTitle(notice.title, 30)}
                  </h3>
                  <div>
                    {/* 고정 버튼 추가 handleFixNotice 이벤트로  */}
                    <button className={styles.fixbutton} onClick={() => handleFixNotice(notice)}>
                      고정
                    </button>
                    <span className={styles.date}>{notice.date}</span>
                  </div>
                </li>
              ))
            ) : (
              <li>등록된 공지사항이 없습니다.</li>
            )}
          </ul>
        )}
      </div>

      <div className={styles.pagination}>
        {currentPage !== 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            이전
          </button>
        )}
        <span className={styles.page}>
          {currentPage} / {totalPages}
        </span>
        {currentPage !== totalPages && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            다음
          </button>
        )}
      </div>

      {selectedNotice && (
        <NoticeModal
          isOpen={isModalOpen}
          onClose={closeModal}
          id={selectedNotice.id}
          title={selectedNotice.title}
          content={selectedNotice.content}
          date={selectedNotice.date}
          refreshNotices={fetchNotices}
        />
      )}
    </>
  );
};

export default NoticePage;
