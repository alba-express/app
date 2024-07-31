import React from "react";
import InnerNavi from "./InnerNavi";
import { Outlet } from "react-router-dom";
import InnerContent from "./InnerContent";
import InnerHeader from "./InnerHeader";

const ContentSection = () => {
    return (
        <div>
            <InnerHeader />
            <InnerContent />
        </div>
    );
};

export default ContentSection;
