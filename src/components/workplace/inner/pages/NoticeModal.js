import React from 'react';
import styles from "./NoticeModal.module.scss"
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {noticeActions} from "../../../../store/notice-slice";
import useAuth from "../../../../hooks/useAuth";

const NoticeModal = ({id, title, content, date, isOpen, onClose, refreshNotices}) => {


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userId = useAuth();

    if (!isOpen) return null;

    const editHandler = e => {
        dispatch(noticeActions.setCurrentNotice({id, title, content, date}));
        navigate("/detail/notice-edit");

    };

    const deleteHandler = async e => {
        e.preventDefault();
        console.log('Deleting notice with id:', id);
        try {
            const response = await fetch(`http://localhost:8877/detail/notice/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if(response.ok) {
                dispatch(noticeActions.deleteNotice(id));
                await refreshNotices();
                onClose();
                navigate("/detail/notice");
            } else {
                throw new Error('삭제 요청에 실패했습니다.');
            }
        } catch (error) {
            console.error('삭제 오류:', error);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>{title}</h2>
                <span className={styles.date}>{date}</span>
                <p className={styles.content}>{content}</p>
                <div className={styles.buttonContainer}>
                    { userId && <button className={styles.button} onClick={editHandler}>수정</button>}
                    { userId && <button className={styles.button} onClick={deleteHandler}>삭제</button>}
                    <button className={styles.button} onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default NoticeModal;