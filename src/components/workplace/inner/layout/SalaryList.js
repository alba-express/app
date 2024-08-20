import React, { useState } from "react";
import styles from "./SalaryList.module.scss";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SalaryList = ({
    name,
    role,
    hourlyWage,
    wageType,
    totalSalary,
    insurance,
    slaveId,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate()
    const detailHandler = e => {
        navigate(`../wage-about`, { state: { slaveId } });
    }
    const insuranceHandler = e => {
        setIsOpen(prev => !prev);
        
    }

    return (
        <div className={styles.container}>
            <div className={styles.info}>
                <div className={styles.header}>
                    <span className={styles.name}>{name}</span>
                    <span className={styles.role}>{role}</span>
                </div>
                <div>
                    <span className={styles.details}>4대보험{insurance ? "O " : "X"}</span>
                    {insurance && <span className={styles.role} onClick={insuranceHandler}>{isOpen? "닫기" : "자세히"}</span>}
                </div>
                {isOpen && <div>
                    {insurance &&<span className={styles.details}>근로자 부담금: {Math.floor(totalSalary / 100 * 9.39).toLocaleString("ko-KR")}원</span>}
                </div>}
                {isOpen && <div>
                    {insurance &&<span className={styles.details}>고용자 부담금: {Math.floor(totalSalary / 100 * 10.6).toLocaleString("ko-KR")}원</span>}
                </div>}
                {isOpen && <div>
                    {insurance &&<span className={styles.details}>실급여: {Math.floor(totalSalary / 100 * 90.61).toLocaleString("ko-KR")}원</span>}
                </div>}
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
