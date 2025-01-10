import {OtpData} from "./otpData.tsx";
import {AppServerData} from "../app/appServerData.tsx";
import axios from "axios";
import {RouteServer} from "../routers/routeServer.tsx";

export const confirmOtpRequest = async (data: OtpData): Promise<{ data: AppServerData }> => {
    return await axios.post<AppServerData>(RouteServer.API_CONFIRM_OTP, data);
};

export const sendOtpRequest = async (data: OtpData): Promise<{ data: AppServerData }> => {
    return await axios.post<AppServerData>(RouteServer.API_SEND_OTP, data);
};

export const resendOtpRequest = async (data: OtpData): Promise<{ data: AppServerData }> => {
    return await axios.post<AppServerData>(RouteServer.API_RESEND_OTP, data);
};
