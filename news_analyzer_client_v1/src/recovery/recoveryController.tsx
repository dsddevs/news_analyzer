import axios from "axios";
import {AppServerData} from "../app/appServerData.tsx";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {RouteServer} from "../routers/routeServer.tsx";
import {RecoveryData} from "./recoveryData.tsx";
import {TokenMode} from "../storage/tokenMode.tsx";
import {ErrorMode} from "../error/errorMode.tsx";

export const recoveryController =
    createAsyncThunk<AppServerData, RecoveryData, { rejectValue: string }>
    (
        async (recoveryData: RecoveryData, {rejectWithValue}) => {
            try {
                const response = await axios.patch<AppServerData>(RouteServer.API_PASSWORD_RECOVERY, recoveryData);
                localStorage.setItem(TokenMode.RECOVERY_ACCESS_JWT, response.data.data.accessJwt);
                localStorage.setItem(TokenMode.RECOVERY_REFRESH_JWT, response.data.data.refreshJwt);
                return response.data;
            } catch (error: any) {
                return rejectWithValue(ErrorMode.PASSWORD_FAILED);
            }
        }
    );
 