import React from "react";
import {RouteClient} from "./routeClient.tsx";
import {HomePage} from "../home/homePage.tsx";
import {RegisterPage} from "../register/registerPage.tsx";
import {LoginPage} from "../login/loginPage.tsx";
import {VerificationPage} from "../verification/verificationPage.tsx";
import {NewsPage} from "../user/analyzer/newsPage.tsx";
import {OtpPage} from "../otp/otpPage.tsx";
import {RecoveryPage} from "../recovery/recoveryPage.tsx";
import {RouteProtection} from "./routeProtection.tsx";

export interface RouteData {
    path: string;
    element: React.ReactNode;
    label: string;
}

const baseRoute: RouteData = {
    path: RouteClient.HOME,
    element: <HomePage/>,
    label: "Home"
}

export const navigationRoute: RouteData[] = [
   baseRoute,
]

export const homeRoute: RouteData[] = [
    baseRoute,
    {
        path: RouteClient.REGISTER,
        element: <RegisterPage/>,
        label: "Register"
    },
    {
        path: RouteClient.LOGIN,
        element: <LoginPage/>,
        label: "Login"
    },
    {
        path: RouteClient.SEND_OTP,
        element: <VerificationPage/>,
        label: "Forgot Password"
    },
    {
        path: RouteClient.CONFIRM_OTP,
        element: <OtpPage/>,
        label: "Otp"
    },
]

export const userRoute: RouteData[] = [
    {
        path: RouteClient.NEWS_ANALYZER,
        element: (<RouteProtection><NewsPage/></RouteProtection>),
        label: "News Page"
    },
    {
        path: RouteClient.PASSWORD_RECOVERY,
        element: (<RouteProtection><RecoveryPage/></RouteProtection>),
        label: "Password Recovery"
    }
]
