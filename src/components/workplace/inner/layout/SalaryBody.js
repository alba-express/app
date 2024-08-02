import React, { useState } from "react";
import styles from "./SalaryBody.module.scss";
import SalaryList from "./SalaryList";
import { useDispatch, useSelector } from "react-redux";
import { wageActions } from "../../../../store/wage-slice";
import { formatMonth } from "./SalaryHeader";

const SalaryBody = () => {
    const month = useSelector((state) => state.wage.month);
    const logList = useSelector((state) => state.wage.logList);
    
    
  return (
    <>
        <h2>{formatMonth(month)}월 직원별 급여</h2>
        <div className={styles.salaryBody}>
        {logList.map((log) => (
            <SalaryList
            key={log.slaveId}
            name={log.slaveName}
            role={log.slavePosition}
            wageType={log.wageType}
            hourlyWage={log.wage}
            totalSalary={log.totalAmount}
            insurance={log.wageInsurance}
            />
            ))}
        </div>
    </>
  );
};

export default SalaryBody;
