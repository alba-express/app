import React from "react";
import styles from './WorkplaceList.module.scss';

const WorkplaceList = ({ workplaceName, city, street, detail, size, date, masterId }) => {
   

    return (
        <div className={styles.WorkplaceItem}>
            <h3>{workplaceName}</h3>
            <p>{city} {street} {detail}</p>
            <p>{size ? "5인 이상 사업장" : "5인 미만 사업장"}</p>
            <p>등록일: {new Date(date).toLocaleDateString()}</p>
            <p>사장 ID: {masterId}</p>
        </div>
    );
};

export default WorkplaceList;
