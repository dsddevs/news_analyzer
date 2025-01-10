import React from "react";
import {FieldError} from "react-hook-form";
import {registerStyle} from "./registerStyle.tsx";
import {RegisterError} from "../error/errorResponse.tsx";

export interface RememberMeData {
    inputName: string;
    text: string;
    error?: FieldError;
}

export const RegisterRemember =
    React.forwardRef<HTMLInputElement, RememberMeData & React.InputHTMLAttributes<HTMLInputElement>>(
    ({inputName, text, error, ...rest}, ref) => {
        return (
            <div className="flex">
                <input id={inputName}
                       name={inputName}
                       type="checkbox"
                       className={registerStyle.rememberInput}
                       ref={ref}
                       {...rest}
                />
                <label htmlFor={inputName} className={registerStyle.rememberLabel}>
                    {text}
                </label>
                {error && <RegisterError> {error.message} </RegisterError>}
            </div>
        )
    })

