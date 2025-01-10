import {ActionReducerMapBuilder, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {AppServerData} from "../app/appServerData.tsx";
import {recoveryController} from "./recoveryController.tsx";
import {RecoveryData} from "./recoveryData.tsx";
import {TokenMode} from "../storage/tokenMode.tsx";
import {ErrorMode} from "../error/errorMode.tsx";

export interface RecoveryState {
    recovery: RecoveryData | null;
    accessJwt: string | null;
    refreshJwt: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: RecoveryState = {
    recovery: null,
    accessJwt: null,
    refreshJwt: null,
    isLoading: false,
    error: null,
}

const recoverySlice = createSlice({
    name: 'recovery',
    initialState,
    reducers: {
        restoreRecoverySession: (state) => {
            const recoveryAccessJwt: string = localStorage.getItem(TokenMode.RECOVERY_ACCESS_JWT);
            const recoveryRefreshJwt: string = localStorage.getItem(TokenMode.RECOVERY_REFRESH_JWT);

            if (recoveryAccessJwt && recoveryRefreshJwt) {
                state.accessJwt = recoveryAccessJwt;
                state.refreshJwt = recoveryRefreshJwt;
            }
        },
        setError: (state, action: PayloadAction<string>): void => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<RecoveryState>) => {
        builder
            .addCase(recoveryController.pending,
                (state: Draft<RecoveryState>) => {
                    state.isLoading = true;
                    state.error = null;
                })
            .addCase(recoveryController.fulfilled,
                (state: Draft<RecoveryState>, action: PayloadAction<AppServerData>): void => {
                    state.isLoading = false;
                    state.accessJwt = action.payload.data.accessJwt;
                    state.refreshJwt = action.payload.data.refreshJwt;
                    state.recovery = {
                        email: action.payload.success ? 'Password recovery successfully' : '',
                        password: '',
                        confirmPassword: '',
                    }
                })
            .addCase(recoveryController.rejected,
                (state: Draft<RecoveryState>, action: PayloadAction<string | undefined>): void => {
                    state.isLoading = true;
                    typeof action.payload === 'string'
                        ? state.error = action.payload
                        : ErrorMode.UNKNOWN;
                })
    },
});


export const {
    setError,
} = recoverySlice.actions;

export const {restoreRecoverySession} = recoverySlice.actions;

export default recoverySlice.reducer;
