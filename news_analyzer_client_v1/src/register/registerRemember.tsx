import React from "react";
import {FieldError} from "react-hook-form";
import {registerStyle} from "./registerStyle.tsx";
import {errorStyle} from "../error/errorStyle.tsx";
import {AppAuthLink} from "../app/appAuthLink.tsx";
import {RouteClient} from "../routers/routeClient.tsx";

export interface RememberMeData {
    inputName: string;
    text: string;
    error?: FieldError;
}

export const RegisterRemember =
    React.forwardRef<HTMLInputElement, RememberMeData & React.InputHTMLAttributes<HTMLInputElement>>(
        ({inputName, text, error, ...rest}, ref) => {
            return (
                <div className="flex flex-col">
                    <div className={`flex`}>
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
                        <AppAuthLink name={`Terms and Conditions`}
                                     path={RouteClient.TERMS_AND_CONDITIONS}
                        />
                    </div>
                    <div className={errorStyle.termsAndConditionErrorDiv}>
                        {error &&
                            <div className={errorStyle.termsAndConditionError}>
                                {error.message}
                            </div>
                        }
                    </div>
                </div>
            )
        })

