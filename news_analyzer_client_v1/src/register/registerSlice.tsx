import {ActionReducerMapBuilder, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {AppServerData} from "../app/appServerData.tsx";
import {registerController} from "./registerController.tsx";
import {RegisterData} from "./registerData.tsx";
import {ErrorMode} from "../error/errorMode.tsx";

export interface RegisterState {
    registration: RegisterData | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: RegisterState = {
    registration: null,
    isLoading: false,
    error: null,
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<RegisterState>) => {
        builder
            .addCase(registerController.pending, (state: Draft<RegisterState>) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(registerController.fulfilled, (state: Draft<RegisterState>, action: PayloadAction<AppServerData>) => {
                state.isLoading = false;
                state.registration = {
                    fullName: '',
                    email: action.payload.success ? 'Registered successfully' : '',
                    password: '',
                    confirmPassword: '',
                    consentGiven: false
                };
            })
            .addCase(registerController.rejected, (state: Draft<RegisterState>, action: PayloadAction<string | undefined>) => {
                state.isLoading = false;
                typeof action.payload === 'string' ? state.error = action.payload : ErrorMode.UNKNOWN;
            })
    },
});

export default registerSlice.reducer;
