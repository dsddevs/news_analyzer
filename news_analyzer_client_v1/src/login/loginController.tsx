import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppServerData} from "../app/appServerData.tsx";
import {RouteServer} from "../routers/routeServer.tsx";
import {TokenMode} from "../storage/tokenMode.tsx";
import {ErrorMode} from "../error/errorMode.tsx";
import {NameMode} from "../storage/nameMode.tsx";

export interface LoginData {
    email: string;
    password?: string;
    googleToken?: string;
}

export const loginController = createAsyncThunk<AppServerData, LoginData, { rejectValue: string }>(
    'auth/login',
    async (loginData: LoginData, {rejectWithValue}) => {
        try {
            const response = await axios.post<AppServerData>(RouteServer.API_LOGIN, loginData);
            if (response.data.data.accessJwt) {
                localStorage.setItem(TokenMode.LOGIN_ACCESS_JWT, response.data.data.accessJwt);
                localStorage.setItem(TokenMode.LOGIN_REFRESH_JWT, response.data.data.refreshJwt);
                localStorage.setItem(NameMode.LOGIN, response.data.data.fullName);
                return response.data;
            }
            return rejectWithValue(ErrorMode.AUTHENTICATION);
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || ErrorMode.AUTHENTICATION);
        }
    }
);