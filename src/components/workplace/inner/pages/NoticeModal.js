import React from 'react';
import styles from "./NoticeModal.module.scss"
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {noticeActions} from "../../../../store/notice-slice";

const NoticeModal = ({id, title, content, date, isOpen, onClose}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    if (!isOpen) return null;

    const editHandler = e => {
        dispatch(noticeActions.setCurrentNotice({id, title, content, date}));
        navigate("/detail/notice-edit");

    };

    const deleteHandler = e => {

    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>{title}</h2>
                <span className={styles.date}>{date}</span>
                <p className={styles.content}>{content}</p>
                <div className={styles.buttonContainer}>
                    <button className={styles.button} onClick={editHandler}>수정</button>
                    <button className={styles.button} onClick={deleteHandler}>삭제</button>
                    <button className={styles.button} onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
};

export default NoticeModal;