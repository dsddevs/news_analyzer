import React, {FormEvent} from "react";
import {AppButton} from "../../app/appButton.tsx";
import {OtpInput} from "./otpInput.tsx";
import {OtpStatusMessage} from "./otpStatusMessage.tsx";
import {otpStyle} from "../otpStyle.tsx";

interface OtpFormData {
    otpCode: string[];
    inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
    changeInputValue: (index: number, value: string) => void;
    doKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void;
    error?: string;
    successMessage?: string;
    isLoading: boolean;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onResend: () => void;
}

export const OtpForm: React.FC<OtpFormData> = ({
                                                   otpCode,
                                                   inputRefs,
                                                   changeInputValue,
                                                   doKeyDown,
                                                   error,
                                                   successMessage,
                                                   isLoading,
                                                   onSubmit,
                                                   onResend,
                                               }) => (
    <form key={"otp-form"} onSubmit={onSubmit}>
        <div className="flex flex-col space-y-16">
            <div className={otpStyle.squareDiv}>
                {otpCode.map((char, index) => (
                    <OtpInput
                        key={`otp-input-${index}`}
                        index={index}
                        char={char}
                        inputRefs={inputRefs}
                        changeInputValue={changeInputValue}
                        doKeyDown={doKeyDown}
                    />
                ))}
                <OtpStatusMessage
                    error={error}
                    successMessage={successMessage}
                />
            </div>

            <div className="space-y-5">
                <AppButton
                    id={`confirm-otp-button`}
                    name="Confirm OTP"
                    isLoading={isLoading}
                    disabled={isLoading}
                />
                <div className={otpStyle.resendLayer}>
                    <p>Didn't receive code?</p>
                    <button
                        type="button"
                        id="resend-otp-button"
                        className={otpStyle.resend}
                        onClick={onResend}
                    >
                        Resend
                    </button>
                </div>
            </div>
        </div>
    </form>
);