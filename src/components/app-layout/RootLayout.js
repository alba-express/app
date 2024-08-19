import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const RootLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleRedirection = () => {
      // 접근을 차단할 경로 목록
      const restrictedPaths = [
        '/detail',
        '/workplace/modify',
        '/workplace/pwdverify',
      ];

      // 현재 경로가 접근을 차단할 경로 중 하나인지 확인
      const isRestrictedPath = restrictedPaths.some(path => location.pathname.startsWith(path));

      // 접근을 차단할 경로 중 하나이고 -> workplaceId 없으면 /workplace로 리디렉션
      if (isRestrictedPath) {
        const workplaceId = localStorage.getItem('workplaceId');
        const hasShownAlert = localStorage.getItem('hasShownAlert');

        if (!workplaceId) {
          if (!hasShownAlert) {
            alert('원하는 사업장 클릭 후 간편비밀번호로 인증 후 접근하실 수 있습니다.');
            localStorage.setItem('hasShownAlert', 'true');
          }
          navigate('/workplace', { replace: true });
          return; // 추가 렌더링 방지
        }

        // '/detail'에서 '/workplace/modify'로 직접 접근 시 얼터 문구 표시하고 이동 안시킴
        if (location.pathname === '/workplace/modify' && localStorage.getItem('redirectedFromDetail')) {
          if (!hasShownAlert) {
            alert('사업장 수정 페이지에 직접 접근하실 수 없습니다. 사업장변경을 통해 이동해주세요😃');
            localStorage.setItem('hasShownAlert', 'true');
          }
          navigate('/detail', { replace: true });
          return; // 리디렉션 후 추가 렌더링 방지
        }

        // '/detail' 경로에 접근할 때 localStorage에 redirectedFromDetail 설정
        if (location.pathname === '/detail') {
          localStorage.removeItem('redirectedFromDetail');
        }

        // '/workplace/modify' 경로에서 '/detail'로 접근할 때 localStorage에 redirectedFromDetail 설정
        if (location.pathname.startsWith('/workplace/modify')) {
          localStorage.setItem('redirectedFromDetail', 'true');
        }
      } else {
        // 다른 경로일 경우 로컬스토리지에서 workplaceId 제거 및 안내문구 표시 상태 초기화
        localStorage.removeItem('workplaceId');
        localStorage.removeItem('redirectedFromDetail');
        localStorage.removeItem('hasShownAlert');
      }

      setLoading(false);
    };

    handleRedirection();
  }, [location, navigate]);

  // 로딩 상태일 때는 아무것도 렌더링하지 않게
  if (loading) {
    return null;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default RootLayout;
