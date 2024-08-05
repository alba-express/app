import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { workplaceActions } from "../../../../store/workplace-slice";
import WorkplaceList from "./WorkplaceList";
import MainHeader from "../../../app-layout/MainHeader";
import { Link } from "react-router-dom";
import styles from './WorkplaceList.module.scss';

const WorkplaceListPage = () => {
    const dispatch = useDispatch();
    const workList = useSelector((state) => state.workplace?.workList?.workplaces || []);

    useEffect(() => {
        const fetchWorkplaces = async () => {
            try {
                const res = await fetch(`http://localhost:8877/workplace/list/1`);
                if (!res.ok) {
                    throw new Error("Network response was not ok");
                }
        
                const json = await res.json();
                console.log("Fetched JSON:", json); // JSON 데이터 확인
                
                if (json.workplaces) {
                    dispatch(workplaceActions.setWorkList(json.workplaces)); // 올바른 payload 설정
                } else {
                    console.error("Unexpected response structure:", json);
                }
            } catch (error) {
                console.error("Error fetching workplaces:", error);
            }
        };
        
        fetchWorkplaces();
    }, [dispatch]);

    return (
        <>
            <MainHeader isHome={false} />
            <Link to="regist">
                <button>사업장 등록</button> <br />
            </Link>

            <div className={styles.WorkplaceListPage}>
                {workList.length > 0 ? (
                    workList.map((log) => (
                        <WorkplaceList
                            key={log.id}
                            workplaceName={log.workplaceName}
                            city={log.workplaceAddressCity}
                            street={log.workplaceAddressStreet}
                            detail={log.workplaceAddressDetail}
                            size={log.workplaceSize}
                            date={log.workplaceCreatedAt}
                            masterId={log.masterId}
                        />
                    ))
                ) : (
                    <p>사업장 목록이 없습니다.</p>
                )}
            </div>
        </>
    );
};

export default WorkplaceListPage;
