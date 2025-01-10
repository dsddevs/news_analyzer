import {ActionReducerMapBuilder, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {AppServerData} from "../app/appServerData.tsx";
import {loginController, LoginData} from "./loginController.tsx";
import {TokenMode} from "../storage/tokenMode.tsx";
import {NameMode} from "../storage/nameMode.tsx";
import {ErrorMode} from "../error/errorMode.tsx";

export interface LoginState {
    authentication: LoginData | null;
    fullName: string | null;
    accessJwt: string | null;
    refreshJwt: string | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: LoginState = {
    authentication: null,
    fullName: null,
    accessJwt: null,
    refreshJwt: null,
    isLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state) => {
            state.authentication = null;
            state.fullName = null;
            state.accessJwt = null;
            state.refreshJwt = null;
            localStorage.clear();
        },
        restoreLoginSession: (state) => {
            const loginAccessJwt: string = localStorage.getItem(TokenMode.LOGIN_ACCESS_JWT);
            const loginRefreshJwt: string = localStorage.getItem(TokenMode.LOGIN_REFRESH_JWT);
            const loginFullName: string = localStorage.getItem(NameMode.LOGIN);

            if (loginAccessJwt && loginRefreshJwt) {
                state.accessJwt = loginAccessJwt;
                state.refreshJwt = loginRefreshJwt;
                state.fullName = loginFullName;
            }
        },
        setError: (state, action: PayloadAction<string>): void => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        clearData: (state) => {
            state.authentication = {
                email: '',
                password: '',
            };
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<LoginState>) => {
        builder
            .addCase(loginController.pending,
                (state: Draft<LoginState>) => {
                    state.isLoading = true;
                    state.error = null;
                })
            .addCase(loginController.fulfilled,
                (state: Draft<LoginState>, action: PayloadAction<AppServerData>): void => {
                    state.isLoading = false;
                    state.accessJwt = action.payload.data.accessJwt;
                    state.refreshJwt = action.payload.data.refreshJwt;
                    state.fullName = action.payload.data.fullName;
                    state.authentication = {
                        email: action.payload.success ? 'Login successfully' : '',
                        password: ''
                    }
                })
            .addCase(loginController.rejected,
                (state: Draft<LoginState>, action: PayloadAction<string | undefined>): void => {
                    state.isLoading = false;
                    state.error = typeof action.payload === 'string'
                        ? action.payload
                        : ErrorMode.UNKNOWN;
                })
    },
});

export const {logout} = authSlice.actions;
export const {
    restoreLoginSession,
    setError,
    clearData,
    clearError
} = authSlice.actions;
export default authSlice.reducer;
