import { configureStore } from "@reduxjs/toolkit";
import wageReducer from "./wage-slice";
import noticeReducer from "./notice-slice";
import workplaceReducer from "./workplace-slice";

const store = configureStore({
    reducer: {
        wage: wageReducer,
        notice: noticeReducer,
        workplace: workplaceReducer,
        
    }
});

export default store;