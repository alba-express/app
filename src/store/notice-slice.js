import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    noticeList: [],
    currentNotice: null,
    count: 0
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
            console.log('newNotice: ', newNotice);
            if (newNotice) {
                state.noticeList.push(newNotice);
                state.count += 1;
            } else {
                console.error('Invalid notice object:', action.payload);
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
        }

    }
});

export const noticeActions = noticeSlice.actions;
export default noticeSlice.reducer;