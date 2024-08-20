import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    noticeList: [],
    currentNotice: null,
    count: 0,
    selectedNotice: null,
    isModalOpen: false,
    closeModal: true,
    latestNoticeTitle: '공지사항 없음', // 기본값으로 "공지사항 없음" 추가
    fixedNotices: JSON.parse(localStorage.getItem('fixedNotices')) || {},  // 사업장별 고정된 공지사항을 로컬 스토리지에서 불러오기
};

const noticeSlice = createSlice({
    name: 'notice',
    initialState,
    reducers: {
        setNotices(state, action) {
            state.noticeList = action.payload;
        },
        addNotice(state, action) {
            const newNotice = action.payload;
            if (newNotice) {
                state.noticeList.push(newNotice);
                state.count += 1;
            }
        },
        setCurrentNotice(state, action) {
            state.currentNotice = action.payload;
        },
        updateNotice(state, action) {
            const index = state.noticeList.findIndex(notice => notice.id === action.payload.id);
            if (index !== -1) {
                state.noticeList[index] = action.payload;
            }
        },
        deleteNotice(state, action) {
            const noticeId = action.payload;
            state.noticeList = state.noticeList.filter(notice => notice.id !== noticeId);
            state.count -= 1;
        },
        setSelectedNotice(state, action) {
            state.selectedNotice = action.payload;
        },
        openModal(state) {
            state.isModalOpen = true;
        },
        closeModal(state) {
            state.isModalOpen = false;
            state.selectedNotice = null;
        },
        // 고정 공지사항 페이로드 추가
        setFixedNotice(state, action) {
            const { workplaceId, notice } = action.payload;
            state.fixedNotices[workplaceId] = notice;
            localStorage.setItem('fixedNotices', JSON.stringify(state.fixedNotices)); // 사업장 아이디에 따른 고정된 공지사항 로컬 스토리지에 저장
        },
        setLatestNoticeTitle(state, action) {
            state.latestNoticeTitle = action.payload;
        },
    }
});

export const noticeActions = noticeSlice.actions;
export default noticeSlice.reducer;
