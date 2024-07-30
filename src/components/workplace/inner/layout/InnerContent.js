import React from "react";
import { Outlet } from "react-router-dom";

const InnerContent = () => {
    return (
        <div
            style={{
                border: "3px solid yellowgreen",
                width: "78%",
                height: "100%",
                display: "inline-block"
            }}
        >
            <Outlet />
        </div>
    );
};

export default InnerContent;
