import { configureStore } from "@reduxjs/toolkit";
import wageReducer from "./wage-slice";
import noticeReducer from "./notice-slice";
import workplaceReducer from "./workplace-slice";
import slaveReducer from "./slave-slice";

const store = configureStore({
    reducer: {
        wage: wageReducer,
        notice: noticeReducer,
        workplace: workplaceReducer,
        slave: slaveReducer,
    }
});

export default store;