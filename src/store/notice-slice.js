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
            state.noticeList.push(action.payload);
            state.count += 1;
        },
        setCurrentNotice(state, action) {
            state.currentNotice = action.payload;
        },
        updateNotice(state, action) {
            const index = state.noticeList.findIndex(notice => notice.id === action.payload.id);
            if (index !== -1) {
                state.noticeList[index] = action.payload;
            }
        }

    }
});

export const noticeActions = noticeSlice.actions;
export default noticeSlice.reducer;