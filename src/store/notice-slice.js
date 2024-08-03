import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    noticeList: [],
    count: 0
};

const noticeSlice = createSlice({
    name: 'notice',
    initialState,
    reducers: {

    }
});

export const noticeActions = noticeSlice.actions;
export default noticeSlice.reducer;