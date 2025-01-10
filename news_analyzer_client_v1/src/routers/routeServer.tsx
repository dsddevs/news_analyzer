import {RouteClient} from "./routeClient.tsx";
import axios from "axios";

const BASE_URL: string = "http://localhost:8181"
export const SERVER_API: string = `${BASE_URL}/api`;

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export enum RouteServer {
    API_REGISTER = `${SERVER_API}${RouteClient.REGISTER}`,
    API_LOGIN = `${SERVER_API}${RouteClient.LOGIN}`,
    API_SEND_OTP = `${SERVER_API}${RouteClient.SEND_OTP}`,
    API_CONFIRM_OTP = `${SERVER_API}${RouteClient.CONFIRM_OTP}`,
    API_RESEND_OTP = `${SERVER_API}${RouteClient.RESEND_OTP}`,
    API_PASSWORD_RECOVERY = `${SERVER_API}${RouteClient.PASSWORD_RECOVERY}`,
    API_NEWS_ANALYZER = `/api${RouteClient.NEWS_ANALYZER}`
}
