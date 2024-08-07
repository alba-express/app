import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wageActions } from "../../../../store/wage-slice";
import WageAboutHeader from "../layout/WageAboutHeader";
import WageAboutBody from "../layout/WageAboutBody";
import { useLocation } from "react-router-dom";

const WageAboutPage = () => {
    const month = useSelector((state) => state.wage.month);
    const year = useSelector((state) => state.wage.year);
    const dispatch = useDispatch();

    const location = useLocation();
    const [slaveId, setSlaveId] = useState(null);

    useEffect(() => {
        const state = location.state;
        if (state && state.slaveId) {
            setSlaveId(state.slaveId);
        }
    }, [location]);

    useEffect(() => {
        const fetchData = async () => {
            if (!slaveId) return;

            const payload = {
                slaveId: slaveId,
                ym: `${year}-${month < 10 ? "0" + month : month}`,
            };
            try {
                const res = await fetch(
                    `http://localhost:8877/wage/slave`,
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
                dispatch(wageActions.setSlaveData({slaveData: json}));
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [slaveId, month, year, dispatch]);

    return (
        <>
            <WageAboutHeader />
            <WageAboutBody />
        </>
    );
};

export default WageAboutPage;
