import React from "react";
import styles from "./SalaryList.module.scss";

const SalaryDetailList = ({
    workingTime,
    workDate,
    salary,
}) => {
    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.header}>
                    <span className={styles.name}>근무일: {workDate}</span>
                </div>
                <div className={styles.details}>
                    근무시간: {workingTime}
                </div>
            </div>
            <div className={styles.salary}>
                <span className={styles.amount}>
                    {salary.toLocaleString("ko-KR")}원
                </span>
            </div>
        </div>
    );
};

export default SalaryDetailList;
