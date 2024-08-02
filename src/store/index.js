import { configureStore } from "@reduxjs/toolkit";
import wageReducer from "./wage-slice";
const store = configureStore({
    reducer: {
        wage: wageReducer,
        
    }
});

export default store;