import React, { useEffect, useState } from "react";
import styles from "./SalaryHeader.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { wageActions } from "../../../../store/wage-slice";

const SalaryHeader = () => {

    const month = useSelector((state) => state.wage.month);
    const year = useSelector((state) => state.wage.year);
    const salaryAmount = useSelector((state) => state.wage.salaryAmount);

    const dispatch = useDispatch();



    const handlePreviousMonth = () => {
        dispatch(wageActions.setMonthByType({ type: "prev" }));
    };

    const handleNextMonth = () => {
        dispatch(wageActions.setMonthByType({ type: "next" }));
    };

    const formatMonth = (month) => {
        return month < 10 ? `0${month}` : month;
    };

    return (
        <div className={styles.container}>
            <div className={styles.salaryHeader}>
                <div
                    onClick={handlePreviousMonth}
                    className={styles.buttonWrapper}
                >
                    <button className={styles.button}>◀</button>
                </div>
                <span className={styles.salaryText}>
                    {year}년 {formatMonth(month)}월 급여
                </span>
                <div onClick={handleNextMonth} className={styles.buttonWrapper}>
                    <button className={styles.button}>▶</button>
                </div>
            </div>
            <div className={styles.salaryBox}>
                <span className={styles.salaryAmount}>
                    {salaryAmount.toLocaleString("ko-KR")}원
                </span>
            </div>
        </div>
    );
};

export default SalaryHeader;
