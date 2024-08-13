import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const RootLayout = () => {
  const location = useLocation();

  useEffect(() => {
    // 현재 경로가 /detail 또는 /workplace/modify or /workplace/pwdverify 가 아닐 경우 로컬 스토리지에서 사업장 아이디를 삭제한다.
    if (!location.pathname.startsWith('/detail') && !location.pathname.startsWith('/workplace/modify') && !location.pathname.startsWith('/workplace/pwdverify')) {
      localStorage.removeItem('workplaceId');
    }
  }, [location]);

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
