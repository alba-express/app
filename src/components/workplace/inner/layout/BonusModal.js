import React from "react";
import styles from "./BonusModal.module.scss";

const BonusModal = ({ workDate, name, amount, onClose, onSave, setModalData }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setModalData((prevData) => ({
            ...prevData,
            amount: value,
        }));
    };

    return (
        <div className={styles.modalBackdrop}>
            <div className={styles.modalContent}>
                <h3>급여 수정</h3>
                <div className={styles.field}>
                    <label>근무일:</label>
                    <span>{workDate}</span>
                </div>
                <div className={styles.field}>
                    <label>이름:</label>
                    <span>{name}</span>
                </div>
                <div className={styles.field}>
                    <label>금액:</label>
                    <input
                        type="number"
                        name="amount"
                        value={amount}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.buttons}>
                    <button onClick={onSave}>확인</button>
                    <button onClick={onClose}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default BonusModal;
