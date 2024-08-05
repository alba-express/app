import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    noticeList: [],
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
        }

    }
});

export const noticeActions = noticeSlice.actions;
export default noticeSlice.reducer;