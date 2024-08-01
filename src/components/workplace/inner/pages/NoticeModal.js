import React from 'react';
import styles from "./NoticeModal.module.scss"

const NoticeModal = ({title, content, date, isOpen, onClose}) => {

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>{title}</h2>
                <p>{content}</p>
                <span>{date}</span>
                <button onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default NoticeModal;