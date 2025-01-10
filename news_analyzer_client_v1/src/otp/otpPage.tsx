import React, {Dispatch, FormEvent, useMemo} from "react";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store.tsx";
import {RouteClient} from "../routers/routeClient.tsx";
import {OtpService} from "./otpServiceModel.ts";
import {useOtpInput} from "./useOtpInput.ts";
import {OtpMode} from "./otpMode.tsx";
import {OtpForm} from "./components/otpForm.tsx";
import {useOtpState} from "./useOtpState.ts";
import {EmailMode} from "../storage/emailMode.tsx";
import {setError} from "./otpSlice.tsx";
import {ErrorMode} from "../error/errorMode.tsx";
import {otpStyle} from "./otpStyle.tsx";

export const OtpPage: React.FC = () => {

    const dispatch: Dispatch<AppDispatch> = useDispatch<AppDispatch>();
    const navigate: NavigateFunction = useNavigate();
    const {isLoading, error, successMessage} = useOtpState();
    const otpService: OtpService = useMemo(() => new OtpService(dispatch), [dispatch]);
    const {otpCode, inputRefs, changeInputValue, doKeyDown} = useOtpInput();
    const joinedOtpCode
        = otpCode.join("");
    const registerEmail: string = localStorage.getItem(EmailMode.REGISTER);
    const recoveryEmail: string = localStorage.getItem(EmailMode.RECOVERY);

    const mode: OtpMode = useMemo(() =>
            registerEmail ? OtpMode.NEWS_ANALYZER : OtpMode.PASSWORD_RECOVERY,
        [registerEmail]);

    const email: string = useMemo(() =>
            mode === OtpMode.NEWS_ANALYZER ? registerEmail : recoveryEmail,
        [mode]);

    const otpDescription: string = `Confirm your email address. 
    We’ve sent a confirmation code to ${email ? email : 'No email'}.
    Check your inbox and enter the code here.`;

    const enterNewsAnalyzerPage = (): void => {
        navigate(RouteClient.NEWS_ANALYZER);
        localStorage.removeItem(EmailMode.REGISTER);
    }

    const enterPasswordRecoveryPage = (): void => {
        navigate(RouteClient.PASSWORD_RECOVERY);
    }

    const getOtpSuccess = (mode: OtpMode): void => {
        mode === OtpMode.NEWS_ANALYZER ? enterNewsAnalyzerPage() : enterPasswordRecoveryPage();
    };

    const getOtpError = () => {
        if (!email) {
            dispatch(setError(ErrorMode.EMAIL_NOT_FOUNT));
            return;
        }
        if (!otpService.validateOtp(otpCode)) {
            dispatch(setError(ErrorMode.OTP_INVALID));
        }
    };

    const pushConfirmOtp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!otpService.validateOtp(otpCode)) {
            getOtpError();
            return;
        }
        const isConfirmOtp: boolean = await otpService.confirmOtp(email, joinedOtpCode);
        isConfirmOtp ? getOtpSuccess(mode) : getOtpError();
    };

    const pushResendOtp = async () => {
        if (!email) return;
        if (email) await otpService.resendOtp(email);
    };

    return (
        <div className={otpStyle.page}>
            <div className={otpStyle.layerOne}>
                <div className={otpStyle.layerTwo}>
                    <div className={otpStyle.labelLayer}>
                        <div className={otpStyle.label}>
                            <p>Email Verification</p>
                        </div>
                        <div className={otpStyle.text}>
                            <p>{otpDescription}</p>
                        </div>
                    </div>
                    <OtpForm
                        otpCode={otpCode}
                        inputRefs={inputRefs}
                        changeInputValue={changeInputValue}
                        doKeyDown={doKeyDown}
                        error={error}
                        successMessage={successMessage}
                        isLoading={isLoading}
                        onSubmit={pushConfirmOtp}
                        onResend={pushResendOtp}
                    />
                </div>
            </div>
        </div>
    );
};

