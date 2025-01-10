import React from "react";
import {OtpError} from "../../error/errorResponse.tsx";
import {otpStyle} from "../otpStyle.tsx";

export const OtpStatusMessage: React.FC<{ error?: string; successMessage?: string }> = (
    {error, successMessage}
) => (
    <>
        {error && <OtpError>{error}</OtpError>}
        {successMessage && <p className={otpStyle.success}>{successMessage}</p>}
    </>
);
