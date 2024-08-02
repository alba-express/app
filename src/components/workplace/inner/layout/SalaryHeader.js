import React, { useEffect, useState } from "react";
import styles from "./SalaryHeader.module.scss";

const SalaryHeader = () => {
    const date = new Date();
    const [month, setMonth] = useState(date.getMonth() + 1);
    const [year, setYear] = useState(date.getFullYear());
    const [salaryAmount, setSalaryAmount] = useState(0);
    
    useEffect(() => {
        // 비동기 작업을 처리할 함수 정의
        const fetchData = async () => {
          const payload = {
            workplaceId: "1",
            ym: `${year}-${month < 10 ? "0" + month : month}`,
          };
    
          try {
            const res = await fetch(`http://localhost:8877/wage/workplace`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(payload),
            });
    
            if (!res.ok) {
              throw new Error('Network response was not ok');
            }
    
            const json = await res.json();
            setSalaryAmount(json);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, [month, year]);

    const handlePreviousMonth = () => {
        if (month === 1) {
            setMonth(12);
            setYear(year - 1);
        } else {
            setMonth(month - 1);
        }
    };

    const handleNextMonth = () => {
        if (month === 12) {
            setMonth(1);
            setYear(year + 1);
        } else {
            setMonth(month + 1);
        }
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
                <span className={styles.salaryAmount}>{salaryAmount.toLocaleString("ko-KR")}원</span>
            </div>
        </div>
    );
};

export default SalaryHeader;
