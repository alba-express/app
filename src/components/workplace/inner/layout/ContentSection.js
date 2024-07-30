import React from "react";
import InnerNavi from "./InnerNavi";
import { Outlet } from "react-router-dom";
import InnerContent from "./InnerContent";

const ContentSection = () => {
    return (
        <div style={{ background: "skyblue", width: "100%", height: "80%" }}>
            <InnerNavi />
            <InnerContent />
        </div>
    );
};

export default ContentSection;
