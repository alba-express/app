import { configureStore } from "@reduxjs/toolkit";
import wageReducer from "./wage-slice";
import noticeReducer from "./notice-slice";

const store = configureStore({
    reducer: {
        wage: wageReducer,
        notice: noticeReducer,
        
    }
});

export default store;