import React from "react";
import MainHeader from "../../app-layout/MainHeader";
import { Outlet } from "react-router-dom";

const LoginPage = () => {
    return (
        <>
        <MainHeader />
            <Outlet />
        </>
    );
};

export default LoginPage;
