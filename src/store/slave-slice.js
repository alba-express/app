import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // slaveManagePage
    showSlaveList: true, // 근무중인 직원 or 퇴사한 직원 리스트 표시 (초기값: 근무중인 직원리스트 표시)
    showActiveSlaveInfo: { // 근무중인 직원 정보 표시 (초기값: 근무중인 직원리스트 빈배열, 근무중인 직원리스트의 총 직원수 빈값)
        slaveList: [], 
        totalSlaveCount: ''
    },
    showInactiveSlaveInfo: { // 퇴사한 직원 정보 표시 (초기값: 퇴사한 직원리스트 빈배열,퇴사한 직원리스트의 총 직원수 빈값)
        slaveList: [], 
        totalSlaveCount: ''
    },
}

const slaveSlice = createSlice({
    name: 'slave',
    initialState,
    reducers: {
        setShowSlaveList (state, action) {
            state.showSlaveList = action.payload;
        },
        setShowActiveSlaveInfo (state, action) {
            state.showActiveSlaveInfo = action.payload;
        },
        setShowInactiveSlaveInfo (state, action) {
            state.showInactiveSlaveInfo = action.payload;
        },
    }
});

export const slaveActions = slaveSlice.actions; // slaveSlice 의 reducers 에서 정의한 함수들 내보내기
export default slaveSlice.reducer; // React의 index.js에 slaveReducer 제공

// const wageSlice = createSlice({
//     name: 'wage',
//     initialState,
//     reducers: {
//         setMonthByType(state, action) {
//             if(action.payload.type === "prev") {
//                 if (state.month === 1) {
//                     state.month = 12;
//                     state.year = state.year - 1;
//                 } else {
//                     state.month = state.month - 1;
//                 }
//             } else if(action.payload.type === "next") {
//                 if (state.month === 12) {
//                     state.month = 1;
//                     state.year = state.year + 1;
//                 } else {
//                     state.month = state.month + 1;
//                 }
//             }
//         }, setSalaryByMonth(state, action) {
//             state.salaryAmount = action.payload.amount;
//         }, setSalaryLogList(state, action) {
//             state.logList = [...action.payload.dtoList];
//         }, setSlaveData(state, action) {
//             state.slaveData = action.payload.slaveData;
//         },
//     }
// })
