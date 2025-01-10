import React from "react";
import {errorStyle} from "./errorStyle.tsx";

interface AppErrorResponseProps {
    children: React.ReactNode;
}

export const LoginError: React.FC<AppErrorResponseProps> = ({children}) => {
    return <div className={errorStyle.login}>{children}</div>
}

export const RegisterError: React.FC<AppErrorResponseProps> = ({children}) => {
    return <div className={errorStyle.register}>{children}</div>
}

export const RecoveryError: React.FC<AppErrorResponseProps> = ({children}) => {
    return <div className={errorStyle.register}>{children}</div>
}


export const AppFieldError: React.FC<AppErrorResponseProps> = ({children}) => {
    return <div className={errorStyle.field}>{children}</div>
}

export const OtpError: React.FC<AppErrorResponseProps> = ({children}) => {
    return <div className={errorStyle.otp}>{children}</div>
}