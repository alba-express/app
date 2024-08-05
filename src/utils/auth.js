// jwt 유틸리티 함수
export const parseJwt = (token) => {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = atob(base64);
        return JSON.parse(jsonPayload);
    } catch (error) {
        return null;
    }
};

// jwt 토큰에서 유저 ID를 추출
export const getUserId = () => {
    const token = localStorage.getItem('jwt');
    if (!token) return null;
    const parsedToken = parseJwt(token);
    return parsedToken ? parsedToken.id : null;
};

// jwt 토큰 저장
export const saveUserToken = (token) => {
    localStorage.setItem('jwt', token);
};

// jwt 토큰 삭제
export const removeUserToken = () => {
    localStorage.removeItem('jwt');
};

// jwt 토큰 가져오기
export const getUserToken = () => {
    return localStorage.getItem('jwt');
};
