import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";
import { logger } from "redux-logger";
import { persistStore } from "redux-persist";

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: import.meta.env.VITE_NODE_ENV === "development",
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
