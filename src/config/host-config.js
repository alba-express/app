
const LOCAL_PORT = 8877; // 백엔드 로컬 서버 포트번호

const clientHostName = window.location.hostname;

let backendHostName;

if (clientHostName === 'localhost') {
    backendHostName = 'http://localhost:' + LOCAL_PORT;
}

const API_BASE_URL = backendHostName;

const DETAIL = '/detail';

export const DETAIL_URL = API_BASE_URL + DETAIL;
