import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import {Login} from "./user.actions.ts"

const initialState: any = {
    initData: {},
    load: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<any>) => {
        builder.addCase(Login.pending, (state) => {
            state.load = true;
        }).addCase(Login.rejected, (state, action) => {
            state.load = false
            console.log(action.payload)
        }).addCase(Login.fulfilled, (state, action) => {
            state.load = false
            state.initData = action.payload.userD
        })
    },
});

export default userSlice.reducer;
