import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    // slaveManagePage
    showSlaveList: true, // 근무중인 직원 or 퇴사한 직원 리스트 표시 (초기값: 근무중인 직원리스트 표시)
    showAllSlaveInfo : [], // 전체 직원 정보 표시
    showActiveSlaveInfo: { // 근무중인 직원 정보 표시 (초기값: 근무중인 직원리스트 빈배열, 근무중인 직원리스트의 총 직원수 빈값)
        slaveList: [], 
        totalSlaveCount: ''
    },
    showInactiveSlaveInfo: { // 퇴사한 직원 정보 표시 (초기값: 퇴사한 직원리스트 빈배열, 퇴사한 직원리스트의 총 직원수 빈값)
        slaveList: [], 
        totalSlaveCount: ''
    },
    showOneSlaveInfo: {slaveId: '', slaveName: '', slavePosition:'', slavePhoneNumber:'', slaveBirthday:'', slaveCreatedAt:'', wageList: [], scheduleList: [], scheduleLogList: []}, // 특정 직원 한 명의 정보 표시 (초기값: 특정 직원의 한 명의 정보를 넣을 빈 배열)
    modifySlaveInfo: {slaveId: '', slaveName: '', slavePosition:'', slavePhoneNumber:'', slaveBirthday:'', slaveCreatedAt:'', wageList: [], scheduleList: [], scheduleLogList: [], workPlaceNumber: ''}, // 특정 직원 한 명의 정보 표시 (초기값: 특정 직원의 한 명의 정보를 넣을 빈 배열)
}

const slaveSlice = createSlice({
    name: 'slave',
    initialState,
    reducers: {
        setShowSlaveList (state, action) {
            state.showSlaveList = action.payload;
        },
        setAllSlaveInfo (state, action) {
            state.showAllSlaveInfo = action.payload;
        },
        setShowActiveSlaveInfo (state, action) {
            state.showActiveSlaveInfo = action.payload;
        },
        setShowInactiveSlaveInfo (state, action) {
            state.showInactiveSlaveInfo = action.payload;
        },
        setShowOneSlaveInfo (state, action) {
            state.showOneSlaveInfo = action.payload;
        },
        setModifySlaveInfo (state, action) {
            state.modifySlaveInfo = action.payload;
        },
    }
});

export const slaveActions = slaveSlice.actions; // slaveSlice 의 reducers 에서 정의한 함수들 내보내기
export default slaveSlice.reducer; // React의 index.js에 slaveReducer 제공
