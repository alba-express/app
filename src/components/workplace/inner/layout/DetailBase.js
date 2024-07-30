import React from "react";
import styles from "./DetailBase.module.scss";
import InnerHeader from "./InnerHeader";
import ContentSection from "./ContentSection";
const DetailBase = () => {
    return (
        <div className={styles.fullScreen}>
            <InnerHeader />
            <ContentSection />
        </div>
    );
};

export default DetailBase;
