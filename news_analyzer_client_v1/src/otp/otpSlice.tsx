import {ActionReducerMapBuilder, createSlice, Draft, PayloadAction} from "@reduxjs/toolkit";
import {confirmOtpController, resendOtpController, sendOtpController} from "./otpController.tsx";
import {OtpData} from "./otpData.tsx";
import {AppServerData} from "../app/appServerData.tsx";
import {ErrorMode} from "../error/errorMode.tsx";
import {TokenMode} from "../storage/tokenMode.tsx";

export interface OtpState {
    verification: OtpData | null;
    accessJwt: string | null;
    refreshJwt: string | null;
    isLoading: boolean;
    error: string | null;
    successMessage: string | null;
}

const initialState: OtpState = {
    verification: null,
    accessJwt: null,
    refreshJwt: null,
    isLoading: false,
    error: null,
    successMessage: null
}

const callPending = (state: OtpState): void => {
    state.isLoading = true;
    state.error = null;
};

const callFulfilledConfirmOtp = (state: OtpState, action: PayloadAction<AppServerData>): void => {
    state.isLoading = false;
    if (action.payload?.data) {
        state.accessJwt = action.payload.data.accessJwt;
        state.refreshJwt = action.payload.data.refreshJwt;
        state.verification = {
            email: action.payload.success ? 'Verification successfully' : '',
            verificationCode: ''
        }
    }
};

const callFulfilledSendOtp = (state: OtpState, action: PayloadAction<AppServerData>): void => {
    state.isLoading = false;
    state.verification = {email: action.payload.success};
};


const callFulfilledResendOtp = (state: OtpState, action: PayloadAction<AppServerData>): void => {
    const successMessage: string = 'OTP resent successfully';
    const successResponse: string = action.payload.success ? successMessage : '';
    state.isLoading = false;
    state.verification = {email: successResponse};
    state.successMessage = successMessage;
};

const callRejected = (state: OtpState, action: any, defaultError: string): void => {
    state.isLoading = false;
    const rejectedPayload = action.payload as any;
    state.error = rejectedPayload?.rejectValue?.error || defaultError;
};

const otpSlice = createSlice({
    name: 'verification',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>): void => {
            state.error = action.payload;
        },
        clearError: (state): void => {
            state.error = null;
        },
        setSuccessMessage: (state, action: PayloadAction<string>): void => {
            state.successMessage = action.payload;
        },
        clearSuccessMessage: (state): void => {
            state.successMessage = null;
        },
        restoreOtpSession: (state) => {
            const otpAccessJwt: string = localStorage.getItem(TokenMode.OTP_ACCESS_JWT);
            const otpRefreshJwt: string = localStorage.getItem(TokenMode.OTP_REFRESH_JWT);

            if (otpAccessJwt && otpRefreshJwt) {
                state.accessJwt = otpAccessJwt;
                state.refreshJwt = otpRefreshJwt;
            }
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<OtpState>): void => {
        builder
            .addCase(confirmOtpController.pending, callPending)
            .addCase(sendOtpController.pending, callPending)
            .addCase(resendOtpController.pending, callPending)
            .addCase(confirmOtpController.fulfilled, callFulfilledConfirmOtp)
            .addCase(sendOtpController.fulfilled, callFulfilledSendOtp)
            .addCase(resendOtpController.fulfilled, callFulfilledResendOtp)
            .addCase(confirmOtpController.rejected,
                (state: Draft<OtpState>, action: PayloadAction<AppServerData>) =>
                    callRejected(state, action, ErrorMode.CONFIRM_OTP))
            .addCase(sendOtpController.rejected,
                (state: Draft<OtpState>, action: PayloadAction<AppServerData>) =>
                    callRejected(state, action, ErrorMode.SEND_OTP))
            .addCase(resendOtpController.rejected,
                (state: Draft<OtpState>, action: PayloadAction<AppServerData>) =>
                    callRejected(state, action, ErrorMode.RESEND_OTP))
    },
});

export const {
    setError,
    clearError,
    setSuccessMessage,
    clearSuccessMessage
} = otpSlice.actions;

export const {restoreOtpSession} = otpSlice.actions;
export default otpSlice.reducer;
