import React from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../components/layout/RootLayout";
import ErrorPage from "../components/pages/ErrorPage";
import Home from "../components/pages/Home";
import LoginPage from "../components/pages/LoginPage";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        }
      ]
    }
]);


