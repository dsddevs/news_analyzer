import {createAsyncThunk} from "@reduxjs/toolkit";
import {OtpData} from "./otpData.tsx";
import {AppServerData} from "../app/appServerData.tsx";
import {ErrorMode} from "../error/errorMode.tsx";
import {TokenMode} from "../storage/tokenMode.tsx";
import {confirmOtpRequest, resendOtpRequest, sendOtpRequest} from "./otpRequests.tsx";
import {NameMode} from "../storage/nameMode.tsx";

export const confirmOtpController =
    createAsyncThunk<AppServerData, OtpData, { rejectValue: string }>
('verification/confirmOtp', async (otpData: OtpData, {rejectWithValue}) => {
    try {
        const response: { data: AppServerData } = await confirmOtpRequest(otpData);
        const errorResponse: string = response.data.errorMessage || ErrorMode.CONFIRM_OTP;
        if (!response.data.success) return rejectWithValue(errorResponse);
        localStorage.setItem(TokenMode.OTP_ACCESS_JWT, response.data.data.accessJwt);
        localStorage.setItem(TokenMode.OTP_REFRESH_JWT, response.data.data.refreshJwt);
        return response.data;
    } catch (error: any) {
        return rejectWithValue(ErrorMode.NETWORK_CONNECTION);
    }
});

export const sendOtpController =
    createAsyncThunk<AppServerData, OtpData, { rejectValue: string }>
('verification/sendOtp', async (sendOtpData: OtpData, {rejectWithValue}) => {
        try {
            const currentEmail: string = sendOtpData.email;
            const response: { data: AppServerData } = await sendOtpRequest({email: currentEmail});
            localStorage.setItem(NameMode.VERIFICATION, response.data.data.fullName);
            const errorResponse: string = response.data.errorMessage || ErrorMode.SEND_OTP;
            if (!response.data.success) return rejectWithValue(errorResponse);
            return response.data.success;
        } catch (error: any) {
            return rejectWithValue(ErrorMode.NETWORK_CONNECTION);
        }
    }
);

export const resendOtpController =
    createAsyncThunk<AppServerData, OtpData, { rejectValue: string }>
(
    'verification/resendOtp',
    async (resendOtpData: OtpData, {rejectWithValue}) => {
        try {
            const currentEmail: string = resendOtpData.email;
            const response: { data: AppServerData } = await resendOtpRequest({email: currentEmail});
            const errorResponse: string = response.data.errorMessage || ErrorMode.RESEND_OTP;
            if (!response.data.success) return rejectWithValue(errorResponse);
            return {success: true};
        } catch (error: any) {
            return rejectWithValue(ErrorMode.NETWORK_CONNECTION);
        }
    }
);


