import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./user.slice.ts";

export const store = configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    reducer: {
        user: userSlice,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;