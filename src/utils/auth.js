// jwt 유틸리티 함수
export const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
};

// jwt 토큰에서 유저 ID를 추출
export const getUserId = () => {
    const token = localStorage.getItem('jwt') || sessionStorage.getItem('jwt');
    if (!token) return null;
    const parsedToken = parseJwt(token);
    return parsedToken ? parsedToken.sub : null;
};

// jwt 토큰 저장
export const saveUserToken = (token, rememberMe) => {
    if (rememberMe) {
        localStorage.setItem('jwt', token);
    } else {
        sessionStorage.setItem('jwt', token);
    }
};

// jwt 토큰 삭제
export const removeUserToken = () => {
    localStorage.removeItem('jwt');
    sessionStorage.removeItem('jwt');
};

// 유저 ID 저장
export const saveUserId = (id) => {
    localStorage.setItem('userId', id);
};

// 유저 ID 가져오기
export const getUserIdFromStorage = () => {
    return localStorage.getItem('userId');
};

// 유저 ID 삭제
export const removeUserId = () => {
    localStorage.removeItem('userId');
};
