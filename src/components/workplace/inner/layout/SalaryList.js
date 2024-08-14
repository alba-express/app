import React from "react";
import styles from "./SalaryList.module.scss";
import { useNavigate } from "react-router-dom";

const SalaryList = ({
    name,
    role,
    hourlyWage,
    wageType,
    totalSalary,
    insurance,
    slaveId,
}) => {
    const navigate = useNavigate()
    const detailHandler = e => {
        navigate(`../wage-about`, { state: { slaveId } });
    }

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.header}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.role}>{role}</span>
                </div>
                <div className={styles.details}>
                    {wageType ? (
                        <span>시급 {hourlyWage.toLocaleString("ko-KR")}원</span>
                    ) : (
                        <span>월급 {hourlyWage.toLocaleString("ko-KR")}원</span>
                    )}
                </div>
            </div>
            <div className={styles.salary}>
                <span className={styles.amount}>
                    {totalSalary.toLocaleString("ko-KR")}원
                </span>
                {wageType && <span className={styles.role} onClick={detailHandler}>일별급여보기</span>}
                <span className={styles.insurance}>{insurance}</span>
            </div>
        </div>
    );
};

export default SalaryList;
