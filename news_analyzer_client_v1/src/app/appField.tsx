import React from "react";
import {FieldError} from "react-hook-form";
import {appStyle} from "./appStyle.tsx";
import {AppFieldError} from "../error/errorResponse.tsx";

export interface AppFieldData {
    label: string;
    iconPath: string;
    inputName: string;
    inputType: string;
    error?: FieldError;
}

export const AppField =
    React.forwardRef<HTMLInputElement, AppFieldData &
    React.InputHTMLAttributes<HTMLInputElement>>(
    ( {label, iconPath, inputName, inputType, error, ...rest }, ref) => {
    return (
        <div>
            <label className={appStyle.fieldLabel}> {label} </label>
            <div className={appStyle.inputDiv}>
                <input name={inputName}
                       type={inputType}
                       required
                       className={appStyle.input}
                       placeholder={`Enter: ${label}`}
                       ref={ref}
                       {...rest}
                />
                <img src={iconPath}
                     alt="auth_icon"
                     className={appStyle.inputImg}/>
            </div>
            {error && <AppFieldError> {error.message} </AppFieldError>}
        </div>
    )
})
