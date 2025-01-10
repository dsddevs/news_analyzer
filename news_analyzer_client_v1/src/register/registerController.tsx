import {createAsyncThunk} from "@reduxjs/toolkit";
import {AppServerData} from "../app/appServerData.tsx";
import axios from "axios";
import {RouteServer} from "../routers/routeServer.tsx";
import {EmailMode} from "../storage/emailMode.tsx";
import {RegisterData} from "./registerData.tsx";
import {ErrorMode} from "../error/errorMode.tsx";
import {NameMode} from "../storage/nameMode.tsx";

export const registerController =
    createAsyncThunk<AppServerData, RegisterData, { rejectValue: string }>
    (
        'auth/register',
        async (userData: RegisterData, {rejectWithValue}) => {
            try {
                const response = await axios.post<AppServerData>(RouteServer.API_REGISTER, userData);
                if (!response.data.success) {
                    return rejectWithValue(ErrorMode.USER_EXISTING);
                }
                localStorage.setItem(NameMode.REGISTER, userData.fullName);
                localStorage.setItem(EmailMode.REGISTER, userData.email);
                return response.data;
            } catch (error: any) {
                return rejectWithValue(ErrorMode.USER_EXISTING);
            }
        }
    );