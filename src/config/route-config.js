import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/app-layout/RootLayout";
import ErrorPage from "../components/app-pages/ErrorPage";
import Home from "../components/app-pages/Home";
import Login from "../components/login/pages/Login";
import LoginMain from "../components/login/pages/LoginMain";
import SignUpPage from "../components/login/pages/SignUpPage";
import FindPwPage from "../components/login/pages/FindPwPage";
import ModifyPwPage from "../components/login/pages/ModifyPwPage";
import WorkplaceListPage from "../components/workplace/outer/pages/WorkplaceListPage";
import Workplace from "../components/workplace/outer/pages/Workplace";
import WorkplaceModifyPage from "../components/workplace/outer/pages/WorkplaceModifyPage";
import WorkplaceRegistPage from "../components/workplace/outer/pages/WorkplaceRegistPage";

const loginRouter = [
    { // 로그인 페이지
        index: true,
        element: <LoginMain />,
    },
    { // 회원가입 페이지
        path: "sign-up",
        element: <SignUpPage />,
    },
    { // 비밀번호 찾기 페이지
        path: "find-pw",
        element: <FindPwPage />,
    },
    { // 비밀번호 수정 페이지
        path: "modify-pw",
        element: <ModifyPwPage />,
    },
];

const workplaceRouter = [
  { // 업장리스트 페이지
    index: true,
    element: <WorkplaceListPage />,
  },
  { // 업장정보수정 페이지
    path: "modify",
    element: <WorkplaceModifyPage />
  },
  { // 업장 등록 페이지
    path: "regist",
    element: <WorkplaceRegistPage />
  }
]

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            { // 설명충 페이지
                path: "/",
                element: <Home />,
            },
            { // 로그인 관련 페이지
                path: "/login",
                element: <Login />,
                children: loginRouter,
            },
            { // 업장 관련 페이지
                path: "/workplace",
                element: <Workplace />,
                children: workplaceRouter,
            },
        ],
    },
]);
