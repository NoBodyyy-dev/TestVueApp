import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const Login = createAsyncThunk(
    "user/login", async (payload: any, thunkAPI) => {
        try {
            const response = await axios("http://localhost:8080/mygifts/user/auth", payload)
            if (response.status !== 200) return thunkAPI.rejectWithValue(response.data);
            return response.data;
        } catch (e) {
            thunkAPI.rejectWithValue(e);
        }
    }
)