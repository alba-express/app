import React from 'react';
import styles from "./NoticeModal.module.scss"

const NoticeModal = ({title, content, date, isOpen, onClose}) => {

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>{title}</h2>
                <span className={styles.date}>{date}</span>
                <p className={styles.content}>{content}</p>
                {/*<div className={styles.buttonContainer}>*/}
                {/*    <button>수정</button>*/}
                    <button onClick={onClose}>닫기</button>
                {/*</div>*/}
            </div>
        </div>
    );
};

export default NoticeModal;