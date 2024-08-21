import React, { useEffect } from "react";
import SalaryHeader from "../layout/SalaryHeader";
import { useDispatch, useSelector } from "react-redux";
import { wageActions } from "../../../../store/wage-slice";
import SalaryBody from "../layout/SalaryBody";
import styles from "./WageManagePage.module.scss";
const WageManagePage = () => {

    const month = useSelector((state) => state.wage.month);
    const year = useSelector((state) => state.wage.year);
    const salaryAmount = useSelector((state) => state.wage.salaryAmount);
    const workplaceId = localStorage.getItem("workplaceId");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const payload = {
                workplaceId,
                ym: `${year}-${month < 10 ? "0" + month : month}`,
            };
            try {
                const res = await fetch(
                    `http://localhost:8877/wage/workplace`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(payload),
                    }
                );

                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }

                const json = await res.json();
                console.log(json);
                dispatch(wageActions.setSalaryByMonth({amount: json.salaryAmount}));
                dispatch(wageActions.setSalaryLogList({dtoList: json.logList}))
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [month, year]);
    
    return (
        <>
            <div className={styles.salaryTitle}>
                <h1>급여관리</h1>
            </div>
            <div className={styles.salaryBodyContainer}>
            <SalaryHeader />
                <SalaryBody />
            </div>
        </>
    );
};

export default WageManagePage;

