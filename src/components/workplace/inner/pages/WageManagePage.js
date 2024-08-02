import React, { useEffect } from "react";
import SalaryHeader from "../layout/SalaryHeader";
import { useDispatch, useSelector } from "react-redux";
import { wageActions } from "../../../../store/wage-slice";
const WageManagePage = () => {

    const month = useSelector((state) => state.wage.month);
    const year = useSelector((state) => state.wage.year);
    const salaryAmount = useSelector((state) => state.wage.salaryAmount);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const payload = {
                workplaceId: "1",
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
                dispatch(wageActions.setSalaryByMonth({amount: json.salaryAmount}));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, [month, year]);
    
    return (
        <>
            <SalaryHeader />
        </>
    );
};

export default WageManagePage;

