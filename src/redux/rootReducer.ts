import { combineReducers } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasks/tasks.slice";
import filtersReducer from "./features/filters/filters.slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "redux-store",
    storage,
};

export const combineReducer = combineReducers({
    tasks: tasksReducer,
    filters: filtersReducer,
});

export const rootReducer = persistReducer(persistConfig, combineReducer);
